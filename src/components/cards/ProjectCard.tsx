import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full rounded-lg">
      <CardHeader className="p-0 relative">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint={project.imageHint}
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-xl font-semibold mb-2 text-primary">{project.title}</CardTitle>
        <Badge variant="secondary" className="mb-2 w-fit">{project.category}</Badge>
        <CardDescription className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</CardDescription>
        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
            ))}
          </div>
        </div>
        {/* For now, "View Project" can link to a placeholder or the portfolio page itself */}
        <Button variant="default" asChild className="mt-auto bg-primary hover:bg-primary/90 text-primary-foreground w-full">
            <Link href={`/portfolio#${project.id}`}> 
            {/* In a real app, this would be /portfolio/${project.id} or similar */}
              View Details <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
