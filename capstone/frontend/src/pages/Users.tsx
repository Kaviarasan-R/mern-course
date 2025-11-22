"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateFilters } from "../slice/usersSlice";
import {
  getUsersData,
  getUsersPagination,
  getUsersFilters,
  getUsersStatus,
} from "../slice/usersSlice";
import { getToken } from "../slice/authSlice";
import type { AppDispatch } from "../store/store";
import { Input } from "../components/ui/input";
import { Spinner } from "../components/ui/spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(getToken);

  const users = useSelector(getUsersData);
  const pagination = useSelector(getUsersPagination);
  const filters = useSelector(getUsersFilters);
  const status = useSelector(getUsersStatus);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(
      fetchUsers({
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
      fetchUsers({
        page: 1,
        search: value,
        sortBy: filters.sortBy,
        order: filters.order,
      })
    );
  };

  const handleSort = (sortBy: "createdAt" | "name", order: "asc" | "desc") => {
    dispatch(updateFilters({ sortBy, order }));
    dispatch(
      fetchUsers({
        page: 1,
        search: filters.search,
        sortBy,
        order,
      })
    );
  };

  const handlePageChange = (newPage: number) => {
    dispatch(
      fetchUsers({
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Users Directory
          </h1>
          <p className="text-slate-600">Browse all registered users</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name or username..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="md:col-span-2"
            />

            <select
              value={filters.sortBy}
              onChange={(e) =>
                handleSort(
                  e.target.value as "createdAt" | "name",
                  filters.order
                )
              }
              className="border rounded-lg px-3 py-2 text-slate-700"
            >
              <option value="createdAt">Sort by Joined Date</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleSort(filters.sortBy, "desc")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filters.order === "desc"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Newest First
            </button>
            <button
              onClick={() => handleSort(filters.sortBy, "asc")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filters.order === "asc"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Oldest First
            </button>
          </div>
        </div>

        {/* Users Table */}
        {status === "loading" && users.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="w-8 h-8" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Username
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                      Joined Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-slate-600"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          @{user.username}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>

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

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
