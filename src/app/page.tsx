import { Navbar } from '@/components/sections/Navbar';
import { PortfolioShowcase } from '@/components/sections/PortfolioShowcase';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { VelocitySection } from '@/components/sections/VelocitySection';
import { Footer } from '@/components/sections/Footer';
import { TeamSection } from '@/components/sections/TeamSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { getTeamMembers } from '@/lib/team';
import { getServices } from '@/lib/services';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [teamMembers, servicesMap] = await Promise.all([
    getTeamMembers(),
    getServices()
  ]);

  const allServices = Object.values(servicesMap);

  // Split services: Velocity vs Main
  const velocityIds = ['gen-ai', 'audio-restoration'];
  const velocityServices = allServices.filter(s => velocityIds.includes(s.id));
  const mainServices = allServices.filter(s => !velocityIds.includes(s.id));

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-primary selection:text-white">
      <Navbar />
      <PortfolioShowcase />
      <MotionWrapper delay={0.1}>
        <ServicesSection services={mainServices} />
      </MotionWrapper>
      <MotionWrapper delay={0.1}>
        <VelocitySection services={velocityServices} />
      </MotionWrapper>
      <MotionWrapper delay={0.1}>
        <TeamSection teamMembers={teamMembers} />
      </MotionWrapper>

      <ClientsSection />

      <Footer />

    </main>
  );
}
