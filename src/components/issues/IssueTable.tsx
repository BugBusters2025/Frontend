import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Eye, MapPin, Edit } from "lucide-react";
import { issueService, Issue } from "@/services/issueService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const getStatusColor = (status: Issue["status"]) => {
  switch (status) {
    case "pending":
      return "bg-warning text-warning-foreground";
    case "in-progress":
      return "bg-info text-info-foreground";
    case "resolved":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: Issue["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

interface IssueTableProps {
  refreshTrigger?: number;
}

export default function IssueTable({ refreshTrigger }: IssueTableProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { toast } = useToast();
  const { userProfile } = useAuth();

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const fetchedIssues = await issueService.getAllIssues();
      setIssues(fetchedIssues);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch issues",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [refreshTrigger]);

  const handleStatusChange = async (issueId: string, newStatus: Issue['status']) => {
    try {
      await issueService.updateIssueStatus(issueId, newStatus);
      await fetchIssues(); // Refresh the list
      toast({
        title: "Success",
        description: "Issue status updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to update issue status",
        variant: "destructive"
      });
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.reporter.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Issue Management</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading issues...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredIssues.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No issues found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.id}</TableCell>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell>{issue.category}</TableCell>
                    <TableCell>
                      <Select 
                        value={issue.status} 
                        onValueChange={(value) => handleStatusChange(issue.id!, value as Issue['status'])}
                        disabled={userProfile?.role === 'viewer'}
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{issue.reporter.name}</TableCell>
                    <TableCell className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      {issue.location.address}
                    </TableCell>
                    <TableCell>{issue.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {userProfile?.role !== 'viewer' && (
                          <Button variant="ghost" size="sm" title="Edit Issue">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}