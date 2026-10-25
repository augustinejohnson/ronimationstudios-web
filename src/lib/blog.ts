import { db } from './db';

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    authorRole: string;
    coverImage: string;
    tags: string[];
};

const FALLBACK_POSTS: BlogPost[] = [
    {
        slug: 'future-of-african-3d-animation',
        title: 'The Future of African 3D Animation & Real-Time Engines',
        excerpt: 'How real-time rendering and Unreal Engine are democratizing cinema-grade animation for African studios.',
        content: `Real-time rendering technology has fundamentally shifted how studios approach visual production. Where traditional offline render farms once required days to calculate complex lighting, modern GPU pipelines now deliver photorealistic scenes instantly.

At Ronimation Studios, we leverage procedural asset generation, high-density character topology, and real-time ray tracing to craft worlds that resonate with African mythology and futuristic sci-fi narratives.

The boundary between game assets and feature film cinematics has vanished. Creators can now design once and deploy across virtual production volumes, interactive games, and broadcast commercials.`,
        date: 'Oct 2026',
        author: 'Johnson Augustine',
        authorRole: 'Creative Director',
        coverImage: '/portfolio/3d-models.jpg',
        tags: ['3D Animation', 'Unreal Engine', 'Innovation'],
    },
    {
        slug: 'spatial-audio-and-sound-design',
        title: 'Spatial Audio: Crafting 3D Soundscapes for Immersive Media',
        excerpt: 'A deep dive into binaural audio processing, spectral denoising, and acoustic environment modeling.',
        content: `Sound is not merely accompaniment to image—it is the spatial architecture that grounds viewers in an experience. 

Through ambisonic recording techniques and surgical audio restoration, we isolate unwanted artifacts while sculpting dynamic acoustic fields that pull listeners inside the narrative.

Whether restoring damaged archival tapes or engineering original synthwave compositions, fidelity begins at the frequency level.`,
        date: 'Sep 2026',
        author: 'Ronimation Labs',
        authorRole: 'Audio Engineering',
        coverImage: '/portfolio/audios.jpg',
        tags: ['Audio Design', 'Spatial Sound', 'Mastering'],
    },
];

export async function getAllPosts(): Promise<BlogPost[]> {
    try {
        const posts = await db.blogPost.findMany({
            orderBy: {
                date: 'desc',
            },
        });

        if (posts && posts.length > 0) {
            return posts.map((post: any) => ({
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                date: post.date,
                author: post.author,
                authorRole: post.authorRole,
                coverImage: post.coverImage,
                tags: JSON.parse(post.tags || '[]'),
            }));
        }
    } catch (error) {
        console.warn('Database temporarily unreachable for getAllPosts. Using fallback posts:', error);
    }
    return FALLBACK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
        const post = await db.blogPost.findUnique({
            where: { slug },
        });

        if (post) {
            return {
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                date: post.date,
                author: post.author,
                authorRole: post.authorRole,
                coverImage: post.coverImage,
                tags: JSON.parse(post.tags || '[]'),
            };
        }
    } catch (error) {
        console.warn(`Database unreachable for getPostBySlug(${slug}). Checking fallback posts.`);
    }

    return FALLBACK_POSTS.find((p) => p.slug === slug);
}
