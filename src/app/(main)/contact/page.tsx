
import { COMPANY_NAME, CONTACT_DETAILS, Icons } from '@/lib/constants';
import { ContactForm } from '@/components/forms/ContactForm';
import { InquiryForm } from '@/components/forms/InquiryForm';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY_NAME}`,
  description: `Get in touch with ${COMPANY_NAME}. Find our address, phone, email, and use our contact form for inquiries.`,
};

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We're here to answer your questions and help you get started on your next project.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4 text-lg">
                  <p className="flex items-start">
                    <Icons.mapPin className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                    <span><strong>Address:</strong> {CONTACT_DETAILS.address}</span>
                  </p>
                  <p className="flex items-center">
                    <Icons.phone className="h-6 w-6 text-primary mr-3 shrink-0" />
                    <span><strong>Phone:</strong> <a href={`tel:${CONTACT_DETAILS.phone}`} className="hover:text-primary">{CONTACT_DETAILS.phone}</a></span>
                  </p>
                  <p className="flex items-center">
                    <Icons.contact className="h-6 w-6 text-primary mr-3 shrink-0" />
                    <span><strong>Email:</strong> <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-primary">{CONTACT_DETAILS.email}</a></span>
                  </p>
                </div>
                <Button 
                  asChild 
                  className="mt-6 bg-green-500 hover:bg-green-600 text-white"
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
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
            
            {/* Inquiry Form Section */}
            <div className="space-y-8" id="inquiry">
                <h2 className="text-3xl font-semibold mb-6">Service Inquiry</h2>
                <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_DETAILS.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              title="Office Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
