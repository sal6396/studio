
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_NAME } from "@/lib/constants";
import Link from "next/link"; // Import Link
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; 

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Login attempt - simulating success");
    localStorage.setItem('isAdminLoggedIn', 'true');

    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin'); 
    }, 1000); 
  };

  // handleForgotPassword is no longer needed here as it's a link now

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">{COMPANY_NAME} Admin</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" required defaultValue="admin@example.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/* Changed to Link component */}
                <Button variant="link" asChild className="text-sm text-primary hover:underline focus:outline-none p-0 h-auto">
                  <Link href="/admin/forgot-password">
                    Forgot password?
                  </Link>
                </Button>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
            </Button>
             <p className="text-xs text-center text-muted-foreground">
                This is a simulated login. Any credentials will "work".
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
