'use client';

import { createPortfolioItem, updatePortfolioItem } from '@/app/actions/portfolio';
import { useState } from 'react';

type PortfolioItem = {
    id: string; // slug
    title: string;
    category: string;
    client: string | null;
    description: string;
    fullDescription: string;
    coverImage: string;
    galleryImages: string; // JSON string
    videoUrl: string | null;
    tags: string; // JSON string
    date: string | null;
};

export default function PortfolioForm({ item }: { item?: PortfolioItem }) {
    const isEditing = !!item;
    const [isSaving, setIsSaving] = useState(false);

    const initialTags = item ? JSON.parse(item.tags).join(', ') : '';
    const initialGallery = item ? JSON.parse(item.galleryImages).join(', ') : '';

    const handleSubmit = async (formData: FormData) => {
        setIsSaving(true);
        if (isEditing && item?.id) {
            await updatePortfolioItem(item.id, formData);
        } else {
            await createPortfolioItem(formData);
        }
        setIsSaving(false);
    };

    return (
        <form action={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                    <input name="title" defaultValue={item?.title} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Slug (ID)</label>
                    <input name="id" defaultValue={item?.id} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                    <input name="category" defaultValue={item?.category} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Client</label>
                    <input name="client" defaultValue={item?.client || ''} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma separated)</label>
                <input name="tags" defaultValue={initialTags} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" placeholder="3D, Branding, Motion" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Cover Image URL</label>
                    <input name="coverImage" defaultValue={item?.coverImage} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                    <input name="date" defaultValue={item?.date || ''} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Video URL (Optional)</label>
                <input name="videoUrl" defaultValue={item?.videoUrl || ''} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Gallery Images (comma separated URLs)</label>
                <textarea name="galleryImages" defaultValue={initialGallery} required rows={2} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white font-mono" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Internal Description (Short)</label>
                <textarea name="description" defaultValue={item?.description} required rows={2} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Description</label>
                <textarea name="fullDescription" defaultValue={item?.fullDescription} required rows={5} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
                {isSaving ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
            </button>
        </form>
    );
}
