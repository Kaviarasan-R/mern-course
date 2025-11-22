"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  updateFilters,
} from "../slice/postsSlice";
import {
  getPostsData,
  getPostsPagination,
  getPostsFilters,
  getPostsStatus,
  getPostsError,
} from "../slice/postsSlice";
import { getToken } from "../slice/authSlice";
import type { AppDispatch } from "../store/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Spinner } from "../components/ui/spinner";
import { toast } from "sonner";
import { Trash2, Edit, Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function Posts() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(getToken);

  const posts = useSelector(getPostsData);
  const pagination = useSelector(getPostsPagination);
  const filters = useSelector(getPostsFilters);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(
      fetchPosts({
        page: pagination.page,
        search: filters.search,
        sortBy: filters.sortBy,
        order: filters.order,
      })
    );
  }, []);

  const handleSearch = (value: string) => {
    dispatch(updateFilters({ search: value }));
    dispatch(
      fetchPosts({
        page: 1,
        search: value,
        sortBy: filters.sortBy,
        order: filters.order,
      })
    );
  };

  const handleSort = (sortBy: "createdAt" | "title", order: "asc" | "desc") => {
    dispatch(updateFilters({ sortBy, order }));
    dispatch(
      fetchPosts({
        page: 1,
        search: filters.search,
        sortBy,
        order,
      })
    );
  };

  const handleCreatePost = async () => {
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingId) {
      const resultAction = await dispatch(
        updatePost({
          id: editingId,
          title: formData.title,
          body: formData.body,
        })
      );

      if (updatePost.fulfilled.match(resultAction)) {
        toast.success("Post updated successfully");
        setIsOpen(false);
        setFormData({ title: "", body: "" });
        setEditingId(null);
        dispatch(
          fetchPosts({
            page: pagination.page,
            search: filters.search,
            sortBy: filters.sortBy,
            order: filters.order,
          })
        );
      } else {
        toast.error("Failed to update post");
      }
    } else {
      const resultAction = await dispatch(
        createPost({
          title: formData.title,
          body: formData.body,
        })
      );

      if (createPost.fulfilled.match(resultAction)) {
        toast.success("Post created successfully");
        setIsOpen(false);
        setFormData({ title: "", body: "" });
        dispatch(
          fetchPosts({
            page: 1,
            search: filters.search,
            sortBy: filters.sortBy,
            order: filters.order,
          })
        );
      } else {
        toast.error("Failed to create post");
      }
    }
  };

  const handleEdit = (post: any) => {
    setEditingId(post._id);
    setFormData({ title: post.title, body: post.body });
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const resultAction = await dispatch(deletePost(deleteId));

    if (deletePost.fulfilled.match(resultAction)) {
      toast.success("Post deleted successfully");
      setDeleteId(null);
      dispatch(
        fetchPosts({
          page: pagination.page,
          search: filters.search,
          sortBy: filters.sortBy,
          order: filters.order,
        })
      );
    } else {
      toast.error("Failed to delete post");
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(
      fetchPosts({
        page: newPage,
        search: filters.search,
        sortBy: filters.sortBy,
        order: filters.order,
      })
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Posts</h1>
          <p className="text-slate-600">Manage and explore all posts</p>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Search posts..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="md:col-span-2"
            />

            <select
              value={filters.sortBy}
              onChange={(e) =>
                handleSort(
                  e.target.value as "createdAt" | "title",
                  filters.order
                )
              }
              className="border rounded-lg px-3 py-2 text-slate-700"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>

            <select
              value={filters.order}
              onChange={(e) =>
                handleSort(filters.sortBy, e.target.value as "asc" | "desc")
              }
              className="border rounded-lg px-3 py-2 text-slate-700"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", body: "" });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Post" : "Create New Post"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="Post title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Post description"
                    value={formData.body}
                    onChange={(e) =>
                      setFormData({ ...formData, body: e.target.value })
                    }
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button
                  onClick={handleCreatePost}
                  disabled={status === "loading"}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {status === "loading" ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner className="w-4 h-4" />
                      <span>{editingId ? "Updating..." : "Creating..."}</span>
                    </div>
                  ) : editingId ? (
                    "Update Post"
                  ) : (
                    "Create Post"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Posts Cards */}
        {status === "loading" && posts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="w-8 h-8" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-slate-600">No posts found</p>
          </div>
        ) : (
          <div className="grid gap-6 mb-8">
            {posts.map((post: any) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      by {post.user?.username} •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteId(post._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{post.body}</p>

                {/* Delete Confirmation */}
                {deleteId === post._id && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-700 mb-3">
                      Are you sure you want to delete this post?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleDelete}
                        disabled={status === "loading"}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => setDeleteId(null)}
                        className="bg-slate-300 hover:bg-slate-400 text-slate-900"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Previous
            </Button>

            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg font-medium transition ${
                    page === pagination.page
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              variant="outline"
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
