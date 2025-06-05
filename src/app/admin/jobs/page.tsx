
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JOB_LISTINGS_DATA, type JobListing } from "@/lib/constants";
import { MoreHorizontal, Pencil, PlusCircle, Trash2, Briefcase } from "lucide-react";
import Link from "next/link";

export default function AdminJobManagementPage() {
  const jobListings: JobListing[] = JOB_LISTINGS_DATA;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Manage Job Listings</h1>
        </div>
        <Button asChild>
          <Link href="/admin/jobs/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Job Listing
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
          <CardDescription>View, edit, or add new job listings. You can also manage applications (future feature).</CardDescription>
        </CardHeader>
        <CardContent>
          {jobListings.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobListings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{job.location}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{job.type}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                              <span className="sr-only">Actions for {job.title}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/jobs/edit/${job.id}`} className="flex items-center cursor-pointer">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive-foreground focus:bg-destructive/90 flex items-center cursor-pointer"
                              onClick={() => alert(`Delete action for ${job.title} (placeholder)`)}
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
            <p className="text-muted-foreground text-center py-8">No job listings found. Add your first listing!</p>
          )}
        </CardContent>
      </Card>
       {/* Placeholder for future job applications section */}
       <Card className="shadow-md mt-8">
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>Review and manage submitted job applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Job application management will be available here in a future update.</p>
        </CardContent>
      </Card>
    </div>
  );
}
