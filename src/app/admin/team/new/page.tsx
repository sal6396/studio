
"use client";

import { AddTeamMemberForm } from "@/components/forms/AddTeamMemberForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddNewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/team">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Team Members</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Add New Team Member</h1>
        </div>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Team Member Details</CardTitle>
          <CardDescription>Fill in the form below to add a new member to your team.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddTeamMemberForm formAction="add" />
        </CardContent>
      </Card>
    </div>
  );
}
