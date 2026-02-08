import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        const services = await db.service.findMany();

        const velocityIds = ['gen-ai', 'audio-restoration'];
        const velocityServices = services.filter(s => velocityIds.includes(s.id));
        const mainServices = services.filter(s => !velocityIds.includes(s.id));

        console.log('--- VELOCITY SECTION ---');
        velocityServices.forEach(s => console.log(`[x] ${s.title} (${s.id})`));

        console.log('\n--- MAIN SECTION ---');
        mainServices.forEach(s => console.log(`[x] ${s.title} (${s.id})`));

    } catch (e) {
        console.error(e);
    }
}

main();
