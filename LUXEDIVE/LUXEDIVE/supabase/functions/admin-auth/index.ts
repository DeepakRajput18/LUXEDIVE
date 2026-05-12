import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Timing-safe string compare to avoid timing attacks
async function safeCompare(a: string, b: string): Promise<boolean> {
    if (a.length !== b.length) return false;
    const encoder = new TextEncoder();
    const aBytes = encoder.encode(a);
    const bBytes = encoder.encode(b);
    let diff = 0;
    for (let i = 0; i < aBytes.length; i++) {
        diff |= aBytes[i] ^ bBytes[i];
    }
    return diff === 0;
}

// Simple JWT builder (HS256 using crypto.subtle)
async function buildJWT(payload: Record<string, unknown>, secret: string): Promise<string> {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const body = btoa(JSON.stringify(payload))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const msg = `${header}.${body}`;
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
    const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return `${msg}.${sigB64}`;
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405, headers: { ...CORS, 'Content-Type': 'application/json' },
        });
    }

    try {
        const { username, password } = await req.json();

        // Credentials stored as Supabase secrets — NEVER in frontend code
        const ADMIN_USERNAME = Deno.env.get('ADMIN_USERNAME') ?? '';
        const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD') ?? '';
        const JWT_SECRET = Deno.env.get('ADMIN_JWT_SECRET') ?? 'luxedive-admin-secret-2026';

        if (!username || !password) {
            return new Response(JSON.stringify({ error: 'Missing credentials' }), {
                status: 400, headers: { ...CORS, 'Content-Type': 'application/json' },
            });
        }

        const usernameMatch = await safeCompare(username, ADMIN_USERNAME);
        const passwordMatch = await safeCompare(password, ADMIN_PASSWORD);

        if (!usernameMatch || !passwordMatch) {
            // Consistent delay to prevent timing attacks
            await new Promise(r => setTimeout(r, 300));
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
                status: 401, headers: { ...CORS, 'Content-Type': 'application/json' },
            });
        }

        // Build JWT valid for 8 hours
        const now = Math.floor(Date.now() / 1000);
        const token = await buildJWT(
            { role: 'admin', sub: 'admin', exp: now + 8 * 60 * 60, iat: now },
            JWT_SECRET
        );

        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: { ...CORS, 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('admin-auth error:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
        });
    }
});
