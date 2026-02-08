'use client';

import { HeroVideo } from './HeroVideo';
import { HeroImage } from './HeroImage';

export const Hero = () => {
    // TOGGLE HERE: Set to true for Video, false for Image
    const USE_VIDEO_BACKGROUND = true;

    if (USE_VIDEO_BACKGROUND) {
        return <HeroVideo />;
    }

    return <HeroImage />;
};
