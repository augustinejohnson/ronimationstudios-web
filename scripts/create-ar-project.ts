import 'dotenv/config';
import { db } from '../src/lib/db';

async function main() {
    try {
        const project = {
            id: 'ar-museum-guide',
            title: 'AR Museum Guide',
            category: 'Tech',
            client: 'National History Museum',
            description: 'An augmented reality app that brings dinosaur fossils to life for museum visitors.',
            fullDescription: `
                We partnered with the National History Museum to create an educational AR experience. 
                Visitors point their tablets at fossil exhibits to see flesh-and-blood reconstructions of the dinosaurs, 
                complete with scientifically accurate animations and spatial audio roars.
            `,
            coverImage: 'https://images.unsplash.com/photo-1633167606207-d840b507049c?q=80&w=2069&auto=format&fit=crop',
            galleryImages: JSON.stringify([
                'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
            ]),
            tags: JSON.stringify(['Augmented Reality', 'Mobile App', 'Education', 'Unity']),
        };

        const created = await db.portfolioItem.create({
            data: project
        });

        console.log(`✅ Created missing project: ${created.title} (${created.id})`);
    } catch (e) {
        console.error(e);
    }
}

main();
