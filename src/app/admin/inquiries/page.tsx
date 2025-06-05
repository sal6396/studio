
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Search, Filter as FilterIcon } from "lucide-react"; // Renamed Filter to FilterIcon to avoid conflict
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define the Inquiry type
interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  date: string;
  status: "New" | "Read" | "Archived"; // Stricter status types
  type: "General Contact" | "Service Inquiry"; // Stricter type types
  message?: string; // Added full message field
}

// Sample inquiry data - in a real app, this would come from a database
const sampleInquiriesData: Inquiry[] = [
  { id: "inq_001", name: "John Doe", email: "john.doe@example.com", subject: "Service Question about Web Dev", date: "2024-07-28", status: "New", type: "General Contact", message: "Hello, I have a question regarding your web development services. Can you tell me more about the process?" },
  { id: "inq_002", name: "Jane Smith", email: "jane.smith@example.com", subject: "Quote for Web Dev Project", date: "2024-07-27", status: "Read", type: "Service Inquiry", message: "Hi, I'd like to get a quote for a new e-commerce website. My budget is X and timeline is Y." },
  { id: "inq_003", name: "Bob Johnson", email: "bob.johnson@example.com", subject: "Partnership Opportunity", date: "2024-07-26", status: "Archived", type: "General Contact", message: "We are interested in exploring a partnership with your company. Please let me know if you are available for a call." },
  { id: "inq_004", name: "Alice Brown", email: "alice.brown@example.com", subject: "Mobile App Idea Discussion", date: "2024-07-29", status: "New", type: "Service Inquiry", message: "I have an exciting idea for a mobile application and would love to discuss it with your team to see if it's feasible." },
  { id: "inq_005", name: "Charlie Green", email: "charlie.green@example.com", subject: "Feedback on UI/UX Design Service", date: "2024-07-30", status: "Read", type: "General Contact", message: "Just wanted to provide some positive feedback on the UI/UX design service I received. It was excellent!" },
];

export default function AdminInquiriesPage() {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Inquiry['status'] | "All">("All");

  const handleViewClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsViewDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: Inquiry['status']) => {
    switch (status) {
      case "New":
        return "destructive"; 
      case "Read":
        return "default";
      case "Archived":
        return "outline";
      default:
        return "secondary";
    }
  };
  
  const getStatusBadgeClass = (status: Inquiry['status']) => {
     if (status === "New") return "bg-green-500 text-white hover:bg-green-600";
     return "";
  }

  const filteredInquiries = useMemo(() => {
    return sampleInquiriesData.filter(inquiry => {
      const matchesSearchTerm = searchTerm.toLowerCase() === "" ||
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatusFilter = statusFilter === "All" || inquiry.status === statusFilter;

      return matchesSearchTerm && matchesStatusFilter;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <Mail className="mr-3 h-8 w-8" />
          Manage Inquiries
        </h1>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Inquiries List</CardTitle>
          <CardDescription>View and manage all incoming messages and service requests.</CardDescription>
          <div className="pt-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search inquiries by name, email, or subject..." 
                className="pl-8 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filter by Status: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={statusFilter} onValueChange={(value) => setStatusFilter(value as Inquiry['status'] | "All")}>
                  <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="New">New</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Read">Read</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Archived">Archived</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          {filteredInquiries.length > 0 ? (
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
                  {filteredInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{inquiry.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate" title={inquiry.subject}>{inquiry.subject}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{inquiry.date}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        <Badge variant={inquiry.type === "Service Inquiry" ? "default" : "secondary"}>
                          {inquiry.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={getStatusBadgeVariant(inquiry.status)}
                          className={getStatusBadgeClass(inquiry.status)}
                        >
                          {inquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewClick(inquiry)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-xl font-semibold">No Inquiries Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No inquiries match your current search or filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedInquiry && (
        <AlertDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Inquiry Details</AlertDialogTitle>
              <AlertDialogDescription>
                From: {selectedInquiry.name} ({selectedInquiry.email})
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-3 py-4 text-sm max-h-[60vh] overflow-y-auto">
              <p><strong>ID:</strong> {selectedInquiry.id}</p>
              <p><strong>Date Received:</strong> {selectedInquiry.date}</p>
              <p><strong>Type:</strong> 
                <Badge variant={selectedInquiry.type === "Service Inquiry" ? "default" : "secondary"} className="ml-2">
                    {selectedInquiry.type}
                </Badge>
              </p>
              <p><strong>Status:</strong> 
                <Badge variant={getStatusBadgeVariant(selectedInquiry.status)} className={`${getStatusBadgeClass(selectedInquiry.status)} ml-2`}>
                    {selectedInquiry.status}
                </Badge>
              </p>
              <div className="space-y-1">
                <p className="font-medium">Subject:</p>
                <p className="p-2 border rounded bg-muted/30 text-muted-foreground">{selectedInquiry.subject}</p>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium">Message:</p>
                <div className="p-3 border rounded bg-muted/30 text-muted-foreground min-h-[100px] whitespace-pre-wrap">
                  {selectedInquiry.message || "No message content provided."}
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              {/* Example: Add actions like "Mark as Read", "Archive" etc. here in a real app */}
              {/* <AlertDialogAction onClick={() => alert('Marked as read (placeholder)')}>Mark as Read</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

