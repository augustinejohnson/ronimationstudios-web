import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: npx tsx scripts/set-admin-password.ts <new-password>');
        process.exit(1);
    }

    const newPassword = args[0];
    const email = 'admin@ronimationstudios.com'; // Hardcoded as per seed, or could be arg[1]

    console.log(`Setting password for ${email}...`);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
        const user = await prisma.adminUser.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: {
                email,
                password: hashedPassword,
                name: 'Admin'
            }
        });
        console.log(`\n✅ Password successfully updated for ${user.email}`);
    } catch (error) {
        console.error('\n❌ Failed to update password:', error);
        process.exit(1);
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
