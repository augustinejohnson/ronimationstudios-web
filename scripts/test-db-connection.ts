import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log('Testing database connection...');
    try {
        await prisma.$connect();
        console.log('Successfully connected to the database.');

        // Try a simple query
        const count = await prisma.teamMember.count();
        console.log(`Test query successful. Found ${count} team members.`);
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
