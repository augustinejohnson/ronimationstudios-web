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
            className="group block relative overflow-hidden rounded-xl bg-surface-dark border border-white/5 hover:border-white/20 transition-colors"
        >
            {/* Image Container */}
            <div className="aspect-video relative overflow-hidden">
                {project.coverImage.includes('youtu') ? (
                    <div className="w-full h-full flex items-center justify-center bg-red-900/20">
                        <span className="text-[10px] text-red-500 font-bold">VIDEO LINK</span>
                    </div>
                ) : project.coverImage.startsWith('gs://') ? (
                    <div className="w-full h-full flex items-center justify-center bg-yellow-900/20">
                        <span className="text-[10px] text-yellow-500 font-bold px-1 text-center">INVALID URL</span>
                    </div>
                ) : (
                    <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm text-white text-sm font-medium">
                        View Project <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-primary">{project.category}</span>
                    {project.client && <span className="text-xs text-gray-500">{project.client}</span>}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 font-body">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </SmartLink>
    );
};
