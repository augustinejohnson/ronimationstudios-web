import db from './db';

export type Project = {
    id: string;
    title: string;
    category: 'Audio' | 'Visuals' | 'Tech' | 'AI';
    client?: string;
    description: string; // Short summary for card
    fullDescription: string; // Long form for detail page
    coverImage: string;
    galleryImages: string[];
    videoUrl?: string; // YouTube/Vimeo embed
    tags: string[];
    date?: string;
};

export async function getProjects(): Promise<Project[]> {
    const projects = await db.portfolioItem.findMany({
        orderBy: {
            // Sort by date if available, or just insert order (default)
            // schema doesn't have created_at, but maybe add it later
        }
    });

    return projects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category as any,
        client: p.client || undefined,
        description: p.description,
        fullDescription: p.fullDescription,
        coverImage: p.coverImage,
        galleryImages: JSON.parse(p.galleryImages),
        videoUrl: p.videoUrl || undefined,
        tags: JSON.parse(p.tags),
        date: p.date || undefined,
    }));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    const project = await db.portfolioItem.findUnique({
        where: { id: slug },
    });

    if (!project) return undefined;

    return {
        id: project.id,
        title: project.title,
        category: project.category as any,
        client: project.client || undefined,
        description: project.description,
        fullDescription: project.fullDescription,
        coverImage: project.coverImage,
        galleryImages: JSON.parse(project.galleryImages),
        videoUrl: project.videoUrl || undefined,
        tags: JSON.parse(project.tags),
        date: project.date || undefined,
    };
}
