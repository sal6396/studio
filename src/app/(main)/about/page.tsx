import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPANY_NAME, Icons } from '@/lib/constants';
import Image from 'next/image';
import type { Metadata } from 'next';
import { CheckCircle2, Users, Eye, ShieldCheck, Zap, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: `About Us | ${COMPANY_NAME}`,
  description: `Learn about ${COMPANY_NAME}'s mission, vision, values, and why we are the right partner for your software development needs.`,
};

const whyChooseUsData = [
  { title: "Expertise & Experience", description: "Our seasoned professionals bring years of industry experience and deep technical knowledge to every project.", icon: ShieldCheck },
  { title: "Innovative Solutions", description: "We leverage the latest technologies and creative thinking to deliver cutting-edge solutions.", icon: Zap },
  { title: "Client-Centric Approach", description: "Your success is our priority. We work closely with you to understand your unique needs and goals.", icon: Handshake },
  { title: "Quality Assurance", description: "Rigorous testing and quality control processes ensure robust, reliable, and high-performance software.", icon: CheckCircle2 },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About {COMPANY_NAME}</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Pioneering digital transformation with passion, expertise, and a commitment to excellence.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Our Team Working"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="team collaboration"
              />
            </div>
            <div className="space-y-8">
              <div className="p-6 bg-card rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                  <Eye className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-3xl font-semibold text-primary">Our Vision</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To be a leading global technology partner, recognized for innovation, quality, and unwavering commitment to client success. We envision a future where technology seamlessly empowers businesses and enhances lives.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                  <Target className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-3xl font-semibold text-primary">Our Mission</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To deliver exceptional software solutions and services by combining cutting-edge technology, creative problem-solving, and a client-centric approach. We strive to build long-term partnerships based on trust, transparency, and mutual growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose {COMPANY_NAME}?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are dedicated to providing solutions that not only meet but exceed your expectations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsData.map((item) => (
              <Card key={item.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <item.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Intro Section (Optional) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team (Optional)</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our strength lies in our diverse team of talented and passionate individuals. (Further details or images can be added here).
          </p>
          <div className="flex justify-center">
             <Image
                src="https://placehold.co/800x400.png"
                alt="Diverse team"
                width={800}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="diverse team working"
              />
          </div>
        </div>
      </section>
    </div>
  );
}

// Dummy Target icon if not in lucide-react
const Target = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);
