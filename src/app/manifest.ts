import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Ronimation Studios',
        short_name: 'Ronimation',
        description: 'Visualizing Sound. Amplifying Vision.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#8a2ce2',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
