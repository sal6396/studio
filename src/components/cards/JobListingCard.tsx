import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { JobListing } from '@/lib/constants';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface JobListingCardProps {
  job: JobListing;
}

export function JobListingCard({ job }: JobListingCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{job.title}</CardTitle>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
          <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" /> {job.location}</span>
          <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1.5" /> {job.type}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <CardDescription className="text-muted-foreground mb-4 flex-grow">{job.description}</CardDescription>
        <Button variant="default" asChild className="mt-auto bg-primary hover:bg-primary/90 text-primary-foreground w-full">
          <Link href={`/careers#apply-${job.id}`}>
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
