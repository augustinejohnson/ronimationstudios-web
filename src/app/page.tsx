import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { VelocitySection } from '@/components/sections/VelocitySection';
import { Footer } from '@/components/sections/Footer';
import { TeamSection } from '@/components/sections/TeamSection';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { getTeamMembers } from '@/lib/team';

export default async function Home() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <MotionWrapper delay={0.1}>
        <ServicesSection />
      </MotionWrapper>
      <MotionWrapper delay={0.1}>
        <VelocitySection />
      </MotionWrapper>
      <MotionWrapper delay={0.1}>
        <TeamSection teamMembers={teamMembers} />
      </MotionWrapper>

      <Footer />

    </main>
  );
}
