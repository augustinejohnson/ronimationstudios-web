import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        const url = 'https://www.youtube.com/embed/OnBgZGdua_E';
        const updated = await db.portfolioItem.update({
            where: { id: 'neon-dreams' },
            data: { videoUrl: url }
        });
        console.log('Updated Neon Dreams URL:', updated.videoUrl);
    } catch (e) {
        console.error(e);
    }
}

main();
