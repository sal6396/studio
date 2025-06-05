import BlogGeneratorClient from "@/components/BlogGeneratorClient";
import { COMPANY_NAME } from "@/lib/constants";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `AI Blog Generator | ${COMPANY_NAME}`,
  description: `Use AI to generate blog content for ${COMPANY_NAME}. Create multiple variations of articles based on your prompts.`,
};

export default function GenerateBlogPage() {
  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <BlogGeneratorClient />
      </div>
    </div>
  );
}
