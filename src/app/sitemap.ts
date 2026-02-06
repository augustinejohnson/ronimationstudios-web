import { MetadataRoute } from 'next';
import { getServices } from '@/lib/services';
import { getProjects } from '@/lib/portfolio';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ronimationstudios.com';

    const services = await getServices();
    const projects = await getProjects();
    const posts = await getAllPosts();

    // Static Routes
    const staticRoutes = [
        '',
        '/contact',
        '/booking',
        '/work',
        '/insights',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Services
    const serviceRoutes = Object.keys(services).map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Portfolio
    const portfolioRoutes = projects.map((project) => ({
        url: `${baseUrl}/work/${project.id}`,
        lastModified: new Date(), // Ideally real modified date
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Blog
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/insights/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
}
