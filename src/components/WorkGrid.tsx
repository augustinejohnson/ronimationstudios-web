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
            <section className="px-6 mb-12">
                <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat as any)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? 'bg-white text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <section className="px-6 pb-32">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <MotionWrapper key={project.id} delay={index * 0.1}>
                                <ProjectCard project={project} index={index} />
                            </MotionWrapper>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No projects found in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
