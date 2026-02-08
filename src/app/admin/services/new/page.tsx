import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Add Service</h1>
            <ServiceForm />
        </div>
    );
}
