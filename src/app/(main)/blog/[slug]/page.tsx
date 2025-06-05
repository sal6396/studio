import { BLOG_POSTS_DATA, COMPANY_NAME } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle, ArrowLeft } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = BLOG_POSTS_DATA.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: `Post Not Found | ${COMPANY_NAME}`,
      description: 'The requested blog post does not exist.',
    };
  }

  return {
    title: `${post.title} | Blog | ${COMPANY_NAME}`,
    description: post.excerpt,
     openGraph: {
        images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS_DATA.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS_DATA.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-card p-6 sm:p-8 md:p-12 rounded-lg shadow-xl">
          <header className="mb-8">
            {post.category && <Badge variant="outline" className="mb-3 text-primary border-primary">{post.category}</Badge>}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5" /> {post.date}
              </span>
              <span className="flex items-center">
                <UserCircle className="h-4 w-4 mr-1.5" /> By {post.author}
              </span>
            </div>
          </header>

          {post.imageUrl && (
            <div className="mb-8 rounded-md overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                data-ai-hint={post.imageHint || 'blog feature image'}
                priority
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none dark:prose-invert 
                       prose-headings:text-primary prose-headings:font-semibold
                       prose-p:text-foreground/80
                       prose-a:text-primary hover:prose-a:text-primary/80
                       prose-strong:text-foreground
                       prose-ul:list-disc prose-ul:pl-6
                       prose-ol:list-decimal prose-ol:pl-6
                       prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-border">
            <Button variant="outline" asChild>
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
