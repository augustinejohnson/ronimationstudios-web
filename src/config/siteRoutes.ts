export type ServiceRoute = {
  id: string;
  title: string;
  routePath: string;
  externalResourceLink?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  linkedinUrl?: string;
  email?: string;
};

export const siteRoutes = {
  global: {
    home: '/',
    contact: '/contact',
    booking: '/booking',
    email: 'mailto:contact@ronimation.com',
  },
  hero: {
    primaryCta: '#services', // "Explore Services" (scrolling to services)
    secondaryCta: '#showreel', // "View Showreel" (triggers modal)
    startProject: '/contact', // "Start Project" internal link
    velocity: '#velocity', // Velocity section
    showreel: 'https://www.youtube.com/embed/OnBgZGdua_E?autoplay=1',
  },
  social: {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
  services: [
    {
      id: 'audio-music',
      title: 'Audio & Music Production',
      routePath: '/services/audio-music',
      externalResourceLink: 'https://soundcloud.com/example',
    },
    {
      id: 'visuals',
      title: 'Visuals & Animation',
      routePath: '/services/visuals',
    },
    {
      id: 'marketing',
      title: 'Digital Marketing',
      routePath: '/services/interactive-tech', // mapped "marketing/tech" to this
    },
  ] as ServiceRoute[],
  team: [
    {
      id: 'ron',
      name: 'Ron',
      role: 'Founder',
      linkedinUrl: 'https://linkedin.com/in/ron',
      email: 'ron@ronimation.com',
    },
  ] as TeamMember[],
};
