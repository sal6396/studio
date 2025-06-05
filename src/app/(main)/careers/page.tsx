import { JOB_LISTINGS_DATA, COMPANY_NAME } from '@/lib/constants';
import { JobListingCard } from '@/components/cards/JobListingCard';
import { JobApplicationForm } from '@/components/forms/JobApplicationForm';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Users, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: `Careers | ${COMPANY_NAME}`,
  description: `Join the team at ${COMPANY_NAME}. Explore current job openings and learn about our company culture.`,
};

const culturePoints = [
  { text: "Collaborative Environment: We foster teamwork and open communication.", icon: Users },
  { text: "Innovation Driven: Encouraging creative solutions and continuous learning.", icon: Lightbulb },
  { text: "Growth Opportunities: We invest in our team's professional development.", icon: CheckSquare }
];

export default function CareersPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Be part of a passionate and innovative team dedicated to shaping the future of technology.
          </p>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://placehold.co/600x450.png"
                alt="Team working collaboratively"
                width={600}
                height={450}
                className="rounded-lg shadow-xl"
                data-ai-hint="team working"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Culture</h2>
              <p className="text-lg text-muted-foreground mb-8">
                At {COMPANY_NAME}, we believe in creating an environment where talent thrives. We value creativity, collaboration, and a commitment to excellence.
              </p>
              <ul className="space-y-4">
                {culturePoints.map(point => (
                  <li key={point.text} className="flex items-start">
                    <point.icon className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                    <span className="text-muted-foreground text-lg">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Openings Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Openings</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your next career opportunity with us. We're looking for talented individuals to join our growing team.
            </p>
          </div>
          {JOB_LISTINGS_DATA.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {JOB_LISTINGS_DATA.map((job) => (
                <JobListingCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-xl">No current openings. Please check back later!</p>
          )}
        </div>
      </section>

      {/* Job Details & Application Form Section */}
      {JOB_LISTINGS_DATA.map(job => (
        <section key={`apply-${job.id}`} id={`apply-${job.id}`} className="py-16 md:py-24 scroll-mt-20">
          <div className="container mx-auto px-4">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">{job.title} - Job Details</CardTitle>
                <p className="text-muted-foreground">{job.location} | {job.type}</p>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Job Description:</h3>
                  <p className="text-muted-foreground mb-6">{job.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-2">Responsibilities:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-6">
                    {job.responsibilities.map(resp => <li key={resp}>{resp}</li>)}
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Qualifications:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.qualifications.map(qual => <li key={qual}>{qual}</li>)}
                  </ul>
                </div>
                <div>
                  <JobApplicationForm defaultJobId={job.id} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      ))}

      {/* If no jobs, still show a generic application form section or contact prompt */}
      {JOB_LISTINGS_DATA.length === 0 && (
         <section id="general-application" className="py-16 md:py-24 scroll-mt-20">
            <div className="container mx-auto px-4 max-w-2xl">
               <JobApplicationForm />
            </div>
        </section>
      )}
    </div>
  );
}
