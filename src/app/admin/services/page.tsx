import { db } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteService } from '@/app/actions/services';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    const services = await db.service.findMany({
        orderBy: { title: 'asc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-display">Services</h1>
                <Link
                    href="/admin/services/new"
                    className="bg-white text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                    <Plus size={20} />
                    Add Service
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                        <div className="h-48 relative overflow-hidden">
                            <img
                                src={service.heroImage}
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold font-display">{service.title}</h3>
                                <p className="text-sm text-gray-300 line-clamp-1">{service.subtitle}</p>
                            </div>
                        </div>

                        <div className="p-4 flex justify-end gap-2 border-t border-white/5 bg-black/20">
                            <Link
                                href={`/admin/services/${service.id}`}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400"
                            >
                                <Edit size={18} />
                            </Link>
                            <form action={deleteService.bind(null, service.id)}>
                                <button
                                    type="submit"
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            {services.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No services found. create one to get started.
                </div>
            )}
        </div>
    );
}
