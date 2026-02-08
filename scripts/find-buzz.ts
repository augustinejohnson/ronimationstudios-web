import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        // Search for title containing "Buzz"
        const projects = await db.portfolioItem.findMany({
            where: {
                title: { contains: 'Buzz', mode: 'insensitive' }
            }
        });

        console.log('--- FOUND PROJECTS ---');
        projects.forEach(p => console.log(`[ID] ${p.id}`));
    } catch (e) {
        console.error(e);
    }
}

main();
