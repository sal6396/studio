import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HomeCTA() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Next Project?</h2>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90">
          Let's discuss how Alif InfoTech Solutions can help you achieve your business goals with our innovative technology solutions.
        </p>
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Link href="/contact">
            Contact Us Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
