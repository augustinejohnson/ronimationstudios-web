'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Star } from 'lucide-react';
import { sendFeedback } from '@/app/actions/feedback';
import { toast } from 'sonner';

export function FeedbackModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        formData.append('rating', rating.toString());

        startTransition(async () => {
            const result = await sendFeedback(null, formData);
            if (result.success) {
                toast.success(result.message);
                setIsOpen(false);
                setRating(0);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
                <MessageSquare size={16} />
                <span>Give Feedback</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#131318] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <h3 className="font-bold text-lg font-display">Your Feedback</h3>
                                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <form action={handleSubmit} className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Rate your experience</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setRating(star)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={28}
                                                    className={`${star <= (hoverRating || rating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-600'
                                                        } transition-colors`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Comments (Optional)</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors text-white resize-none text-sm"
                                        placeholder="How can we improve?"
                                    />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        {isPending ? 'Sending...' : 'Send Feedback'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
