'use client';

import { createTeamMember, updateTeamMember } from '@/app/actions/team';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type TeamMember = {
    id?: string;
    name: string;
    role: string;
    quote: string;
    img: string;
    color: string;
    text: string;
    gradient: string;
    socialEmail?: string | null;
    socialPortfolio?: string | null;
    socialLinkedin?: string | null;
};

export default function TeamForm({ member }: { member?: TeamMember }) {
    const isEditing = !!member;
    const [isSaving, setIsSaving] = useState(false);

    // In React 19 / Neast 15+, using server actions directly in form action is preferred,
    // but for simple loading state we can wrap it or use useActionState.
    // For simplicity here, we'll just submit standard form.

    const handleSubmit = async (formData: FormData) => {
        setIsSaving(true);
        if (isEditing && member?.id) {
            await updateTeamMember(member.id, formData);
        } else {
            await createTeamMember(formData);
        }
        setIsSaving(false);
    };

    return (
        <form action={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                        name="name"
                        defaultValue={member?.name}
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                    <input
                        name="role"
                        defaultValue={member?.role}
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">ID (Optional override)</label>
                <input
                    name="id"
                    defaultValue={member?.id}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white font-mono text-sm"
                    placeholder="Auto-generated if left blank"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Quote</label>
                <textarea
                    name="quote"
                    defaultValue={member?.quote}
                    required
                    rows={3}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                    <input
                        name="img"
                        defaultValue={member?.img}
                        required
                        placeholder="/images/team/..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Theme Color</label>
                    <input
                        name="color"
                        defaultValue={member?.color || '#ffffff'}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                    />
                </div>
                {/* Add more fields for text, gradient, socials if needed. For brevity, I'll add them.*/}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Text Color (white/black)</label>
                    <select name="text" defaultValue={member?.text || 'black'} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white">
                        <option value="black">Black</option>
                        <option value="white">White</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Gradient (CSS)</label>
                    <input
                        name="gradient"
                        defaultValue={member?.gradient || 'none'}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                    />
                </div>
            </div>

            <div className="border-t border-white/10 pt-4">
                <h3 className="text-lg font-medium mb-4">Socials</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input name="socialEmail" defaultValue={member?.socialEmail || ''} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Portfolio</label>
                        <input name="socialPortfolio" defaultValue={member?.socialPortfolio || ''} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn</label>
                        <input name="socialLinkedin" defaultValue={member?.socialLinkedin || ''} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
                {isSaving ? 'Saving...' : (isEditing ? 'Update Member' : 'Create Member')}
            </button>
        </form>
    );
}
