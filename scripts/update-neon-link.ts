import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        // ID: sA7XEAEkBpU
        const embedUrl = 'https://www.youtube.com/embed/sA7XEAEkBpU';

        const updated = await db.portfolioItem.update({
            where: { id: 'neon-dreams' },
            data: { videoUrl: embedUrl }
        });
        console.log('✅ Updated Neon Dreams URL to:', updated.videoUrl);
    } catch (e) {
        console.error(e);
    }
}

main();
