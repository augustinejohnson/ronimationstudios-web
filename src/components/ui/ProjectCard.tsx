'use client';

import { Project } from '@/lib/portfolio';
import { SmartLink } from '@/components/ui/SmartLink';
import Image from 'next/image';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    return (
        <SmartLink
            href={`/work/${project.id}`}
            className="group block relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(46,16,101,0.1)] hover:-translate-y-1.5 transition-all duration-300"
        >
            {/* Image Container */}
            <div className="aspect-video relative overflow-hidden bg-slate-100">
                {project.coverImage.includes('youtu') ? (
                    <div className="w-full h-full flex items-center justify-center bg-purple-900/10">
                        <span className="text-xs text-purple-700 font-bold">VIDEO LINK</span>
                    </div>
                ) : project.coverImage.startsWith('gs://') ? (
                    <div className="w-full h-full flex items-center justify-center bg-amber-900/10">
                        <span className="text-xs text-amber-600 font-bold px-1 text-center">PREVIEW</span>
                    </div>
                ) : (
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#1E1B4B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                    <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider">
                        View Project <span className="material-symbols-outlined ml-1.5 text-sm">arrow_forward</span>
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                        {project.category}
                    </span>
                    {project.client && <span className="text-xs text-slate-400 font-medium">{project.client}</span>}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 font-display group-hover:text-purple-700 transition-colors">
                    {project.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 font-body leading-relaxed">
                    {project.description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </SmartLink>
    );
};
