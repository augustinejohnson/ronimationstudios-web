import ClientLogoForm from '@/components/admin/ClientLogoForm';

export default function NewClientLogoPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Add New Client</h1>
            <ClientLogoForm />
        </div>
    );
}
