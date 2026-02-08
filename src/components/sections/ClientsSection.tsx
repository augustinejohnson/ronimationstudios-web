import { db } from '@/lib/db';
import Image from 'next/image';

export async function ClientsSection() {
    const clients = await db.clientLogo.findMany({
        orderBy: { createdAt: 'desc' },
    });

    if (clients.length === 0) return null;

    return (
        <section className="py-20 md:py-32 bg-black border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Trusted By</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
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
                                className="object-contain max-h-full max-w-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
