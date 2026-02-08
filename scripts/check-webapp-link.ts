import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        // 1. Check the Service Feature Link
        const service = await db.service.findUnique({
            where: { id: 'interactive-tech' }
        });

        if (service) {
            const features = JSON.parse(service.features as string);
            const webappFeature = features.find((f: any) => f.title === 'Web & App Design');
            console.log('--- Feature Info ---');
            console.log(webappFeature);
        } else {
            console.log('Service interactive-tech not found');
        }

        // 2. Check the Target Project
        const targetId = 'ar-museum-guide';
        const project = await db.portfolioItem.findUnique({
            where: { id: targetId }
        });

        console.log('\n--- Target Project ---');
        if (project) {
            console.log(`[OK] Project "${project.title}" exists (ID: ${project.id})`);
        } else {
            console.log(`[FAIL] Project with ID "${targetId}" does NOT exist.`);
        }

    } catch (e) {
        console.error(e);
    }
}

main();
