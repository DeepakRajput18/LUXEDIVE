import sharp from 'sharp';
import fs from 'fs/promises';

async function test() {
    try {
        console.log('Testing sharp...');
        // Create a blank image
        const buffer = await sharp({
            create: {
                width: 100,
                height: 100,
                channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 0.5 }
            }
        }).webp().toBuffer();
        
        console.log('✅ Sharp is working! Buffer size:', buffer.length);
        process.exit(0);
    } catch (e) {
        console.error('❌ Sharp failed:', e.message);
        process.exit(1);
    }
}

test();
