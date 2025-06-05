
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample inquiry data - in a real app, this would come from a database
const sampleInquiries = [
  { id: "inq_001", name: "John Doe", email: "john.doe@example.com", subject: "Service Question", date: "2024-07-28", status: "New", type: "General Contact" },
  { id: "inq_002", name: "Jane Smith", email: "jane.smith@example.com", subject: "Quote for Web Dev", date: "2024-07-27", status: "Read", type: "Service Inquiry" },
  { id: "inq_003", name: "Bob Johnson", email: "bob.johnson@example.com", subject: "Partnership Opportunity", date: "2024-07-26", status: "Archived", type: "General Contact" },
];

export default function AdminInquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <Mail className="mr-3 h-8 w-8" />
          Manage Inquiries
        </h1>
        {/* Future: Add buttons for export, bulk actions etc. */}
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Inquiries List</CardTitle>
          <CardDescription>View and manage all incoming messages and service requests.</CardDescription>
          <div className="pt-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search inquiries by name, email, or subject..." className="pl-8 w-full" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {sampleInquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden lg:table-cell">Type</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{inquiry.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{inquiry.subject}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{inquiry.date}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        <Badge variant={inquiry.type === "Service Inquiry" ? "default" : "secondary"}>
                          {inquiry.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={
                            inquiry.status === "New" ? "destructive" : 
                            inquiry.status === "Read" ? "default" : "outline"
                          }
                          className={inquiry.status === "New" ? "bg-green-500 text-white hover:bg-green-600" : ""}
                        >
                          {inquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => alert(`View details for ${inquiry.name} (placeholder)`)}>
                          View
                        </Button>
                        {/* Future: Dropdown for more actions like Mark as Read, Archive, Delete */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-xl font-semibold">No Inquiries Yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                When users submit contact forms or service requests, they will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
