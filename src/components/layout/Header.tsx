
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, COMPANY_NAME } from "@/lib/constants"; // APP_NAME removed as COMPANY_NAME is used for logo
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent rendering on the server if using client-side state for logoError
    return (
      <header className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center font-bold text-xl text-primary h-10">
            {COMPANY_NAME}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" disabled>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  const closeSheet = () => setIsSheetOpen(false);

  const LogoDisplay = () => (
    <>
      {!logoError ? (
        <Image
          src="/logo.png"
          alt={`${COMPANY_NAME} Logo`}
          width={170}
          height={40}
          className="h-10 w-auto"
          data-ai-hint="company logo blue gold"
          priority
          onError={() => setLogoError(true)}
        />
      ) : (
        <span className="font-bold text-xl text-primary">{COMPANY_NAME}</span>
      )}
    </>
  );

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoDisplay />
        </Link>

        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                "text-foreground hover:text-primary hover:bg-primary/10",
                pathname === link.href && "text-primary bg-primary/10 font-semibold"
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
           <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground ml-2">
             <Link href="/contact#inquiry">Get a Quote</Link>
           </Button>
        </nav>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-card p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center" onClick={closeSheet}>
                  {/* Simplified logo for sheet to avoid re-creating full logic, or could pass logoError state down */}
                  {!logoError ? (
                     <Image
                        src="/logo.png"
                        alt={`${COMPANY_NAME} Logo`}
                        width={150}
                        height={35}
                        className="h-9 w-auto"
                        data-ai-hint="company logo blue gold"
                        onError={() => setLogoError(true)} // Add onError here too if this instance needs to be robust
                      />
                  ) : (
                     <span className="font-bold text-lg text-primary">{COMPANY_NAME}</span>
                  )}
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    asChild
                    className={cn(
                      "justify-start text-lg py-3 px-4",
                      pathname === link.href && "text-primary bg-primary/10 font-semibold"
                    )}
                    onClick={closeSheet}
                  >
                    <Link href={link.href} className="flex items-center gap-3">
                      {link.icon && <link.icon className="h-5 w-5" />}
                      {link.label}
                    </Link>
                  </Button>
                ))}
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 text-lg py-3">
                  <Link href="/contact#inquiry" onClick={closeSheet}>Get a Quote</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
