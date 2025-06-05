import { SERVICES_DATA } from '@/lib/constants';
import { ServiceCard } from '@/components/cards/ServiceCard';

export function HomeServices() {
  // Display first 3 services or a selection
  const topServices = SERVICES_DATA.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a range of expert services designed to meet your unique business needs and drive success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
