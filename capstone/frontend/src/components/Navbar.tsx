"use client";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken, logout } from "../slice/authSlice";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const handleLogout = () => {
    dispatch(logout() as any);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!token) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md border-b border-slate-200">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-8 h-16">
          <div className="flex items-center gap-8">
            <div className="flex gap-6">
              <button
                onClick={() => navigate("/posts")}
                className="text-slate-700 hover:text-blue-600 font-medium transition"
              >
                Posts
              </button>
              <button
                onClick={() => navigate("/users")}
                className="text-slate-700 hover:text-blue-600 font-medium transition"
              >
                Users
              </button>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white flex gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
