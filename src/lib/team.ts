import { db } from './db';

export type TeamMember = {
    name: string;
    role: string;
    quote: string;
    img: string;
    color: string;
    text: string;
    gradient: string;
    social: {
        portfolio?: string;
        email?: string;
        linkedin?: string;
    };
};

const FALLBACK_TEAM: TeamMember[] = [
    {
        name: 'Johnson Augustine',
        role: 'Creative Director & Founder',
        quote: 'Pioneering African creative technology through 3D worldbuilding, sound synthesis, and generative design.',
        img: '/portfolio/aretestudio.jpg',
        color: '#8a2ce2',
        text: 'text-purple-600',
        gradient: 'from-purple-900 via-indigo-900 to-black',
        social: {
            portfolio: 'https://www.playbook.com/arete/9zd1SXKzbCRHq6uJXNP3trCw',
            email: 'hello@ronimationstudios.com',
            linkedin: 'https://linkedin.com/in/johnsonaugustine',
        },
    },
];

export async function getTeamMembers(): Promise<TeamMember[]> {
    try {
        const members = await db.teamMember.findMany();
        if (members && members.length > 0) {
            return members.map((m) => ({
                name: m.name,
                role: m.role,
                quote: m.quote,
                img: m.img,
                color: m.color,
                text: m.text,
                gradient: m.gradient,
                social: {
                    portfolio: m.socialPortfolio || undefined,
                    email: m.socialEmail || undefined,
                    linkedin: m.socialLinkedin || undefined,
                },
            }));
        }
    } catch (error) {
        console.warn('Database temporarily unreachable for getTeamMembers. Using fallback team:', error);
    }
    return FALLBACK_TEAM;
}
