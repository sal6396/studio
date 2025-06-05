import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS_DATA, COMPANY_NAME } from '@/lib/constants';
import { BlogPostCard } from '@/components/cards/BlogPostCard';
import type { Metadata } from 'next';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: `Blog | ${COMPANY_NAME}`,
  description: `Read the latest insights, news, and articles from ${COMPANY_NAME} on software development, technology trends, and more.`,
};

export default function BlogPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Stay updated with the latest news, trends, and insights from the world of technology and software development.
          </p>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Latest Articles</h2>
            <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/blog/generate">
                <PlusCircle className="mr-2 h-5 w-5" />
                Generate Blog Post (AI)
              </Link>
            </Button>
          </div>
          {BLOG_POSTS_DATA.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS_DATA.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-xl">No blog posts yet. Check back soon!</p>
          )}
        </div>
      </section>
    </div>
  );
}
