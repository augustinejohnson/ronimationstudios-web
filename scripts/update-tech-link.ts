import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        const serviceId = 'interactive-tech';
        const newLink = '/work/web-buzz-project';

        // 1. Get current features
        const service = await db.service.findUnique({
            where: { id: serviceId }
        });

        if (!service) {
            console.log('Service not found');
            return;
        }

        const features = JSON.parse(service.features as string);

        // 2. Update the specific feature
        const updatedFeatures = features.map((f: any) => {
            if (f.title === 'Web & App Design') {
                return { ...f, link: newLink };
            }
            return f;
        });

        // 3. Save back to DB
        await db.service.update({
            where: { id: serviceId },
            data: { features: JSON.stringify(updatedFeatures) }
        });

        console.log(`✅ Updated "Web & App Design" link to: ${newLink}`);

    } catch (e) {
        console.error(e);
    }
}

main();
