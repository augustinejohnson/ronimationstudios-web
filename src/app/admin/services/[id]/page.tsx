import ServiceForm from '@/components/admin/ServiceForm';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await db.service.findUnique({
        where: { id },
    });

    if (!service) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Edit Service</h1>
            <ServiceForm service={service} />
        </div>
    );
}
