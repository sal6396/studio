import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          long_description: string;
          key_features: string[];
          icon_name: string;
          image_path: string | null;
          image_hint: string | null;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description: string;
          long_description: string;
          key_features?: string[];
          icon_name: string;
          image_path?: string | null;
          image_hint?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          long_description?: string;
          key_features?: string[];
          icon_name?: string;
          image_path?: string | null;
          image_hint?: string | null;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          category: string;
          description: string;
          image_url: string;
          image_hint: string | null;
          technologies: string[];
          client_testimonial: string | null;
          client_name: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          description: string;
          image_url: string;
          image_hint?: string | null;
          technologies?: string[];
          client_testimonial?: string | null;
          client_name?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          description?: string;
          image_url?: string;
          image_hint?: string | null;
          technologies?: string[];
          client_testimonial?: string | null;
          client_name?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          author: string;
          category: string;
          image_url: string | null;
          image_hint: string | null;
          is_published: boolean;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          author?: string;
          category: string;
          image_url?: string | null;
          image_hint?: string | null;
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          author?: string;
          category?: string;
          image_url?: string | null;
          image_hint?: string | null;
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      job_listings: {
        Row: {
          id: string;
          title: string;
          location: string;
          type: string;
          description: string;
          responsibilities: string[];
          qualifications: string[];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          location: string;
          type: string;
          description: string;
          responsibilities?: string[];
          qualifications?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          location?: string;
          type?: string;
          description?: string;
          responsibilities?: string[];
          qualifications?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: string;
          avatar_url: string | null;
          avatar_hint: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role: string;
          avatar_url?: string | null;
          avatar_hint?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: string;
          avatar_url?: string | null;
          avatar_hint?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          client_name: string;
          company: string;
          avatar_url: string | null;
          avatar_hint: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          client_name: string;
          company: string;
          avatar_url?: string | null;
          avatar_hint?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          client_name?: string;
          company?: string;
          avatar_url?: string | null;
          avatar_hint?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          status?: string;
          created_at?: string;
        };
      };
      service_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          service_slug: string | null;
          project_details: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          service_slug?: string | null;
          project_details: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          service_slug?: string | null;
          project_details?: string;
          status?: string;
          created_at?: string;
        };
      };
      job_applications: {
        Row: {
          id: string;
          job_listing_id: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          cover_letter: string | null;
          resume_url: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          job_listing_id?: string | null;
          full_name: string;
          email: string;
          phone?: string | null;
          cover_letter?: string | null;
          resume_url?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          job_listing_id?: string | null;
          full_name?: string;
          email?: string;
          phone?: string | null;
          cover_letter?: string | null;
          resume_url?: string | null;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
}