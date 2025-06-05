
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PORTFOLIO_DATA, type Project } from "@/lib/constants";
import { MoreHorizontal, Pencil, PlusCircle, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Removed useState as it's not directly used for projectStates anymore

export default function AdminPortfolioPage() {
  const projects: Project[] = PORTFOLIO_DATA;
  
  // The handlePublishToggle and projectStates logic has been simplified/removed
  // as it's a placeholder for now. True backend integration would handle this.

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Manage Portfolio</h1>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Project
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
          <CardDescription>View, edit, or add new projects to your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden lg:table-cell">Description (Excerpt)</TableHead>
                    <TableHead className="text-center">Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => {
                    // For now, visibility is just a visual placeholder
                    const isPublished = true; // Simplified for now
                    return (
                      <TableRow key={project.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            width={80}
                            height={50}
                            className="rounded-md object-cover"
                            data-ai-hint={project.imageHint}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{project.category}</TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {project.description.length > 80
                            ? `${project.description.substring(0, 80)}...`
                            : project.description}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <Switch
                              id={`visibility-${project.id}`}
                              checked={isPublished}
                              // onCheckedChange={(checked) => handlePublishToggle(project.id, checked)} // Placeholder
                              aria-label={`Toggle publish status for ${project.title}`}
                            />
                             <span className="text-xs mt-1 text-muted-foreground">
                              {isPublished ? <Eye className="h-4 w-4 inline mr-1"/> : <EyeOff className="h-4 w-4 inline mr-1" />}
                              {isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="sr-only">Actions for {project.title}</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/portfolio/edit/${project.id}`} className="flex items-center cursor-pointer">
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive-foreground focus:bg-destructive/90 flex items-center cursor-pointer"
                                onClick={() => alert(`Delete action for ${project.title} (placeholder)`)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No projects found. Add your first project!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
