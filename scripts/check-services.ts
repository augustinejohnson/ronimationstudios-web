import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        const services = await db.service.findMany({ select: { id: true } });
        services.forEach(s => console.log(`[ID: ${s.id}]`));
    } catch (e) {
        console.error(e);
    }
}

main();
