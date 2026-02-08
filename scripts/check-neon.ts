import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        const item = await db.portfolioItem.findUnique({
            where: { id: 'neon-dreams' }
        });
        console.log(item);
    } catch (e) {
        console.error(e);
    }
}

main();
