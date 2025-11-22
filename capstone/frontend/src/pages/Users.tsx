"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
}

// Dummy users data
const DUMMY_USERS: User[] = [
  {
    _id: "69217eac9149eff6fbbbc81b",
    name: "Kaviarasan Rajendran",
    username: "rkavi26",
    email: "kaviarasanofficial26@gmail.com",
    createdAt: "2025-11-22T09:13:16.168Z",
  },
  {
    _id: "69216cf199719e30ab031b49",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    createdAt: "2025-11-22T07:57:37.513Z",
  },
  {
    _id: "69216cf199719e30ab031b47",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    createdAt: "2025-11-22T07:57:37.426Z",
  },
  {
    _id: "4",
    name: "Alice Johnson",
    username: "alicej",
    email: "alice.johnson@example.com",
    createdAt: "2025-11-21T10:20:15.000Z",
  },
  {
    _id: "5",
    name: "Bob Wilson",
    username: "bobwilson",
    email: "bob.wilson@example.com",
    createdAt: "2025-11-20T14:35:22.000Z",
  },
  {
    _id: "6",
    name: "Carol Martinez",
    username: "carolm",
    email: "carol.martinez@example.com",
    createdAt: "2025-11-19T08:45:30.000Z",
  },
];

export default function UsersPage() {
  const [users] = useState<User[]>(DUMMY_USERS);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Users</h1>
          <p className="text-slate-600">Browse and manage community members</p>
        </div>

        {/* Search */}
        <Card className="p-6 mb-6 border-0 shadow-md">
          <Input
            placeholder="Search by name, username, or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11"
          />
        </Card>

        {/* Users Table */}
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 border-b border-slate-200">
                  <TableHead className="font-bold text-slate-900 py-4">
                    Name
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Username
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Email
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Joined
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow
                      key={user._id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <TableCell className="font-medium text-slate-900 py-4">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-slate-700">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          @{user.username}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        {formatDate(user.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-12 text-slate-600"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
