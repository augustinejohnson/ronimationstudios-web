'use client';

import { createService, updateService } from '@/app/actions/services';
import { useState } from 'react';

type Service = {
    id: string; // slug
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    features: string; // JSON string
    ctaText: string;
    ctaLink: string;
};

export default function ServiceForm({ service }: { service?: Service }) {
    const isEditing = !!service;
    const [isSaving, setIsSaving] = useState(false);

    const initialFeatures = service ? JSON.parse(service.features) : [];
    // Convert features back to formatted JSON string for editing
    const initialFeaturesString = JSON.stringify(initialFeatures, null, 2);

    const handleSubmit = async (formData: FormData) => {
        setIsSaving(true);
        if (isEditing && service?.id) {
            await updateService(service.id, formData);
        } else {
            await createService(formData);
        }
        setIsSaving(false);
    };

    return (
        <form action={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                    <input name="title" defaultValue={service?.title} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Slug (ID)</label>
                    <input name="id" defaultValue={service?.id} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subtitle</label>
                <input name="subtitle" defaultValue={service?.subtitle} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Hero Image URL</label>
                <input name="heroImage" defaultValue={service?.heroImage} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">CTA Text</label>
                    <input name="ctaText" defaultValue={service?.ctaText} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">CTA Link</label>
                    <input name="ctaLink" defaultValue={service?.ctaLink} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea name="description" defaultValue={service?.description} required rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Features (JSON Array)</label>
                <p className="text-xs text-gray-500 mb-2">Format: <code>[{`{"title": "...", "description": "...", "icon": "..."}`}]</code></p>
                <textarea
                    name="features"
                    defaultValue={initialFeaturesString}
                    required
                    rows={10}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white font-mono text-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
                {isSaving ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
            </button>
        </form>
    );
}
