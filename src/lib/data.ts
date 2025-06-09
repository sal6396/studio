import { supabase } from './supabase';
import type { Database } from './supabase';

type Service = Database['public']['Tables']['services']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type JobListing = Database['public']['Tables']['job_listings']['Row'];
type TeamMember = Database['public']['Tables']['team_members']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];

// Services
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_visible', true)
    .order('created_at');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data || [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    return null;
  }

  return data;
}

// Projects
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }

  return data;
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

// Job Listings
export async function getJobListings(): Promise<JobListing[]> {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching job listings:', error);
    return [];
  }

  return data || [];
}

export async function getJobListingById(id: string): Promise<JobListing | null> {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching job listing:', error);
    return null;
  }

  return data;
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('created_at');

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return data || [];
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
}

// Form submissions
export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data]);

  if (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export async function submitServiceInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  service_slug?: string;
  project_details: string;
}) {
  const { error } = await supabase
    .from('service_inquiries')
    .insert([data]);

  if (error) {
    console.error('Error submitting service inquiry:', error);
    throw error;
  }
}

export async function submitJobApplication(data: {
  job_listing_id?: string;
  full_name: string;
  email: string;
  phone?: string;
  cover_letter?: string;
  resume_url?: string;
}) {
  const { error } = await supabase
    .from('job_applications')
    .insert([data]);

  if (error) {
    console.error('Error submitting job application:', error);
    throw error;
  }
}

// Admin functions (require authentication)
export async function getAllServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at');

  if (error) {
    console.error('Error fetching all services:', error);
    return [];
  }

  return data || [];
}

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }

  return data || [];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getAllJobListings(): Promise<JobListing[]> {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all job listings:', error);
    return [];
  }

  return data || [];
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('created_at');

  if (error) {
    console.error('Error fetching all team members:', error);
    return [];
  }

  return data || [];
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all testimonials:', error);
    return [];
  }

  return data || [];
}