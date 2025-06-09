/*
  # Initial Schema Setup for Alif Solutions Hub

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `description` (text)
      - `long_description` (text)
      - `key_features` (text array)
      - `icon_name` (text)
      - `image_path` (text)
      - `image_hint` (text)
      - `is_visible` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `description` (text)
      - `image_url` (text)
      - `image_hint` (text)
      - `technologies` (text array)
      - `client_testimonial` (text)
      - `client_name` (text)
      - `is_published` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `author` (text)
      - `category` (text)
      - `image_url` (text)
      - `image_hint` (text)
      - `is_published` (boolean, default true)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `job_listings`
      - `id` (uuid, primary key)
      - `title` (text)
      - `location` (text)
      - `type` (text)
      - `description` (text)
      - `responsibilities` (text array)
      - `qualifications` (text array)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `role` (text)
      - `avatar_url` (text)
      - `avatar_hint` (text)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `testimonials`
      - `id` (uuid, primary key)
      - `quote` (text)
      - `client_name` (text)
      - `company` (text)
      - `avatar_url` (text)
      - `avatar_hint` (text)
      - `is_published` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `status` (text, default 'new')
      - `created_at` (timestamp)

    - `service_inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `service_slug` (text)
      - `project_details` (text)
      - `status` (text, default 'new')
      - `created_at` (timestamp)

    - `job_applications`
      - `id` (uuid, primary key)
      - `job_listing_id` (uuid, foreign key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `cover_letter` (text)
      - `resume_url` (text)
      - `status` (text, default 'submitted')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access where appropriate
    - Add policies for authenticated admin access for management

  3. Functions
    - Auto-update timestamps
    - Generate slugs for blog posts
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  key_features text[] DEFAULT '{}',
  icon_name text NOT NULL,
  image_path text,
  image_hint text,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  image_hint text,
  technologies text[] DEFAULT '{}',
  client_testimonial text,
  client_name text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL DEFAULT 'Alif InfoTech Team',
  category text NOT NULL,
  image_url text,
  image_hint text,
  is_published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job listings table
CREATE TABLE IF NOT EXISTS job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  responsibilities text[] DEFAULT '{}',
  qualifications text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  avatar_url text,
  avatar_hint text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  client_name text NOT NULL,
  company text NOT NULL,
  avatar_url text,
  avatar_hint text,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz DEFAULT now()
);

-- Service inquiries table
CREATE TABLE IF NOT EXISTS service_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_slug text,
  project_details text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz DEFAULT now()
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_listing_id uuid REFERENCES job_listings(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  cover_letter text,
  resume_url text,
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'interviewed', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Public can read published services"
  ON services
  FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Public can read published projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Public can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Public can read active job listings"
  ON job_listings
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Public can read active team members"
  ON team_members
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Public can read published testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Admin policies for full access
CREATE POLICY "Authenticated users can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage job listings"
  ON job_listings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage team members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Submission policies
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can submit service inquiries"
  ON service_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can submit job applications"
  ON job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read inquiries"
  ON service_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_listings_updated_at BEFORE UPDATE ON job_listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();