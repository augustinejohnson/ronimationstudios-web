const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const newPassword = process.argv[2] || 'Ronimation2025!';
    const email = (process.argv[3] || 'admin@ronimationstudios.com').trim().toLowerCase();

    console.log(`Setting password for ${email}...`);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.adminUser.upsert({
        where: { email },
        update: { password: hashedPassword },
        create: {
            email,
            password: hashedPassword,
            name: 'Ronimation Admin',
        },
    });

    console.log('--------------------------------------------------');
    console.log('✅ Admin password updated successfully!');
    console.log(`📧 Email:    ${user.email}`);
    console.log(`🔑 Password: ${newPassword}`);
    console.log('--------------------------------------------------');
}

main()
    .catch((err) => {
        console.error('❌ Failed to reset password:', err.message);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
