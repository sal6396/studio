import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Testimonial } from '@/lib/constants';
import { Quote as QuoteIcon } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const fallbackInitials = testimonial.clientName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card rounded-lg p-6 h-full flex flex-col">
      <QuoteIcon className="h-8 w-8 text-primary mb-4" />
      <CardContent className="p-0 flex-grow">
        <p className="text-muted-foreground italic mb-6 text-base leading-relaxed">"{testimonial.quote}"</p>
      </CardContent>
      <div className="mt-auto flex items-center pt-4 border-t border-border">
        {testimonial.avatarUrl && (
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.clientName} data-ai-hint={testimonial.avatarHint} />
            <AvatarFallback>{fallbackInitials}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <p className="font-semibold text-primary">{testimonial.clientName}</p>
          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        </div>
      </div>
    </Card>
  );
}
