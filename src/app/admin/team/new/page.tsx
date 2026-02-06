import TeamForm from '@/components/admin/TeamForm';

export default function NewTeamMemberPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Add Team Member</h1>
            <TeamForm />
        </div>
    );
}
