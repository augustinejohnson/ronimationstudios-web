import db from './db';

export type ServiceContent = {
    id: string; // The URL slug
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    features: {
        title: string;
        description: string;
        icon?: string;
        link?: string;
    }[];
    ctaText: string;
    ctaLink: string;
};

export async function getServices(): Promise<Record<string, ServiceContent>> {
    const services = await db.service.findMany();
    const servicesMap: Record<string, ServiceContent> = {};

    services.forEach(s => {
        servicesMap[s.id] = {
            id: s.id,
            title: s.title,
            subtitle: s.subtitle,
            description: s.description,
            heroImage: s.heroImage,
            features: JSON.parse(s.features),
            ctaText: s.ctaText,
            ctaLink: s.ctaLink,
        };
    });

    return servicesMap;
}

export async function getServiceBySlug(slug: string): Promise<ServiceContent | undefined> {
    const service = await db.service.findUnique({
        where: { id: slug },
    });

    if (!service) return undefined;

    return {
        id: service.id,
        title: service.title,
        subtitle: service.subtitle,
        description: service.description,
        heroImage: service.heroImage,
        features: JSON.parse(service.features),
        ctaText: service.ctaText,
        ctaLink: service.ctaLink,
    };
}
