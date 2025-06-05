import type { LucideIcon } from 'lucide-react';
import { Smartphone, Globe, Palette, Settings2, Megaphone, Award, Users, LayoutGrid, Newspaper, Mail, MapPin, Phone, MessageCircle, CheckCircle2, Briefcase, Component } from 'lucide-react';

export const APP_NAME = "Alif Solutions Hub";
export const COMPANY_NAME = "Alif InfoTech Solutions";

export type NavLink = {
  href: string;
  label: string;
  icon?: LucideIcon;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', icon: Globe },
  { href: '/about', label: 'About Us', icon: Users },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/portfolio', label: 'Portfolio', icon: LayoutGrid },
  { href: '/careers', label: 'Careers', icon: Award },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/contact', label: 'Contact Us', icon: Mail },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  longDescription: string;
  keyFeatures: string[];
  imagePath?: string;
  imageHint?: string;
};

export const SERVICES_DATA: Service[] = [
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Crafting intuitive and high-performance mobile applications for iOS and Android platforms.',
    icon: Smartphone,
    longDescription: 'Our mobile app development team builds innovative and user-friendly applications tailored to your business needs. We leverage the latest technologies to deliver seamless experiences on both iOS and Android devices, focusing on performance, scalability, and design.',
    keyFeatures: ['Native iOS & Android Apps', 'Cross-Platform Development', 'UI/UX Design Integration', 'Scalable Architecture', 'Post-Launch Support'],
    imagePath: 'https://placehold.co/1200x600.png',
    imageHint: 'mobile app interface'
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Building responsive, scalable, and secure web solutions to elevate your online presence.',
    icon: Globe,
    longDescription: 'We specialize in creating robust and dynamic web applications, from custom websites to complex enterprise platforms. Our solutions are designed to be responsive, secure, and optimized for performance, ensuring a great user experience across all devices.',
    keyFeatures: ['Custom Web Applications', 'E-commerce Solutions', 'CMS Development', 'API Integration', 'Responsive Design'],
    imagePath: 'https://placehold.co/1200x600.png',
    imageHint: 'web design layout'
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Designing engaging and user-centric digital experiences that drive results.',
    icon: Palette,
    longDescription: 'Our UI/UX design services focus on creating visually appealing and highly usable interfaces. We follow a user-centered design process, conducting research and testing to ensure that your product is both beautiful and effective in meeting user needs.',
    keyFeatures: ['User Research & Analysis', 'Wireframing & Prototyping', 'Interaction Design', 'Visual Design', 'Usability Testing'],
    imagePath: 'https://placehold.co/1200x600.png',
    imageHint: 'ui design sketch'
  },
  {
    slug: 'software-consultation',
    title: 'Software Consultation',
    description: 'Providing expert guidance to help you navigate complex software challenges and make informed decisions.',
    icon: Settings2,
    longDescription: 'Our software consultation services offer strategic advice and technical expertise to optimize your software development lifecycle. We help businesses identify the right technologies, architectures, and processes to achieve their goals efficiently and effectively.',
    keyFeatures: ['Technology Stack Advisory', 'Architecture Review', 'Project Planning', 'Process Optimization', 'Digital Transformation Strategy'],
    imagePath: 'https://placehold.co/1200x600.png',
    imageHint: 'team meeting'
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Amplifying your brand\'s reach and engagement through data-driven digital marketing strategies.',
    icon: Megaphone,
    longDescription: 'Our digital marketing services help businesses grow their online presence and connect with their target audience. We develop comprehensive strategies encompassing SEO, content marketing, social media, and paid advertising to drive traffic, generate leads, and increase conversions.',
    keyFeatures: ['Search Engine Optimization (SEO)', 'Content Marketing', 'Social Media Management', 'Pay-Per-Click (PPC) Advertising', 'Analytics & Reporting'],
    imagePath: 'https://placehold.co/1200x600.png',
    imageHint: 'marketing graph'
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  technologies: string[];
  clientTestimonial?: string;
  clientName?: string;
};

export const PORTFOLIO_DATA: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'A scalable e-commerce solution with advanced features for a retail client.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'ecommerce website',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    clientTestimonial: 'Alif InfoTech delivered an outstanding platform that significantly boosted our online sales.',
    clientName: 'Retail Inc.'
  },
  {
    id: 'project-2',
    title: 'Healthcare Mobile App',
    category: 'Mobile App Development',
    description: 'A user-friendly mobile app for patients to manage appointments and health records.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile health app',
    technologies: ['Swift', 'Kotlin', 'Firebase'],
  },
  {
    id: 'project-3',
    title: 'SaaS Dashboard UI/UX',
    category: 'UI/UX Design',
    description: 'Redesigned a complex SaaS dashboard for improved usability and modern aesthetics.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'saas dashboard',
    technologies: ['Figma', 'Adobe XD'],
    clientTestimonial: 'The new design is intuitive and has received rave reviews from our users.',
    clientName: 'Tech Solutions Ltd.'
  },
   {
    id: 'project-4',
    title: 'Logistics Management System',
    category: 'Software Consultation',
    description: 'Consulted on and architected a new logistics management system for a growing enterprise.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'logistics system',
    technologies: ['Java', 'Spring Boot', 'AWS'],
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  company: string;
  avatarUrl?: string;
  avatarHint?: string;
};

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Working with Alif InfoTech Solutions was a game-changer for our business. Their expertise and dedication are unmatched.',
    clientName: 'Aisha Khan',
    company: 'Innovatech Ltd.',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarHint: 'woman smiling'
  },
  {
    id: 'testimonial-2',
    quote: 'The mobile app they developed exceeded our expectations in every way. Highly professional and skilled team.',
    clientName: 'John Doe',
    company: 'StartupX',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarHint: 'man portrait'
  },
  {
    id: 'testimonial-3',
    quote: 'Their UI/UX design transformed our product, making it incredibly user-friendly. We\'ve seen a significant increase in engagement.',
    clientName: 'Fatima Ahmed',
    company: 'Creative Designs Co.',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarHint: 'person professional'
  },
];

export type JobListing = {
  id: string;
  title: string;
  location: string;
  type: string; 
  description: string;
  responsibilities: string[];
  qualifications: string[];
};

export const JOB_LISTINGS_DATA: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior React Developer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our dynamic team to build cutting-edge web applications using React.',
    responsibilities: ['Develop and maintain web applications using React.js', 'Collaborate with cross-functional teams', 'Write clean, testable code'],
    qualifications: ['5+ years of experience with React', 'Strong proficiency in JavaScript, HTML, CSS', 'Experience with RESTful APIs']
  },
  {
    id: 'job-2',
    title: 'UI/UX Designer',
    location: 'Office-Based (Optional Remote)',
    type: 'Full-time',
    description: 'Create intuitive and visually appealing user interfaces for web and mobile applications.',
    responsibilities: ['Conduct user research and create user personas', 'Design wireframes, prototypes, and high-fidelity mockups', 'Collaborate with developers to implement designs'],
    qualifications: ['Proven UI/UX design experience with a strong portfolio', 'Proficiency in Figma, Sketch, or Adobe XD', 'Understanding of user-centered design principles']
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string; 
  imageUrl?: string;
  imageHint?: string;
  category: string;
};

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    slug: 'future-of-web-development',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    date: '2024-07-15',
    author: 'Alif InfoTech Team',
    category: 'Web Development',
    excerpt: 'Explore the upcoming trends in web development, from AI integration to serverless architectures...',
    content: '<p>The world of web development is constantly evolving. Staying ahead of the curve is crucial for businesses and developers alike. In 2024, we anticipate several key trends shaping the future of the web...</p><h3>AI and Machine Learning Integration</h3><p>AI is no longer a buzzword but a practical tool transforming web experiences...</p>',
    imageUrl: 'https://placehold.co/800x400.png',
    imageHint: 'futuristic code'
  },
  {
    slug: 'importance-ui-ux-design',
    title: 'Why UI/UX Design is Crucial for Business Success',
    date: '2024-06-28',
    author: 'Alif InfoTech Team',
    category: 'UI/UX Design',
    excerpt: 'Discover how investing in good UI/UX design can significantly impact your business growth and user satisfaction...',
    content: '<p>In today\'s competitive digital landscape, user experience (UX) and user interface (UI) design are more important than ever. A well-designed product not only looks good but also provides a seamless and enjoyable experience for users...</p><h3>Impact on Conversion Rates</h3><p>A clear and intuitive user journey directly impacts conversion rates...</p>',
    imageUrl: 'https://placehold.co/800x400.png',
    imageHint: 'design process'
  },
];

export const CONTACT_DETAILS = {
  address: "123 Tech Park, Silicon Valley, CA 94000",
  phone: "+1 (555) 123-4567",
  email: "info@alifinfotech.com",
  whatsapp: "+15551234567" // international format without '+' or '00' for wa.me link
};

// Lucide Icons
export const Icons = {
  home: Globe,
  about: Users,
  services: Briefcase,
  portfolio: LayoutGrid,
  careers: Award,
  blog: Newspaper,
  contact: Mail,
  mobile: Smartphone,
  web: Globe,
  design: Palette,
  consultation: Settings2,
  marketing: Megaphone,
  mapPin: MapPin,
  phone: Phone,
  whatsApp: MessageCircle,
  check: CheckCircle2,
  generic: Component,
};

