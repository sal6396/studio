import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { COMPANY_NAME } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export function HomeHero() {
  return (
    <section className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground py-20 md:py-32">
      <Image
        src="https://placehold.co/1920x800.png"
        alt="Company Banner - Modern Office"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 opacity-20 z-0"
        data-ai-hint="modern office"
      />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Empowering Your Digital Future with <br className="hidden md:inline"/> <span className="text-accent">{COMPANY_NAME}</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-primary-foreground/90">
          We craft innovative software solutions, tailored to drive growth and efficiency for your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/contact#inquiry">
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/services">Explore Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
