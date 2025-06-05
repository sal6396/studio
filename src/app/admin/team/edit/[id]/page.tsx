
"use client";

import { AddTeamMemberForm } from "@/components/forms/AddTeamMemberForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TEAM_MEMBERS_DATA, type TeamMember } from "@/lib/constants";
import { ArrowLeft, AlertTriangle, Loader2, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTeamMemberPage() {
  const params = useParams();
  const memberId = params.id as string;
  const [member, setMember] = useState<TeamMember | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (memberId) {
      // Simulate fetching team member data
      const foundMember = TEAM_MEMBERS_DATA.find(m => m.id === memberId);
      setMember(foundMember);
      setLoading(false);
    }
  }, [memberId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading team member details...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="space-y-6 text-center">
         <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild>
            <Link href="/admin/team">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Team Members</span>
            </Link>
            </Button>
            <h1 className="text-3xl font-bold text-destructive">Team Member Not Found</h1>
        </div>
        <Card className="shadow-xl max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center justify-center text-destructive">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Error
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">The team member with ID "{memberId}" could not be found.</p>
                <Button asChild className="mt-4">
                    <Link href="/admin/team">Return to Team Members</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-primary">Edit Team Member: {member.name}</h1>
        </div>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Update Member Details</CardTitle>
          <CardDescription>Modify the details for team member "{member.name}".</CardDescription>
        </CardHeader>
        <CardContent>
          <AddTeamMemberForm teamMemberToEdit={member} formAction="edit" />
        </CardContent>
      </Card>
    </div>
  );
}
