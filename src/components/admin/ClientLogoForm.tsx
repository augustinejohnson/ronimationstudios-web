'use client';

import { createClientLogo, updateClientLogo } from '@/app/actions/clients';
import { useState } from 'react';

type ClientLogo = {
    id?: string;
    name: string;
    logo: string;
};

export default function ClientLogoForm({ client }: { client?: ClientLogo }) {
    const isEditing = !!client;
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSaving(true);
        try {
            if (isEditing && client?.id) {
                await updateClientLogo(client.id, formData);
            } else {
                await createClientLogo(formData);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to save. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Client Name</label>
                <input
                    name="name"
                    defaultValue={client?.name}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Logo URL</label>
                <input
                    name="logo"
                    defaultValue={client?.logo}
                    required
                    placeholder="/images/clients/..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                />
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
                {isSaving ? 'Saving...' : (isEditing ? 'Update Client' : 'Add Client')}
            </button>
        </form>
    );
}
