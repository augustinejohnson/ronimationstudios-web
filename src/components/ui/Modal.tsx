'use client';

import { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            {/* Backdrop click to close */}
            <div
                className="absolute inset-0"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-4xl bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white bg-black/50 rounded-full transition-colors"
                >
                    ✕
                </button>
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
};
