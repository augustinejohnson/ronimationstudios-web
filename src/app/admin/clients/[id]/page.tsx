import ClientLogoForm from '@/components/admin/ClientLogoForm';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditClientLogoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const client = await db.clientLogo.findUnique({
        where: { id },
    });

    if (!client) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Edit Client</h1>
            <ClientLogoForm client={client} />
        </div>
    );
}
