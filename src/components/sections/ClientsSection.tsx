import { db } from '@/lib/db';
import Image from 'next/image';

export async function ClientsSection() {
    let clients: any[] = [];
    try {
        clients = await db.clientLogo.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.warn('Database temporarily unreachable for ClientsSection. Silently skipping client logos:', error);
    }

    if (!clients || clients.length === 0) return null;

    return (
        <section className="py-20 md:py-32 bg-white border-t border-gray-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a2e] font-display mb-6">Trusted By</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We have had the privilege to work with some amazing companies and brands.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {clients.map((client) => (
                        <div key={client.id} className="relative w-full h-24 flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
                            <Image
                                src={client.logo}
                                alt={client.name}
                                width={180}
                                height={80}
                                className="object-contain max-h-full max-w-full pointer-events-none select-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
