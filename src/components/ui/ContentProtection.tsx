'use client';

import { useEffect } from 'react';

/**
 * ContentProtection Component
 * Protects site media assets from unauthorized downloading:
 * 1. Disables context menu (right-click) on images, videos, audios, and canvas.
 * 2. Disables drag-and-drop saving of media files.
 * 3. Enforces 'nodownload' on all HTML5 audio/video elements.
 * 4. Intercepts common download/save keyboard shortcuts (Ctrl+S / Cmd+S).
 */
export const ContentProtection = () => {
    useEffect(() => {
        // Prevent right-click on media elements
        const handleContextMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'IMG' ||
                target.tagName === 'VIDEO' ||
                target.tagName === 'AUDIO' ||
                target.tagName === 'CANVAS' ||
                target.closest('img') ||
                target.closest('video') ||
                target.closest('audio')
            ) {
                e.preventDefault();
            }
        };

        // Prevent dragging images / media to desktop or other tabs
        const handleDragStart = (e: DragEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'IMG' ||
                target.tagName === 'VIDEO' ||
                target.tagName === 'AUDIO' ||
                target.closest('img')
            ) {
                e.preventDefault();
            }
        };

        // Prevent Ctrl+S / Cmd+S save shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
            }
        };

        // Enforce nodownload on all video/audio elements on page
        const enforceNoDownload = () => {
            const mediaElements = document.querySelectorAll('video, audio');
            mediaElements.forEach((el) => {
                const media = el as HTMLMediaElement;
                media.setAttribute('controlsList', 'nodownload noplaybackrate');
                media.setAttribute('disablePictureInPicture', 'true');
                media.setAttribute('oncontextmenu', 'return false;');
            });
        };

        // Run initially and observe dynamic DOM changes
        enforceNoDownload();
        const observer = new MutationObserver(enforceNoDownload);
        observer.observe(document.body, { childList: true, subtree: true });

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            observer.disconnect();
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null;
};
