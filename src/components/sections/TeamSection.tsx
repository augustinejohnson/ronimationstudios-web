'use client';

import { useRef } from 'react';
import { SmartLink } from '@/components/ui/SmartLink';
import Image from 'next/image';
import { TeamMember } from '@/lib/team';
import { Globe, Linkedin, Mail } from 'lucide-react';

interface TeamSectionProps {
    teamMembers: TeamMember[];
}

export const TeamSection = ({ teamMembers }: TeamSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const team = teamMembers;

    return (
        <section id="team" className="py-24 bg-[#FAFAF8] relative border-b border-gray-200 overflow-hidden scroll-mt-24">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">

                {/* Header with Arrows */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2 font-display">The Architects</h2>
                        <p className="text-gray-500 text-sm font-body">Meet the minds behind the magic.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-gray-700 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-gray-700 transition-colors">
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-10 no-scrollbar px-1 snap-x snap-mandatory"
                >
                    {team.map((member, i) => (
                        <div key={i} className="min-w-[300px] snap-center bg-white shadow-sm border border-gray-100 rounded-lg p-6 flex flex-col items-center text-center relative overflow-hidden group transition-all hover:bg-gray-50">

                            {/* Gradient Line */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${member.gradient} to-transparent`}></div>

                            <div className={`size-24 rounded-full p-1 border-2 ${member.color} mb-4 overflow-hidden relative transition-colors`}>
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[#1a1a2e] font-display mb-1">{member.name}</h3>
                            <p className={`${member.text} text-xs font-mono uppercase tracking-widest mb-4`}>{member.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 italic font-body">"{member.quote}"</p>

                            <div className="mt-auto flex gap-3">
                                {member.social.portfolio && (
                                    <SmartLink href={member.social.portfolio} className="text-gray-400 hover:text-primary transition-colors">
                                        <Globe className="w-5 h-5" />
                                    </SmartLink>
                                )}
                                {member.social.linkedin && (
                                    <SmartLink href={member.social.linkedin} className="text-gray-400 hover:text-primary transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </SmartLink>
                                )}
                                {member.social.email && (
                                    <SmartLink href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-primary transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </SmartLink>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
