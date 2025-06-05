
"use client"; // Make this a client component to use state

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, APP_NAME, CONTACT_DETAILS, COMPANY_NAME, Icons } from '@/lib/constants';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from "next/image";
import { useState, useEffect } from 'react'; // Import useState and useEffect

export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  const LogoDisplay = () => {
    if (!isMounted) { // Fallback during SSR or before hydration
      return <span className="font-bold text-xl text-primary">{COMPANY_NAME}</span>;
    }
    return (
      <>
        {!logoError ? (
          <Image
            src="/logo.png"
            alt={`${COMPANY_NAME} Logo`}
            width={170}
            height={40}
            className="h-10 w-auto"
            data-ai-hint="company logo blue gold"
            onError={() => setLogoError(true)}
          />
        ) : (
          <span className="font-bold text-xl text-primary">{COMPANY_NAME}</span>
        )}
      </>
    );
  };


  return (
    <footer className="bg-card border-t border-border text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <LogoDisplay />
            </Link>
            <p className="text-sm text-muted-foreground">
              {COMPANY_NAME} provides innovative software solutions to empower your digital future.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Contact Us</h3>
            <address className="not-italic space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <Icons.mapPin className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                <span>{CONTACT_DETAILS.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.phone className="h-5 w-5 text-primary shrink-0" />
                <a href={`tel:${CONTACT_DETAILS.phone}`} className="hover:text-primary">{CONTACT_DETAILS.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Icons.contact className="h-5 w-5 text-primary shrink-0" />
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-primary">{CONTACT_DETAILS.email}</a>
              </p>
            </address>
            <Button
              variant="outline"
              asChild
              className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <a
                href={`https://wa.me/${CONTACT_DETAILS.whatsapp}?text=${encodeURIComponent("Hello! I'd like to inquire about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Icons.whatsApp className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                  <Link href={social.href} aria-label={social.name}>
                    <social.icon className="h-6 w-6" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Dummy Separator, replace with actual if available or remove if not needed
const Separator = ({ className }: { className?: string }) => <hr className={className} />;
