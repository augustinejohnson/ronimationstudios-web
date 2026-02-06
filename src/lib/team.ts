import db from './db';

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

export async function getTeamMembers(): Promise<TeamMember[]> {
    const members = await db.teamMember.findMany();
    return members.map(m => ({
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
        }
    }));
}
