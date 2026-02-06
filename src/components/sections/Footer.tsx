'use client';

import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SmartLink } from '@/components/ui/SmartLink';
import { siteRoutes } from '@/config/siteRoutes';

export const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-6 border-t border-zinc-900">
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
                    </div>

                    <SmartLink
                        href={siteRoutes.global.email}
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        Get in Touch
                    </SmartLink>
                </div>
            </div>
        </footer>
    );
};
