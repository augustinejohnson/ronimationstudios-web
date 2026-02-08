import 'dotenv/config'; // Load env vars
import { db } from '../src/lib/db';

async function main() {
    console.log('Testing db default export...');
    try {
        console.log('Attempting query...');
        const count = await db.teamMember.count();
        console.log(`Success! Count: ${count}`);
    } catch (e) {
        console.error('Error querying db:', e);
    }
}

main();
