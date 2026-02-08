import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        const cover = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop';
        const gallery = [
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1951&auto=format&fit=crop'
        ];

        const updated = await db.portfolioItem.update({
            where: { id: 'neon-dreams' },
            data: {
                coverImage: cover,
                galleryImages: JSON.stringify(gallery)
            }
        });
        console.log('✅ Refreshed Neon Dreams Images');
    } catch (e) {
        console.error(e);
    }
}

main();
