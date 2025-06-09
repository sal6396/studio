/*
  # Seed Initial Data

  1. Insert sample services
  2. Insert sample projects
  3. Insert sample blog posts
  4. Insert sample job listings
  5. Insert sample team members
  6. Insert sample testimonials
*/

-- Insert services
INSERT INTO services (slug, title, description, long_description, key_features, icon_name, image_path, image_hint, is_visible) VALUES
('mobile-app-development', 'Mobile App Development', 'Crafting intuitive and high-performance mobile applications for iOS and Android platforms.', 'Our mobile app development team builds innovative and user-friendly applications tailored to your business needs. We leverage the latest technologies to deliver seamless experiences on both iOS and Android devices, focusing on performance, scalability, and design.', ARRAY['Native iOS & Android Apps', 'Cross-Platform Development', 'UI/UX Design Integration', 'Scalable Architecture', 'Post-Launch Support'], 'Smartphone', 'https://placehold.co/1200x600.png', 'mobile app interface', true),
('web-development', 'Web Development', 'Building responsive, scalable, and secure web solutions to elevate your online presence.', 'We specialize in creating robust and dynamic web applications, from custom websites to complex enterprise platforms. Our solutions are designed to be responsive, secure, and optimized for performance, ensuring a great user experience across all devices.', ARRAY['Custom Web Applications', 'E-commerce Solutions', 'CMS Development', 'API Integration', 'Responsive Design'], 'Globe', 'https://placehold.co/1200x600.png', 'web design layout', true),
('ui-ux-design', 'UI/UX Design', 'Designing engaging and user-centric digital experiences that drive results.', 'Our UI/UX design services focus on creating visually appealing and highly usable interfaces. We follow a user-centered design process, conducting research and testing to ensure that your product is both beautiful and effective in meeting user needs.', ARRAY['User Research & Analysis', 'Wireframing & Prototyping', 'Interaction Design', 'Visual Design', 'Usability Testing'], 'Palette', 'https://placehold.co/1200x600.png', 'ui design sketch', true),
('software-consultation', 'Software Consultation', 'Providing expert guidance to help you navigate complex software challenges and make informed decisions.', 'Our software consultation services offer strategic advice and technical expertise to optimize your software development lifecycle. We help businesses identify the right technologies, architectures, and processes to achieve their goals efficiently and effectively.', ARRAY['Technology Stack Advisory', 'Architecture Review', 'Project Planning', 'Process Optimization', 'Digital Transformation Strategy'], 'Settings2', 'https://placehold.co/1200x600.png', 'team meeting', true),
('digital-marketing', 'Digital Marketing', 'Amplifying your brand''s reach and engagement through data-driven digital marketing strategies.', 'Our digital marketing services help businesses grow their online presence and connect with their target audience. We develop comprehensive strategies encompassing SEO, content marketing, social media, and paid advertising to drive traffic, generate leads, and increase conversions.', ARRAY['Search Engine Optimization (SEO)', 'Content Marketing', 'Social Media Management', 'Pay-Per-Click (PPC) Advertising', 'Analytics & Reporting'], 'Megaphone', 'https://placehold.co/1200x600.png', 'marketing graph', true);

-- Insert projects
INSERT INTO projects (title, category, description, image_url, image_hint, technologies, client_testimonial, client_name, is_published) VALUES
('E-commerce Platform', 'Web Development', 'A scalable e-commerce solution with advanced features for a retail client.', 'https://placehold.co/600x400.png', 'ecommerce website', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'Alif InfoTech delivered an outstanding platform that significantly boosted our online sales.', 'Retail Inc.', true),
('Healthcare Mobile App', 'Mobile App Development', 'A user-friendly mobile app for patients to manage appointments and health records.', 'https://placehold.co/600x400.png', 'mobile health app', ARRAY['Swift', 'Kotlin', 'Firebase'], null, null, true),
('SaaS Dashboard UI/UX', 'UI/UX Design', 'Redesigned a complex SaaS dashboard for improved usability and modern aesthetics.', 'https://placehold.co/600x400.png', 'saas dashboard', ARRAY['Figma', 'Adobe XD'], 'The new design is intuitive and has received rave reviews from our users.', 'Tech Solutions Ltd.', false),
('Logistics Management System', 'Software Consultation', 'Consulted on and architected a new logistics management system for a growing enterprise.', 'https://placehold.co/600x400.png', 'logistics system', ARRAY['Java', 'Spring Boot', 'AWS'], null, null, true);

-- Insert blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, author, category, image_url, image_hint, is_published, published_at) VALUES
('future-of-web-development', 'The Future of Web Development: Trends to Watch in 2024', 'Explore the upcoming trends in web development, from AI integration to serverless architectures...', '<p>The world of web development is constantly evolving. Staying ahead of the curve is crucial for businesses and developers alike. In 2024, we anticipate several key trends shaping the future of the web...</p><h3>AI and Machine Learning Integration</h3><p>AI is no longer a buzzword but a practical tool transforming web experiences...</p>', 'Alif InfoTech Team', 'Web Development', 'https://placehold.co/800x400.png', 'futuristic code', true, '2024-07-15 10:00:00+00'),
('importance-ui-ux-design', 'Why UI/UX Design is Crucial for Business Success', 'Discover how investing in good UI/UX design can significantly impact your business growth and user satisfaction...', '<p>In today''s competitive digital landscape, user experience (UX) and user interface (UI) design are more important than ever. A well-designed product not only looks good but also provides a seamless and enjoyable experience for users...</p><h3>Impact on Conversion Rates</h3><p>A clear and intuitive user journey directly impacts conversion rates...</p>', 'Alif InfoTech Team', 'UI/UX Design', 'https://placehold.co/800x400.png', 'design process', true, '2024-06-28 10:00:00+00');

-- Insert job listings
INSERT INTO job_listings (title, location, type, description, responsibilities, qualifications, is_active) VALUES
('Senior React Developer', 'Remote', 'Full-time', 'Join our dynamic team to build cutting-edge web applications using React.', ARRAY['Develop and maintain web applications using React.js', 'Collaborate with cross-functional teams', 'Write clean, testable code'], ARRAY['5+ years of experience with React', 'Strong proficiency in JavaScript, HTML, CSS', 'Experience with RESTful APIs'], true),
('UI/UX Designer', 'Office-Based (Optional Remote)', 'Full-time', 'Create intuitive and visually appealing user interfaces for web and mobile applications.', ARRAY['Conduct user research and create user personas', 'Design wireframes, prototypes, and high-fidelity mockups', 'Collaborate with developers to implement designs'], ARRAY['Proven UI/UX design experience with a strong portfolio', 'Proficiency in Figma, Sketch, or Adobe XD', 'Understanding of user-centered design principles'], true);

-- Insert team members
INSERT INTO team_members (name, email, role, avatar_url, avatar_hint, is_active) VALUES
('Alice Wonderland', 'alice.w@example.com', 'Administrator', 'https://placehold.co/100x100.png', 'woman smiling', true),
('Bob The Builder', 'bob.b@example.com', 'Editor', 'https://placehold.co/100x100.png', 'man with glasses', true),
('Charlie Brown', 'charlie.b@example.com', 'Content Manager', 'https://placehold.co/100x100.png', 'man professional', true),
('Diana Prince', 'diana.p@example.com', 'Support Staff', 'https://placehold.co/100x100.png', 'woman corporate', true);

-- Insert testimonials
INSERT INTO testimonials (quote, client_name, company, avatar_url, avatar_hint, is_published) VALUES
('Working with Alif InfoTech Solutions was a game-changer for our business. Their expertise and dedication are unmatched.', 'Aisha Khan', 'Innovatech Ltd.', 'https://placehold.co/100x100.png', 'woman smiling', true),
('The mobile app they developed exceeded our expectations in every way. Highly professional and skilled team.', 'John Doe', 'StartupX', 'https://placehold.co/100x100.png', 'man portrait', true),
('Their UI/UX design transformed our product, making it incredibly user-friendly. We''ve seen a significant increase in engagement.', 'Fatima Ahmed', 'Creative Designs Co.', 'https://placehold.co/100x100.png', 'person professional', true);