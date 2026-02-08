import type { Metadata } from 'next';
import { Space_Grotesk, Noto_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto', weight: ['300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Ronimation Studios | The Future of Media",
  description: "High-fidelity audio, immersive visuals, and generative AI production. We define the new standard for African multimedia.",
  openGraph: {
    title: "Ronimation Studios",
    description: "Where technology meets creativity. Audio, Visuals, Tech & AI.",
    url: "https://ronimationstudios.com",
    siteName: "Ronimation Studios",
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLISvCb7LSMmSZmPVbsoJa5zYmqGjnbxsqFHmVhz8Cz0KHBWzL_YamnvGq3_nNkPkK5eL9cwiGFu7tkVgGvMs3ssbEtEV8pf_OJuWOGAFZcKWZUXNS7Vs55MUvjfq08m1YYN_zzCRxh30gZf6NRARgPmnk6tnQHEM270T9YgqC2FMl_JXejF8deHe31-b-zNys4TVmQ2pxQIbq2P3nIPircv6M9LiLhF-eoD8SKTl4-I2bG1lodztgpvBbaBlv1kfQUPFciGQHJeI", // Using the VisualHero image as default
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.variable} ${notoSans.variable} bg-background-dark text-white font-display antialiased selection:bg-primary selection:text-white`}>
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ronimation Studios",
              "url": "https://ronimationstudios.com",
              "logo": "https://ronimationstudios.com/logo.png",
              "sameAs": [
                "https://instagram.com/ronimation",
                "https://twitter.com/ronimation",
                "https://linkedin.com/company/ronimation"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+2348124580183",
                "contactType": "customer service"
              }
            })
          }}
        />
        {children}
        <Toaster position="top-center" richColors theme="dark" />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      </body>
    </html>
  );
}
