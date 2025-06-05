import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/constants';
import { CalendarDays, UserCircle, ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg">
      {post.imageUrl && (
        <CardHeader className="p-0 relative">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={post.imageHint || 'blog image'}
          />
        </CardHeader>
      )}
      <CardContent className="p-6 flex-grow flex flex-col">
        {post.category && <Badge variant="secondary" className="mb-2 w-fit">{post.category}</Badge>}
        <CardTitle className="text-xl font-semibold mb-2 text-primary leading-tight hover:underline">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-3">
          <span className="flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1" /> {post.date}
          </span>
          <span className="flex items-center">
            <UserCircle className="h-3.5 w-3.5 mr-1" /> {post.author}
          </span>
        </div>
        <CardDescription className="text-muted-foreground text-sm mb-4 flex-grow">{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="outline" asChild className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
