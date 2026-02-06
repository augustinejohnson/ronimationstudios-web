const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const teamData = [
    {
        name: "Johnson Augustine",
        role: "The Visionary",
        quote: "Technology is just the brush. The mind is the canvas.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAed2okmcsw6uwXl5dWLCC2xREssCuLdSX0fSyKbsrEfan1Z7ua2jvs_PFk-vbRfMljtiktLuqdfsP9WANeey9xAyB0BxQDBZG3VOJVWbpHRBrwS4aUm40zb2IZfT4YKEfQSuHff2x1Z0zL_lo6AwiojlV-lZwOoXT6yTinW6mUYBGCmri4zoezq4n-dnIBSRgymVcaXPnS0oOMApJ4OfeQmch9SGI8CX9BZtzH6TPf6irQFLdHpIIaYE8-JS-WVkka0dccEHf2qNI",
        color: "border-primary/30",
        text: "text-primary",
        gradient: "from-primary",
        social: {
            email: "johnson@ronimation.com"
        }
    },
    {
        name: "Sarah Ada",
        role: "The Chaos Solver",
        quote: "Bringing structure to the most abstract ideas.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuATquDdhXnZVDC-yIrCdEF5n27-jhMOKkkn6V2wlE51zDTfFif1CxTUzJfol798GcL5N2wp2_FpqHIlx0URjpfw4w6fiYP9VYKGS8Gc0gx78xhoRer4lGepHzqaq2f4Dvpv9F8SDOQe2C712i2dcmbUFabWj0r-QasAdlaeuKn8UYc59gEWKg3BYmCRfy2apZv8Vq1VL9U8ZrLC-hVccA1MuDB-mIDmiqzk1G5gDMEf6XJjV35RNBDsOz9oxMchXNHDgtmOC3d3ABo",
        color: "border-secondary/30",
        text: "text-secondary",
        gradient: "from-secondary",
        social: {
            email: "sarah@ronimation.com"
        }
    },
    {
        name: "Michael Obi",
        role: "The Sound Architect",
        quote: "If you can feel it, I can engineer it.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVrADd_8wQasqTMENFNgaS0PuT39n87SPU1GFcIOYwPx04hZeo3eDNn2rE9QJdNPGBDug5EUPTdVZAB_5LVhKTjTE5np4dYAcAaKLkGuFaS-7Bq5J0jVSIfQHHDzIbsSAyisQJcjz6VzMnAbQRmAADxk0og-ZLmrlZnwbkuLI94tK1GddwkrgFbZfjcFTuIpic5-Zo9JvDQX9OTzcIOvfdqyYtCslIJIs5dmv9TMk8G80LmIj4ZJmKP0_ySmv3_ttFfvBi-a1XT_4",
        color: "border-purple-500/30",
        text: "text-purple-500",
        gradient: "from-purple-500",
        social: {
            email: "michael@ronimation.com"
        }
    },
    {
        name: "Chidi Nnaji",
        role: "The Code Weaver",
        quote: "Blending algorithms with aesthetics.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSzBQoX4GL0PSxKL4EtRI_bSxSc-KcYOLC19cUAarN3Bs17pABkLdLthjKeEEZ1myUdRDGqiL_qSSrPNSPa0f4-KXAsMfubK_NG_d3cckA2_1qpzouqRGZQ2-ZYf4UHT2fl7H3VcpWSpRrZJ77Cig7F94O8k7nwi9CjIyAYJXZRLnI9G1upzR8-eG7h6dkqLcwVwOebtmoUQFt4KGROYmeLh0EJhdnpC1cO1Y7eLUrsPu00gl7liX94ikpvggVruAHJWlqXVN2zeA",
        color: "border-pink-500/30",
        text: "text-pink-500",
        gradient: "from-pink-500",
        social: {
            email: "chidi@ronimation.com"
        }
    }
];

const servicesData = {
    'audio-music': {
        id: 'audio-music',
        title: 'Audio & Music Production',
        subtitle: 'Sonic Branding for the Next Generation',
        description: `At Ronimation, sound is more than just waves; it’s an emotion. We specialize in high-fidelity audio engineering, spatial audio mixing, and bespoke music composition. Whether you need a cinematic score, a podcast intro, or full-scale album production, our studios are equipped to deliver pristine quality.`,
        heroImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
        features: [
            {
                title: 'Spatial Audio',
                description: 'Immersive soundscapes using Dolby Atmos technology.',
                icon: 'graphic_eq',
                link: '/work/sonic-branding-xyz'
            },
            {
                title: 'Voiceover Recording',
                description: 'Professional voice talent casting and recording.',
                icon: 'mic',
            },
            {
                title: 'Sound Design',
                description: 'Creating custom sound effects for film and games.',
                icon: 'volume_up',
            }
        ],
        ctaText: 'Start Your Audio Project',
        ctaLink: '/contact?service=audio'
    },
    'visuals': {
        id: 'visuals',
        title: 'Visuals & Animation',
        subtitle: 'Narratives That Stick',
        description: `From 2D motion graphics to high-end 3D character animation, we bring stories to life. Our visual team combines artistic intuition with technical prowess to create stunning video content for brands, filmmakers, and digital platforms.`,
        heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
        features: [
            {
                title: '3D Animation',
                description: 'Product visualization and character animation.',
                icon: 'view_in_ar',
                link: '/work/neon-dreams'
            },
            {
                title: 'Motion Graphics',
                description: 'Dynamic typography and brand idents.',
                icon: 'animation',
            },
            {
                title: 'VFX Compositing',
                description: 'Seamless integration of CGI into live action.',
                icon: 'movie_filter',
            }
        ],
        ctaText: 'View Portfolio',
        ctaLink: '/work'
    },
    'interactive-tech': {
        id: 'interactive-tech',
        title: 'Branding & Interactive Tech',
        subtitle: 'Immersive Digital Experiences',
        description: `We build bridges between the physical and digital worlds. From XR (Extended Reality) installations to interactive web experiences and app designs, we leverage technology to create memorable user journeys.`,
        heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        features: [
            {
                title: 'Web & App Design',
                description: 'User-centric UI/UX design and development.',
                icon: 'devices',
                link: '/work/ar-museum-guide'
            },
            {
                title: 'XR Solutions',
                description: 'AR/VR experiences for marketing and education.',
                icon: 'view_in_ar',
            },
            {
                title: 'Interactive Installations',
                description: 'Physical computing and sensor-based art.',
                icon: 'touch_app',
            }
        ],
        ctaText: 'Discuss Your Tech Needs',
        ctaLink: '/contact?service=tech'
    },
    'gen-ai': {
        id: 'gen-ai',
        title: 'Generative AI Video Production',
        subtitle: 'From Script to Screen at Light Speed',
        description: `Unlock the power of Ronimation Velocity™. We leverage state-of-the-art diffusion models and custom LoRAs to generate high-fidelity video content. Whether for rapid storyboarding, music visualization, or full-scale AI film production, our workflows reduce production time by up to 90% while maintaining precise artistic control.`,
        heroImage: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2070&auto=format&fit=crop',
        features: [
            {
                title: 'Custom Model Training',
                description: 'Fine-tuning models on your brand assets for consistent style.',
                icon: 'psychology',
                link: '/work/ai-fashion-campaign'
            },
            {
                title: 'AI Music Videos',
                description: 'Audio-reactive visuals generated in real-time.',
                icon: 'graphic_eq'
            },
            {
                title: 'Rapid Storyboarding',
                description: 'Visualize scripts instantly with consistent characters.',
                icon: 'speed'
            }
        ],
        ctaText: 'Explore AI Solutions',
        ctaLink: '/contact?service=ai'
    },
    'audio-restoration': {
        id: 'audio-restoration',
        title: 'Neural Audio Restoration',
        subtitle: 'Reviving the Past with Future Tech',
        description: `Our proprietary audio restoration pipeline uses deep learning to isolate and repair damaged audio. Ideally suited for archival footage, old recordings, or noisy field recordings. We remove background noise, reverb, and clicks without artifacts, preserving the original character of the sound.`,
        heroImage: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop',
        features: [
            {
                title: 'Spectral Repair',
                description: 'Surgical removal of unwanted sounds.',
                icon: 'content_cut'
            },
            {
                title: 'Dereverberation',
                description: 'Removing room echo for dry, studio-quality vocals.',
                icon: 'meeting_room'
            },
            {
                title: 'Dialogue Isolation',
                description: 'Extracting speech from noisy backgrounds.',
                icon: 'record_voice_over'
            }
        ],
        ctaText: 'Restore Your Audio',
        ctaLink: '/contact?service=restoration'
    }
};

const portfolioData = [
    {
        id: 'neon-dreams',
        title: 'Neon Dreams',
        category: 'Visuals',
        client: 'Future Synth',
        description: 'A cyberpunk-inspired music video featuring 3D character animation and motion capture.',
        fullDescription: `
            For Future Synth's latest hit "Neon Dreams", we created a fully immersive cyberpunk world. 
            Using Unreal Engine 5 for real-time rendering and motion capture data from our in-house suit, 
            we brought the protagonist to life in a gritty, neon-soaked metropolis.
            
            The project involved:
            - Character Design & Modeling
            - Motion Capture Cleanup
            - Environment Design
            - Final Compositing in Nuke
        `,
        coverImage: 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1615714781440-ae4045fb9f4f?q=80&w=2070&auto=format&fit=crop'
        ],
        videoUrl: 'https://www.youtube.com/embed/OnBgZGdua_E', // Placeholder
        tags: ['3D Animation', 'Music Video', 'Cyberpunk', 'UE5'],
        date: undefined
    },
    {
        id: 'sonic-branding-xyz',
        title: 'XYZ Corp Sonic Branding',
        category: 'Audio',
        client: 'XYZ Corp',
        description: 'Complete sonic identity package including logo mnemonic, UI sounds, and brand anthem.',
        fullDescription: `
            XYZ Corp needed a sound that cut through the noise. We developed a comprehensive sonic branding package 
            that reflects their innovation and reliability. The core mnemonic is built from organic synthesized textures 
            layered with a human heartbeat rhythm, symbolizing technology with a soul.
        `,
        coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=2076&auto=format&fit=crop',
        galleryImages: [],
        tags: ['Sound Design', 'Branding', 'UI Audio'],
        date: undefined
    },
    {
        id: 'ar-museum-guide',
        title: 'AR Museum Guide',
        category: 'Tech',
        client: 'National History Museum',
        description: 'An augmented reality app that brings dinosaur fossils to life for museum visitors.',
        fullDescription: `
            We partnered with the National History Museum to create an educational AR experience. 
            Visitors point their tablets at fossil exhibits to see flesh-and-blood reconstructions of the dinosaurs, 
            complete with scientifcally accurate animations and spatial audio roars.
        `,
        coverImage: 'https://images.unsplash.com/photo-1633167606207-d840b507049c?q=80&w=2069&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
        ],
        tags: ['Augmented Reality', 'Mobile App', 'Education', 'Unity'],
        date: undefined
    },
    {
        id: 'ai-fashion-campaign',
        title: 'Vogue AI Campaign',
        category: 'AI',
        client: 'Fashion Week',
        description: 'Generative AI video campaign reducing production time by 80% while maintaining high-fashion aesthetics.',
        fullDescription: `
            Using Ronimation Velocity™, we trained a custom LoRA model on the designer's sketches and fabric swatches. 
            We then generated a series of 15-second spots showcasing the collection in impossible locations—from Mars 
            to the bottom of the ocean—all while keeping the garment details pixel-perfect.
        `,
        coverImage: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2070&auto=format&fit=crop',
        galleryImages: [],
        tags: ['Generative AI', 'Fashion', 'Stable Diffusion', 'Advertising'],
        date: undefined
    }
];

const blogPosts = [
    {
        slug: 'future-of-ai-media',
        title: 'The Future of AI in Media Production',
        excerpt: 'How generative AI is not replacing artists, but giving them new superpowers. A deep dive into our Velocity™ workflow.',
        date: '2025-10-15',
        author: 'Ron',
        authorRole: 'Founder',
        coverImage: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2070&auto=format&fit=crop',
        tags: ['AI', 'Production', 'Future Tech'],
        content: `
# The Future of AI in Media Production

Generative AI is often viewed with skepticism in the creative industries. At **Ronimation Studios**, we see it differently. We see it as the most powerful tool for democratization since the digital camera.

## Beyond the Hype

The conversation around AI often lacks nuance. It's either "AI will kill art" or "AI will do everything." The reality is somewhere in the middle: **AI is a force multiplier**.

3.  **Human in the Loop**: AI generates the raw material, but our artists provide the intent, the curation, and the final polish.

## The Velocity™ Advantage

Traditional animation is slow and expensive. High-quality 3D production can take weeks for a few seconds of footage. With our AI-assisted workflows, we can produce broadcast-quality visuals at a fraction of the time.

> "AI doesn't replace the artist. It challenges the artist to dream bigger."

## Looking Ahead

We are currently experimenting with:
- **Real-time Style Transfer**: Changing the look of live-action footage on the fly.
- **AI-Driven Soundscapes**: generating reactive audio that evolves with the visual narrative.

The future isn't just about automation; it's about **augmentation**.
        `
    },
    {
        slug: 'spatial-audio-explained',
        title: 'Why Spatial Audio Matters for Your Brand',
        excerpt: 'Sound is 50% of the experience. Learn how Dolby Atmos and binaural audio can increase engagement and retention.',
        date: '2025-11-02',
        author: 'Sarah',
        authorRole: 'Lead Audio Engineer',
        coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
        tags: ['Audio', 'Dolby Atmos', 'Branding'],
        content: `
# Why Spatial Audio Matters

In a world fighting for attention, visual fidelity has hit a plateau. 4K, 8K, HDR... screens look amazing. But what about the sound?

**Spatial Audio** (or 3D Audio) is the next frontier of immersion.

## It's Not Just for Movies

While cinema effectively uses surround sound, brands are missing out.
- **Podcasts**: Immersive storytelling places the listener *inside* the narrative.
- **Retail**: In-store soundscapes that guide customer flow.
- **Apps**: UI sounds that have directionality and depth.

## The Science of Immersion

Our brains are wired to locate sound sources. When audio is "flat" (stereo), it feels artificial. Spatial audio mimics how we hear in the real world, reducing cognitive load and increasing emotional impact.

At Ronimation, we mix everything in **Dolby Atmos** by default, downmixing to binaural for headphone users. This ensures the best experience on any device.
        `
    },
    {
        slug: 'new-post-placeholder',
        title: 'New Post Title',
        excerpt: 'Write a short summary of the post here.',
        content: `
# New Post Title

Write your post content here using Markdown.
        `,
        date: '2026-02-01',
        author: 'Ron',
        authorRole: 'Founder',
        coverImage: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2070&auto=format&fit=crop',
        tags: ['Update']
    }
];

async function main() {
    console.log('Start seeding ...');

    // Seed Team Members
    for (const member of teamData) {
        try {
            const createdMember = await prisma.teamMember.create({
                data: {
                    name: member.name,
                    role: member.role,
                    quote: member.quote,
                    img: member.img,
                    color: member.color,
                    text: member.text,
                    gradient: member.gradient,
                    socialEmail: member.social.email,
                    socialPortfolio: member.social.portfolio,
                    socialLinkedin: member.social.linkedin,
                },
            });
            console.log(`Created team member with id: ${createdMember.id}`);
        } catch (e) {
            console.log(`Failed (or already exists): ${member.name}`);
        }
    }

    // Seed Services
    for (const key in servicesData) {
        const service = servicesData[key];
        try {
            const createdService = await prisma.service.create({
                data: {
                    id: service.id,
                    title: service.title,
                    subtitle: service.subtitle,
                    description: service.description,
                    heroImage: service.heroImage,
                    features: JSON.stringify(service.features),
                    ctaText: service.ctaText,
                    ctaLink: service.ctaLink,
                },
            });
            console.log(`Created service with id: ${createdService.id}`);
        } catch (e) {
            console.log(`Failed: ${service.id}`);
        }
    }

    // Seed Portfolio Items
    for (const project of portfolioData) {
        try {
            const createdProject = await prisma.portfolioItem.create({
                data: {
                    id: project.id,
                    title: project.title,
                    category: project.category,
                    client: project.client,
                    description: project.description,
                    fullDescription: project.fullDescription,
                    coverImage: project.coverImage,
                    galleryImages: JSON.stringify(project.galleryImages),
                    videoUrl: project.videoUrl,
                    tags: JSON.stringify(project.tags),
                    date: project.date,
                },
            });
            console.log(`Created portfolio item with id: ${createdProject.id}`);
        } catch (e) {
            console.log(`Failed: ${project.id}`);
        }
    }

    // Seed Blog Posts
    for (const post of blogPosts) {
        try {
            const createdPost = await prisma.blogPost.create({
                data: {
                    slug: post.slug,
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content,
                    date: post.date,
                    author: post.author,
                    authorRole: post.authorRole,
                    coverImage: post.coverImage,
                    tags: JSON.stringify(post.tags),
                },
            });
            console.log(`Created blog post with slug: ${createdPost.slug}`);
        } catch (e) {
            console.log(`Failed: ${post.slug}`);
        }
    }

    // Seed Admin User
    const adminEmail = 'admin@ronimation.com';
    // Hash for 'password123' using bcrypt (pre-calculated to avoid dependency in seed script if possible, but let's use a simpler approach or just plain text for now if seed.js is simple node)
    // Actually, since this is a seed script running in Node, we can require bcryptjs if it's installed.
    // However, to keep seed.js simple and dependency-free if possible (or just use what we have), 
    // I'll assume we can use the library since we are installing it.
    // BUT, `require('bcryptjs')` might fail if it's an ESM module or if types mismatch.
    // Let's use a hardcoded hash for 'password123' to be safe and avoid runtime issues in seed.js
    // Hash for 'password123' (bcrypt): $2a$10$fW.q/..  (Wait, I can't guess a valid salt/hash).
    // Let's try to require it.

    // Better yet, let's just create the user. I'll rely on the app to hash it? No, seed needs to insert valid data.
    // I will try to require bcryptjs.

    try {
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('password123', 10);

        const admin = await prisma.adminUser.upsert({
            where: { email: adminEmail },
            update: {},
            create: {
                email: adminEmail,
                password: hashedPassword,
                name: 'Admin',
            },
        });
        console.log(`Created admin user: ${admin.email}`);
    } catch (e) {
        console.log('Failed to seed admin (or bcrypt missing, or already exists)');
        console.error(e);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
