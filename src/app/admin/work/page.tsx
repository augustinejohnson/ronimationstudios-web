import Link from 'next/link';
import db from '@/lib/db';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deletePortfolioItem } from '@/app/actions/portfolio';
import Image from 'next/image';

export default async function PortfolioAdminPage() {
    const projects = await db.portfolioItem.findMany();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-display">Portfolio Projects</h1>
                <Link
                    href="/admin/work/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                    <Plus size={18} />
                    Add Project
                </Link>
            </div>

            <div className="grid gap-4">
                {projects.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-9 rounded overflow-hidden bg-gray-800">
                                <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.category}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                href={`/admin/work/${item.id}`}
                                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                            >
                                <Edit size={18} />
                            </Link>

                            <form action={async () => {
                                'use server';
                                await deletePortfolioItem(item.id);
                            }}>
                                <button type="submit" className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
