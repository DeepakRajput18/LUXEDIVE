const url = 'https://txxguqcuirkcvtfbcgak.supabase.co/functions/v1/generate-360-view';

async function test() {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        car_id: 'test-car',
        image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop'
      })
    });
    
    const text = await res.text();
    require('fs').writeFileSync('gemini_error.txt', text);
    console.log(`Status: ${res.status}`);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
