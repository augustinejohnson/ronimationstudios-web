import TeamForm from '@/components/admin/TeamForm';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const member = await db.teamMember.findUnique({
        where: { id },
    });

    if (!member) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Edit Team Member</h1>
            <TeamForm member={member} />
        </div>
    );
}
