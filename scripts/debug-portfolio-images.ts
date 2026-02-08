import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Fetching portfolio items...');
    const items = await prisma.portfolioItem.findMany({
        select: {
            id: true,
            title: true,
            coverImage: true
        }
    });

    if (items.length === 0) {
        console.log('No portfolio items found.');
    } else {
        items.forEach(item => {
            console.log(`ID: ${item.id}`);
            console.log(`Title: ${item.title}`);
            console.log(`Cover: ${item.coverImage}`);
            console.log('---');
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
