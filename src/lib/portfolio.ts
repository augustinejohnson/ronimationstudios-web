import { db } from './db';

export type Project = {
    id: string;
    title: string;
    category: 'Audio' | 'Visuals' | 'Tech' | 'AI';
    client?: string;
    description: string;
    fullDescription: string;
    coverImage: string;
    galleryImages: string[];
    videoUrl?: string;
    tags: string[];
    date?: string;
};

// Resilient fallback projects if remote database is paused or unreachable
const FALLBACK_PROJECTS: Project[] = [
    {
        id: '3d-virtual-production',
        title: '3D Virtual Worlds & Character Rigs',
        category: 'Tech',
        client: 'Ronimation Labs',
        description: 'Interactive character sculpts, procedural environments, and game-ready 3D pipeline assets.',
        fullDescription: 'Comprehensive 3D asset development spanning character sculpts, facial topology, hard-surface mechanical rigging, and real-time engine integration.',
        coverImage: '/portfolio/3d-models.jpg',
        galleryImages: ['/portfolio/3d-models.jpg', '/portfolio/aretestudio.jpg'],
        tags: ['3D Modeling', 'Blender', 'Unreal Engine', 'Rigs'],
        date: '2026',
    },
    {
        id: 'brand-identity-systems',
        title: 'Futuristic Brand Identity & Vector UI',
        category: 'Visuals',
        client: 'Aretestudio',
        description: 'Modern vector branding, typography experiments, UI/UX systems, and digital editorial layouts.',
        fullDescription: 'Custom typographic identity system and design language developed for contemporary multimedia platforms and creative agencies.',
        coverImage: '/portfolio/designs.jpg',
        galleryImages: ['/portfolio/designs.jpg'],
        tags: ['Brand Identity', 'Typography', 'UI/UX', 'Vector'],
        date: '2026',
    },
    {
        id: 'cinematic-motion-reel',
        title: 'Cinematic Motion Graphics & VFX',
        category: 'Visuals',
        client: 'Ronimation Studios',
        description: 'High-impact commercial video production, film trailers, and dynamic motion graphic reels.',
        fullDescription: 'Dynamic post-production suite incorporating visual effects compositing, color grading, sound synchrony, and high-energy motion design.',
        coverImage: '/portfolio/video-productions.jpg',
        galleryImages: ['/portfolio/video-productions.jpg'],
        tags: ['Cinematics', 'After Effects', 'VFX', '4K Reel'],
        date: '2026',
    },
    {
        id: 'spatial-audio-score',
        title: 'Spatial Sound Design & Restoration',
        category: 'Audio',
        client: 'Original Score',
        description: 'Bespoke musical compositions, surgical audio restorations, and immersive spatial soundscapes.',
        fullDescription: 'Multi-track audio engineering covering analog warmth restoration, spectral noise elimination, orchestral themes, and spatial 3D audio.',
        coverImage: '/portfolio/audios.jpg',
        galleryImages: ['/portfolio/audios.jpg'],
        tags: ['Sound Design', 'Restoration', 'Spatial Audio', 'Score'],
        date: '2026',
    },
    {
        id: 'generative-ai-explorations',
        title: 'Generative AI Masterworks',
        category: 'AI',
        client: 'Experimental Vault',
        description: 'Flagship studio collections exploring AI-assisted concept synthesis and mixed-media art.',
        fullDescription: 'Pioneering workflow combining generative latent diffusion with manual 3D sculpting and hand-painted illustration passes.',
        coverImage: '/portfolio/aretestudio.jpg',
        galleryImages: ['/portfolio/aretestudio.jpg', '/portfolio/drawings.jpg'],
        tags: ['Generative AI', 'Concept Art', 'Innovation'],
        date: '2026',
    },
];

export async function getProjects(): Promise<Project[]> {
    try {
        const projects = await db.portfolioItem.findMany();
        if (projects && projects.length > 0) {
            return projects.map((p) => ({
                id: p.id,
                title: p.title,
                category: p.category as any,
                client: p.client || undefined,
                description: p.description,
                fullDescription: p.fullDescription,
                coverImage: p.coverImage,
                galleryImages: JSON.parse(p.galleryImages || '[]'),
                videoUrl: p.videoUrl || undefined,
                tags: JSON.parse(p.tags || '[]'),
                date: p.date || undefined,
            }));
        }
    } catch (error) {
        console.warn('Database temporarily unreachable for getProjects. Using fallback projects:', error);
    }
    return FALLBACK_PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    if (!slug) return undefined;

    try {
        const project = await db.portfolioItem.findUnique({
            where: { id: slug },
        });

        if (project) {
            return {
                id: project.id,
                title: project.title,
                category: project.category as any,
                client: project.client || undefined,
                description: project.description,
                fullDescription: project.fullDescription,
                coverImage: project.coverImage,
                galleryImages: JSON.parse(project.galleryImages || '[]'),
                videoUrl: project.videoUrl || undefined,
                tags: JSON.parse(project.tags || '[]'),
                date: project.date || undefined,
            };
        }
    } catch (error) {
        console.warn(`Database unreachable for getProjectBySlug(${slug}). Checking fallback projects.`);
    }

    return FALLBACK_PROJECTS.find((p) => p.id === slug);
}
