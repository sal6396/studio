import { PORTFOLIO_DATA, COMPANY_NAME, TESTIMONIALS_DATA } from '@/lib/constants';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Our Portfolio | ${COMPANY_NAME}`,
  description: `Browse the portfolio of ${COMPANY_NAME}. See our case studies and successful projects in web development, mobile apps, and UI/UX design.`,
};

export default function PortfolioPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Showcasing a selection of projects that highlight our expertise and commitment to quality.
          </p>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've helped businesses of all sizes achieve their digital goals. Here are some of our success stories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_DATA.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Individual Project Details (Conceptual - for anchor linking) */}
      {PORTFOLIO_DATA.map(project => (
        <section key={`detail-${project.id}`} id={project.id} className="py-12 bg-secondary/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="bg-card p-8 rounded-lg shadow-xl">
              <h3 className="text-3xl font-bold text-primary mb-4">{project.title}</h3>
              <Badge variant="outline" className="mb-4">{project.category}</Badge>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title} 
                    width={600} 
                    height={400} 
                    className="rounded-md shadow-md w-full object-cover"
                    data-ai-hint={project.imageHint} 
                  />
                </div>
                <div>
                  <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
                  <h4 className="text-xl font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  {project.clientTestimonial && project.clientName && (
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Client Feedback:</h4>
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                        <p>"{project.clientTestimonial}"</p>
                        <footer className="mt-2 text-sm font-medium text-foreground">- {project.clientName}</footer>
                      </blockquote>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}


      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear what our satisfied clients have to say about their experience working with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
