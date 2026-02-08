import Link from 'next/link';
import { db } from '@/lib/db';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteClientLogo } from '@/app/actions/clients';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ClientsAdminPage() {
    const clients = await db.clientLogo.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-display">Client Logos</h1>
                <Link
                    href="/admin/clients/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                    <Plus size={18} />
                    Add Client
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <div key={client.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 p-2">
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    width={64}
                                    height={64}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{client.name}</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                href={`/admin/clients/${client.id}`}
                                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                            >
                                <Edit size={18} />
                            </Link>

                            <form action={async () => {
                                'use server';
                                await deleteClientLogo(client.id);
                            }}>
                                <button type="submit" className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            {clients.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    No clients found. Add one to get started.
                </div>
            )}
        </div>
    );
}
