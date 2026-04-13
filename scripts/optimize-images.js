import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import sharp from 'sharp';

// Configuration
const TARGET_DIR = 'src/assets/images';
const MAX_WIDTH = 1440; // Reasonable max width for web
const QUALITY = 85; 

async function optimizeImages() {
    console.log(`\n🔍 Scanning ${TARGET_DIR} for images...`);
    
    // Find all PNG, JPG, and JPEG files
    const files = await glob(`${TARGET_DIR}/**/*.{png,jpg,jpeg}`, { absolute: true });
    
    console.log(`\n📦 Found ${files.length} images.`);
    let totalSaved = 0;

    for (const file of files) {
        const stats = fs.statSync(file);
        const fileName = path.basename(file);
        const folderName = path.dirname(file).split(path.sep).pop();
        
        // Skip files that are already small (< 100KB) unless it's a huge dimension
        if (stats.size < 100 * 1024) {
            console.log(`  ⏩ Skipping [${folderName}] ${fileName} (Already small: ${(stats.size / 1024).toFixed(0)}KB)`);
            continue;
        }

        console.log(`  ⚙️  Optimizing [${folderName}] ${fileName} (${(stats.size / 1024 / 1024).toFixed(2)}MB)...`);
        
        try {
            const image = sharp(file);
            const metadata = await image.metadata();
            
            let pipeline = image;
            
            // 1. Resize if it exceeds MAX_WIDTH
            if (metadata.width > MAX_WIDTH) {
                pipeline = pipeline.resize(MAX_WIDTH, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                });
            }
            
            // 2. Perform extreme compression based on type
            let buffer;
            if (metadata.format === 'png') {
                buffer = await pipeline
                    .png({ 
                        quality: QUALITY, 
                        compressionLevel: 9, 
                        palette: true // Reduces size significantly for PNG
                    })
                    .toBuffer();
            } else {
                buffer = await pipeline
                    .jpeg({ 
                        quality: QUALITY, 
                        mozjpeg: true 
                    })
                    .toBuffer();
            }

            // 3. Write back only if the new size is actually smaller
            if (buffer.length < stats.size) {
                fs.writeFileSync(file, buffer);
                const savings = stats.size - buffer.length;
                totalSaved += savings;
                console.log(`  ✅ Optimized! Saved ${((savings / stats.size) * 100).toFixed(1)}% (${(buffer.length / 1024).toFixed(0)}KB)`);
            } else {
                console.log(`  ⏭️  Already at optimal size.`);
            }
        } catch (err) {
            console.error(`  ❌ Error processing ${fileName}:`, err.message);
        }
    }
    
    console.log(`\n✨ Done! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB\n`);
}

optimizeImages().catch(console.error);
