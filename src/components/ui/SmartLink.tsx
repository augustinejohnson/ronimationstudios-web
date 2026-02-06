'use client';

import Link from 'next/link';
import { ReactNode, MouseEvent } from 'react';

interface SmartLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
    target?: string;
}

export const SmartLink = ({
    href,
    children,
    className = '',
    onClick,
    target,
    ...props
}: SmartLinkProps) => {
    const isExternal = href.startsWith('http');
    const isAnchor = href.startsWith('#');

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            // If an onClick is provided (e.g., for the Modal), we might want to prevent default
            e.preventDefault();
            onClick(e);
            return;
        }

        if (isAnchor) {
            e.preventDefault();
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // 1. External Link
    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                onClick={onClick} // Allow onClick even on external (analytics etc)
                {...props}
            >
                {children}
            </a>
        );
    }

    // 2. Hash Link (Internal Anchor) or Special Action (Showreel)
    if (isAnchor) {
        return (
            <a href={href} className={className} onClick={handleClick} {...props}>
                {children}
            </a>
        );
    }

    // 3. Internal Page Route
    return (
        <Link href={href} className={className} onClick={onClick} {...props}>
            {children}
        </Link>
    );
};
