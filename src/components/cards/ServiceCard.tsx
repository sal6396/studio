import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Service } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = service.icon;
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg">
      <CardHeader className="bg-primary/5 p-6">
        <div className="flex items-center gap-4">
          <IconComponent className="h-10 w-10 text-primary" />
          <CardTitle className="text-xl font-semibold text-primary">{service.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardDescription className="text-muted-foreground mb-4 flex-grow">{service.description}</CardDescription>
        <Button variant="outline" asChild className="mt-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
          <Link href={`/services/${service.slug}`}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
