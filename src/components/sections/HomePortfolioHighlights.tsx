
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PORTFOLIO_DATA } from '@/lib/constants';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { ArrowRight } from 'lucide-react';

export function HomePortfolioHighlights() {
  const highlightedProjects = PORTFOLIO_DATA.filter(project => project.isPublished !== false).slice(0, 3); // Show first 3 published projects

  if (highlightedProjects.length === 0) {
    return null; // Or render a placeholder if no projects are published
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Recent Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a glimpse at some of the innovative solutions we've delivered for our clients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/portfolio">
              View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
