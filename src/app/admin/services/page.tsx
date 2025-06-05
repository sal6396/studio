

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SERVICES_DATA, type Service } from "@/lib/constants"; // Ensure Service type is exported if not already
import { MoreHorizontal, Pencil, PlusCircle, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AdminServicesPage() {
  // In a real app, this data would come from a database and be mutable.
  // For demonstration, we assume the Service type from constants.ts is usable.
  // If Service type isn't directly usable due to Icon component, we might need a modified type here or fetch data differently.
  const services: Service[] = SERVICES_DATA;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Manage Services</h1>
        <Button asChild>
          <Link href="/admin/services/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Service
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Services List</CardTitle>
          <CardDescription>View, edit, or add new services offered on your website.</CardDescription>
        </CardHeader>
        <CardContent>
          {services.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Description (Excerpt)</TableHead>
                    <TableHead className="text-center">Visibility</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => {
                    const ServiceIcon = service.icon;
                    // For now, visibility is just a visual placeholder
                    const isVisible = true; 
                    return (
                      <TableRow key={service.slug}>
                        <TableCell>
                          <ServiceIcon className="h-8 w-8 text-primary" />
                        </TableCell>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {service.description.length > 100 
                            ? `${service.description.substring(0, 100)}...` 
                            : service.description}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <Switch
                              id={`visibility-${service.slug}`}
                              checked={isVisible}
                              // onCheckedChange={() => {/* Handle visibility change in a real app */}}
                              aria-label={`Toggle visibility for ${service.title}`}
                            />
                             <span className="text-xs mt-1 text-muted-foreground">
                              {isVisible ? <Eye className="h-4 w-4 inline mr-1"/> : <EyeOff className="h-4 w-4 inline mr-1" />}
                              {isVisible ? 'Visible' : 'Hidden'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="sr-only">Actions for {service.title}</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/services/edit/${service.slug}`} className="flex items-center cursor-pointer"> {/* Placeholder edit link */}
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive-foreground focus:bg-destructive/90 flex items-center cursor-pointer"
                                onClick={() => alert(`Delete action for ${service.title} (placeholder)`)}
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
            <p className="text-muted-foreground text-center py-8">No services found. Add your first service!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
