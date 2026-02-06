import db from './db';

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Markdown content
    date: string;
    author: string;
    authorRole: string;
    coverImage: string;
    tags: string[];
};

export async function getAllPosts(): Promise<BlogPost[]> {
    const posts = await db.blogPost.findMany({
        orderBy: {
            date: 'desc',
        },
    });

    return posts.map((post: any) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        author: post.author,
        authorRole: post.authorRole,
        coverImage: post.coverImage,
        tags: JSON.parse(post.tags),
    }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const post = await db.blogPost.findUnique({
        where: { slug },
    });

    if (!post) return undefined;

    return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        author: post.author,
        authorRole: post.authorRole,
        coverImage: post.coverImage,
        tags: JSON.parse(post.tags),
    };
}
