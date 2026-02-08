import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NEW_URL = "https://firebasestorage.googleapis.com/v0/b/g4mg-adamz-pharmacy.firebasestorage.app/o/Adamz%2FRonimation%20studios%2FRonimation%20Anim.jpg?alt=media&token=82abd003-cc2d-4fe7-9fdf-e1d2461da2aa";

async function main() {
    // We'll update ALL items that have "Ronimation" in the title or ID, 
    // OR we'll just update the one with the gs:// link if we find it.

    // First, find the item with the broken link
    const items = await prisma.portfolioItem.findMany();

    let targetId = null;

    for (const item of items) {
        if (item.coverImage.startsWith('gs://') || item.title.includes('Ronimation')) {
            targetId = item.id;
            break;
        }
    }

    if (targetId) {
        console.log(`Updating item ${targetId} with new URL...`);
        await prisma.portfolioItem.update({
            where: { id: targetId },
            data: { coverImage: NEW_URL }
        });
        console.log('Update successful.');
    } else {
        console.log('No matching item found to update.');
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
