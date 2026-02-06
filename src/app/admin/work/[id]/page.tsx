import PortfolioForm from '@/components/admin/PortfolioForm';
import db from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await db.portfolioItem.findUnique({
        where: { id },
    });

    if (!item) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Edit Project</h1>
            <PortfolioForm item={item} />
        </div>
    );
}
