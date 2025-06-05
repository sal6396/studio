import { SERVICES_DATA, COMPANY_NAME } from '@/lib/constants';
import { ServiceCard } from '@/components/cards/ServiceCard';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Our Services | ${COMPANY_NAME}`,
  description: `Explore the comprehensive software development services offered by ${COMPANY_NAME}, including mobile and web development, UI/UX design, and more.`,
};

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Expert Services</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Delivering cutting-edge technology solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From initial consultation to final deployment, we provide end-to-end services to bring your vision to life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Services Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Services?</h2>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Tailored Solutions:</strong> We customize our services to perfectly fit your unique requirements and business objectives.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Experienced Team:</strong> Our skilled professionals bring a wealth of experience and expertise to every project.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Cutting-Edge Technology:</strong> We utilize the latest tools and technologies to deliver innovative and future-proof solutions.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Transparent Communication:</strong> We maintain open and clear communication throughout the project lifecycle.</span>
                </li>
              </ul>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x450.png"
                alt="Team discussing project"
                width={600}
                height={450}
                className="rounded-lg shadow-xl"
                data-ai-hint="team discussion"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
