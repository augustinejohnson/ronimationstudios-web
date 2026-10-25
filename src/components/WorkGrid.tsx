'use client';

import { useState } from 'react';
import { Project } from '@/lib/portfolio';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface WorkGridProps {
    projects: Project[];
}

export const WorkGrid = ({ projects }: WorkGridProps) => {
    const [filter, setFilter] = useState<'All' | 'Audio' | 'Visuals' | 'Tech' | 'AI'>('All');

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    const categories = ['All', 'Audio', 'Visuals', 'Tech', 'AI'];

    return (
        <>
            {/* Filter */}
            <section className="px-4 sm:px-6 mb-12 -mt-6 relative z-20">
                <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center gap-2 sm:gap-3 p-2 bg-white rounded-full shadow-md border border-slate-100 max-w-fit">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat as any)}
                            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${filter === cat
                                ? 'bg-[#1E1B4B] text-white shadow-sm'
                                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <section className="px-4 sm:px-6 pb-32">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredProjects.map((project, index) => (
                            <MotionWrapper key={project.id} delay={index * 0.08}>
                                <ProjectCard project={project} index={index} />
                            </MotionWrapper>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 p-8">
                            <span className="material-symbols-outlined text-4xl text-purple-300 mb-2">folder_open</span>
                            <p className="text-slate-500 font-medium text-sm">No projects found in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
