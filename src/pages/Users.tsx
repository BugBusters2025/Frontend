import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ban, Search, Shield, User, UserPlus } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "citizen" | "admin" | "resolver";
  status: "active" | "inactive" | "banned";
  issuesReported: number;
  joinedAt: string;
}

const sampleUsers: User[] = [
  {
    id: "IND-001",
    name: "Aditya Kumar",
    email: "aditya@example.com",
    role: "citizen",
    status: "active",
    issuesReported: 12,
    joinedAt: "2024-01-10",
  },
  {
    id: "IND-002",
    name: "Atharv Chavan",
    email: "Atharv@email.com",
    role: "resolver",
    status: "active",
    issuesReported: 5,
    joinedAt: "2024-01-08",
  },
  {
    id: "IND-003",
    name: "Vijay Katkar",
    email: "Katkar.v@email.com",
    role: "admin",
    status: "active",
    issuesReported: 3,
    joinedAt: "2024-01-05",
  },
  {
    id: "IND-004",
    name: "Sagar Pande",
    email: "sagar.w@email.com",
    role: "citizen",
    status: "banned",
    issuesReported: 25,
    joinedAt: "2024-01-01",
  },
];

const getRoleColor = (role: User["role"]) => {
  switch (role) {
    case "admin":
      return "bg-primary text-primary-foreground";
    case "resolver":
      return "bg-secondary text-secondary-foreground";
    case "citizen":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: User["status"]) => {
  switch (status) {
    case "active":
      return "bg-success text-success-foreground";
    case "inactive":
      return "bg-warning text-warning-foreground";
    case "banned":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getRoleIcon = (role: User["role"]) => {
  switch (role) {
    case "admin":
      return Shield;
    case "resolver":
      return User;
    case "citizen":
      return User;
    default:
      return User;
  }
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = sampleUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">
            Manage system users and their permissions
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* User Management */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issues Reported</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center mr-3">
                            <RoleIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.issuesReported}</TableCell>
                      <TableCell>{user.joinedAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          {user.status !== "banned" && (
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Ban className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}