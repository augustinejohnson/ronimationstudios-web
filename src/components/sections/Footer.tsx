'use client';

import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SmartLink } from '@/components/ui/SmartLink';
import { siteRoutes } from '@/config/siteRoutes';
import { FeedbackModal } from '@/components/FeedbackModal';

export const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-6 border-t border-gray-800">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-zinc-500 text-sm">
                    © {new Date().getFullYear()} Ronimation Studios.
                </div>

                <div className="flex gap-6 items-center">
                    <div className="flex gap-4 mr-4 border-r border-zinc-800 pr-4">
                        <SmartLink href={siteRoutes.social.instagram} className="text-zinc-400 hover:text-white transition-colors">
                            <Instagram size={20} />
                        </SmartLink>
                        <SmartLink href={siteRoutes.social.twitter} className="text-zinc-400 hover:text-white transition-colors">
                            <Twitter size={20} />
                        </SmartLink>
                        <SmartLink href={siteRoutes.social.linkedin} className="text-zinc-400 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </SmartLink>
                        <SmartLink href={siteRoutes.social.youtube} className="text-zinc-400 hover:text-white transition-colors">
                            <Youtube size={20} />
                        </SmartLink>
                        {/* WhatsApp Icon - Using a custom SVG or similar if Lucide doesn't have it, but Lucide has MessageCircle or similar. User wanted WhatsApp specifically. Generic phone/message icon or just text if icon missing. Lucide has 'MessageCircle'. Let's check imports. */}
                        <SmartLink href={siteRoutes.global.whatsapp} className="text-zinc-400 hover:text-white transition-colors">
                            <span className="font-bold text-xs border border-zinc-600 rounded px-1 py-0.5 hover:border-white">WA</span>
                        </SmartLink>
                    </div>

                    <SmartLink
                        href={siteRoutes.global.email}
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        Get in Touch
                    </SmartLink>

                    <FeedbackModal />
                </div>
            </div>
        </footer>
    );
};
