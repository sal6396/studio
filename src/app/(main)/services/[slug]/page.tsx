import { SERVICES_DATA, COMPANY_NAME, Icons } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Metadata, ResolvingMetadata } from 'next';
import { CheckCircle2 } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: `Service Not Found | ${COMPANY_NAME}`,
      description: `The requested service page does not exist on ${COMPANY_NAME}.`,
    };
  }

  return {
    title: `${service.title} | Services | ${COMPANY_NAME}`,
    description: service.description,
    openGraph: {
        images: service.imagePath ? [service.imagePath] : [],
    },
  };
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: Props) {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const ServiceIcon = service.icon || Icons.generic;

  return (
    <div className="bg-background text-foreground">
      {/* Service Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <ServiceIcon className="h-12 w-12 md:h-16 md:w-16 mr-4 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
          </div>
          <p className="text-lg md:text-xl max-w-3xl text-primary-foreground/90">
            {service.description}
          </p>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              {service.imagePath && (
                <Image
                  src={service.imagePath}
                  alt={service.title}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-xl mb-8 w-full object-cover"
                  data-ai-hint={service.imageHint || 'service illustration'}
                />
              )}
              <h2 className="text-3xl font-semibold mb-6">About Our {service.title}</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: service.longDescription.replace(/\n/g, '<br/>') }} />

              <h3 className="text-2xl font-semibold mt-12 mb-6">Key Features & Benefits</h3>
              <ul className="space-y-4">
                {service.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 mt-1 shrink-0" />
                    <span className="text-muted-foreground text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar / Inquiry Form */}
            <aside className="md:col-span-1 space-y-8">
              <div id="inquiry">
                <InquiryForm defaultServiceSlug={service.slug} />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4">Other Services</h3>
                <ul className="space-y-3">
                  {SERVICES_DATA.filter(s => s.slug !== service.slug).slice(0,3).map(otherService => (
                    <li key={otherService.slug}>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href={`/services/${otherService.slug}`} className="flex items-center">
                          <otherService.icon className="h-5 w-5 mr-2 text-primary" />
                          {otherService.title}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
