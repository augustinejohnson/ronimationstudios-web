import PortfolioForm from '@/components/admin/PortfolioForm';

export default function NewPortfolioPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Add Project</h1>
            <PortfolioForm />
        </div>
    );
}
