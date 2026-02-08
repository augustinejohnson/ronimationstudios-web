
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@ronimationstudios.com';
    const password = 'password123'; // Default password, change immediately in production
    const name = 'Admin User';

    try {
        console.log('Connecting to database...');
        await prisma.$connect();

        const existingUser = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log(`Admin user ${email} already exists.`);
            return;
        }

        console.log(`Creating admin user ${email}...`);
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.adminUser.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        console.log(`Admin user created successfully.`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

    } catch (error: any) {
        console.error('Error creating admin user:');
        console.error(error.message || error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
