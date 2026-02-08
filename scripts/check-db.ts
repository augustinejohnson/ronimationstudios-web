
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    try {
        const url = process.env.DATABASE_URL || '';
        console.log('Connecting to:', url.replace(/:[^:]*@/, ':****@')); // Mask password
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Connected successfully.');

        const adminCount = await prisma.adminUser.count();
        console.log(`Found ${adminCount} AdminUser(s).`);

        const userCount = await prisma.teamMember.count();
        console.log(`Found ${userCount} TeamMember(s).`);

    } catch (error: any) {
        console.error('Error connecting to database:');
        console.error(error.message || error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
