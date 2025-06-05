
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TEAM_MEMBERS_DATA, type TeamMember } from "@/lib/constants";
import { MoreHorizontal, Pencil, PlusCircle, Trash2, Users } from "lucide-react";
import Link from "next/link";

export default function AdminTeamPage() {
  const teamMembers: TeamMember[] = TEAM_MEMBERS_DATA;

  const getInitials = (name: string) => {
    if (!name) return "";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Manage Team Members</h1>
        </div>
        <Button asChild>
          <Link href="/admin/team/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Team Member
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Team Members List</CardTitle>
          <CardDescription>View, edit, or add new team members and manage their roles.</CardDescription>
        </CardHeader>
        <CardContent>
          {teamMembers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] hidden sm:table-cell">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Avatar>
                          {member.avatarUrl ? (
                            <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.avatarHint || 'person avatar'} />
                          ) : (
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{member.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{member.role}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                              <span className="sr-only">Actions for {member.name}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/team/edit/${member.id}`} className="flex items-center cursor-pointer">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive-foreground focus:bg-destructive/90 flex items-center cursor-pointer"
                              onClick={() => alert(`Delete action for ${member.name} (placeholder)`)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No team members found. Add your first team member!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
