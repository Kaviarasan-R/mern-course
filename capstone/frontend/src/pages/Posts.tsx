"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  body: string;
  user: {
    username: string;
  };
  createdAt: string;
}

interface DialogPost {
  _id?: string;
  title: string;
  body: string;
}

// Dummy posts data
const DUMMY_POSTS: Post[] = [
  {
    _id: "69216cf199719e30ab031b51",
    title: "Authentication Best Practices",
    body: "Security is paramount in modern web applications. This post covers essential authentication practices including password hashing with bcrypt, JWT tokens, and session management strategies.",
    user: { username: "johndoe" },
    createdAt: "2025-11-22T07:57:37.516Z",
  },
  {
    _id: "69216cf199719e30ab031b4f",
    title: "Building REST APIs with Express",
    body: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.",
    user: { username: "johndoe" },
    createdAt: "2025-11-22T07:57:37.515Z",
  },
  {
    _id: "69216cf199719e30ab031b5d",
    title: "Deployment Strategies for Node.js Apps",
    body: "Taking your application from development to production requires careful planning. We'll explore various deployment options including containers, serverless, and traditional hosting solutions.",
    user: { username: "janesmith" },
    createdAt: "2025-11-22T07:57:37.520Z",
  },
  {
    _id: "69216cf199719e30ab031b4b",
    title: "Getting Started with MongoDB",
    body: "MongoDB is a powerful NoSQL database that stores data in flexible, JSON-like documents.",
    user: { username: "johndoe" },
    createdAt: "2025-11-22T07:57:37.514Z",
  },
  {
    _id: "69216cf199719e30ab031b55",
    title: "Introduction to React Hooks",
    body: "React Hooks revolutionized how we write React components. In this comprehensive guide, we'll explore useState, useEffect, and custom hooks.",
    user: { username: "janesmith" },
    createdAt: "2025-11-22T07:57:37.517Z",
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "title">("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<DialogPost | null>(null);
  const [formData, setFormData] = useState<DialogPost>({ title: "", body: "" });

  const ITEMS_PER_PAGE = 5;

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      let compareValue = 0;
      if (sortBy === "title") {
        compareValue = a.title.localeCompare(b.title);
      } else {
        compareValue =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return order === "asc" ? compareValue : -compareValue;
    });

    return filtered;
  }, [posts, search, sortBy, order]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleOpenDialog = (post?: Post) => {
    if (post) {
      setEditingPost(post);
      setFormData({ _id: post._id, title: post.title, body: post.body });
    } else {
      setEditingPost(null);
      setFormData({ title: "", body: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSavePost = () => {
    if (!formData.title.trim() || !formData.body.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (editingPost) {
      setPosts(
        posts.map((p) =>
          p._id === editingPost._id
            ? { ...p, title: formData.title, body: formData.body }
            : p
        )
      );
    } else {
      const newPost: Post = {
        _id: Date.now().toString(),
        title: formData.title,
        body: formData.body,
        user: { username: "currentuser" },
        createdAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
    }

    setIsDialogOpen(false);
    setFormData({ title: "", body: "" });
  };

  const handleDeletePost = () => {
    if (deletePostId) {
      setPosts(posts.filter((p) => p._id !== deletePostId));
      setDeletePostId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Posts</h1>
          <p className="text-slate-600">
            Explore and manage posts from the community
          </p>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-6 border-0 shadow-md">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-11"
              />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  >
                    <Plus size={18} />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? "Edit Post" : "Create Post"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Post title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="body">Description</Label>
                      <Textarea
                        id="body"
                        placeholder="Post content"
                        value={formData.body}
                        onChange={(e) =>
                          setFormData({ ...formData, body: e.target.value })
                        }
                        className="min-h-32 resize-none"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSavePost}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {editingPost ? "Update" : "Create"}
                      </Button>
                      <Button
                        onClick={() => setIsDialogOpen(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex gap-3">
              <Select
                value={sortBy}
                onValueChange={(value: any) => setSortBy(value)}
              >
                <SelectTrigger className="w-40 h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Sort by Date</SelectItem>
                  <SelectItem value="title">Sort by Title</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={order}
                onValueChange={(value: any) => setOrder(value)}
              >
                <SelectTrigger className="w-40 h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Posts Grid */}
        <div className="space-y-4 mb-8">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <Card
                key={post._id}
                className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">
                      {post.title}
                    </h2>
                    <div className="flex gap-4 text-sm text-slate-600">
                      <span>By {post.user.username}</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(post)}
                      className="gap-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </Button>
                    <AlertDialog
                      open={deletePostId === post._id}
                      onOpenChange={(open) => {
                        if (!open) setDeletePostId(null);
                      }}
                    >
                      <AlertDialog open={deletePostId === post._id}>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this post? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex gap-3">
                            <AlertDialogCancel
                              onClick={() => setDeletePostId(null)}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeletePost}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeletePostId(post._id)}
                        className="gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </AlertDialog>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed line-clamp-2">
                  {post.body}
                </p>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center border-0 shadow-md">
              <p className="text-slate-600 text-lg">No posts found</p>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
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
