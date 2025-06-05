import { HomeHero } from '@/components/sections/HomeHero';
import { HomeIntro } from '@/components/sections/HomeIntro';
import { HomeServices } from '@/components/sections/HomeServices';
import { HomePortfolioHighlights } from '@/components/sections/HomePortfolioHighlights';
import { HomeTestimonials } from '@/components/sections/HomeTestimonials';
import { HomeCTA } from '@/components/sections/HomeCTA';
import type { Metadata } from 'next';
import { COMPANY_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Home | ${COMPANY_NAME}`,
  description: `Welcome to ${COMPANY_NAME}. We provide innovative software solutions including mobile app development, web development, UI/UX design, and software consultation.`,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomePortfolioHighlights />
      <HomeTestimonials />
      <HomeCTA />
    </>
  );
}
