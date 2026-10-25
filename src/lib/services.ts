import { db } from './db';

export type ServiceContent = {
    id: string;
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

const FALLBACK_SERVICES: Record<string, ServiceContent> = {
    'audio-design': {
        id: 'audio-design',
        title: 'Audio Design & Scoring',
        subtitle: 'Soundscapes and Original Music',
        description: 'From bespoke film scores to cutting-edge game audio implementation and surgical restoration.',
        heroImage: '/portfolio/audios.jpg',
        features: [
            { title: 'Original Scoring', description: 'Cinematic compositions tailored to visual narratives.', icon: 'music_note' },
            { title: 'Spatial Audio', description: '3D immersive sound design for virtual worlds and games.', icon: 'spatial_audio' },
            { title: 'Audio Restoration', description: 'Spectral denoising and remastering of damaged audio stems.', icon: 'graphic_eq' },
        ],
        ctaText: 'Explore Audio Vault',
        ctaLink: '/contact',
    },
    'visual-production': {
        id: 'visual-production',
        title: '3D & Visual Production',
        subtitle: 'Virtual Worlds and Motion Graphics',
        description: 'High-impact 3D character rigs, brand identity systems, and commercial cinematics.',
        heroImage: '/portfolio/3d-models.jpg',
        features: [
            { title: '3D Modeling & Rigs', description: 'Production-ready characters and environment architecture.', icon: 'view_in_ar' },
            { title: 'Cinematic VFX', description: 'High-energy commercials, visual effects, and film trailers.', icon: 'videocam' },
            { title: 'Brand Design', description: 'Modern vector identities, UI systems, and design languages.', icon: 'palette' },
        ],
        ctaText: 'Start Production',
        ctaLink: '/contact',
    },
    'gen-ai': {
        id: 'gen-ai',
        title: 'Velocity Gen-AI Labs',
        subtitle: 'AI-Assisted Creative Pipelines',
        description: 'Accelerated concept synthesis, generative asset creation, and rapid multimedia prototyping.',
        heroImage: '/portfolio/aretestudio.jpg',
        features: [
            { title: 'Rapid Prototyping', description: 'Accelerating pre-production ideation from days to hours.', icon: 'auto_awesome' },
            { title: 'Latent Diffusion', description: 'Custom model training and bespoke generative assets.', icon: 'neurology' },
            { title: 'Pipeline Integration', description: 'Seamlessly weaving AI tools into 3D and audio workflows.', icon: 'integration_instructions' },
        ],
        ctaText: 'Explore AI Labs',
        ctaLink: '/contact',
    },
    'audio-restoration': {
        id: 'audio-restoration',
        title: 'Audio Restoration & Mastering',
        subtitle: 'Surgical Audio Repair',
        description: 'Advanced restoration for damaged historical recordings, dialogue cleanup, and commercial mastering.',
        heroImage: '/portfolio/audios.jpg',
        features: [
            { title: 'Spectral De-noise', description: 'Eliminating hiss, hum, and ambient acoustic artifacts.', icon: 'tune' },
            { title: 'Dialogue Clarity', description: 'Isolating spoken word for crystal-clear broadcast standards.', icon: 'mic' },
            { title: 'LUFS Mastering', description: 'Industry-standard loudness mastering for streaming and theatrical delivery.', icon: 'equalizer' },
        ],
        ctaText: 'Restore Your Audio',
        ctaLink: '/contact',
    },
};

export async function getServices(): Promise<Record<string, ServiceContent>> {
    try {
        const services = await db.service.findMany();
        if (services && services.length > 0) {
            const servicesMap: Record<string, ServiceContent> = {};
            services.forEach((s) => {
                servicesMap[s.id] = {
                    id: s.id,
                    title: s.title,
                    subtitle: s.subtitle,
                    description: s.description,
                    heroImage: s.heroImage,
                    features: JSON.parse(s.features || '[]'),
                    ctaText: s.ctaText,
                    ctaLink: s.ctaLink,
                };
            });
            return servicesMap;
        }
    } catch (error) {
        console.warn('Database temporarily unreachable for getServices. Using fallback services:', error);
    }
    return FALLBACK_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<ServiceContent | undefined> {
    try {
        const service = await db.service.findUnique({
            where: { id: slug },
        });

        if (service) {
            return {
                id: service.id,
                title: service.title,
                subtitle: service.subtitle,
                description: service.description,
                heroImage: service.heroImage,
                features: JSON.parse(service.features || '[]'),
                ctaText: service.ctaText,
                ctaLink: service.ctaLink,
            };
        }
    } catch (error) {
        console.warn(`Database unreachable for getServiceBySlug(${slug}). Checking fallback services.`);
    }

    return FALLBACK_SERVICES[slug];
}
