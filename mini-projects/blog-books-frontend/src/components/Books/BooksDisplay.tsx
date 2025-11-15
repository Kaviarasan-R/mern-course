import BookList from "./BookList";
import BookForm from "./BookForm";
import type { Book } from "../../types/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getBooksData } from "../../slice/BooksSlice";
import { Toaster } from "sonner";
import Header from "../Header/Header";

function BooksDisplay() {
  const books = useSelector(getBooksData);
  const [editing, setEditing] = useState<Book | null>(null);

  if (!books?.length)
    return (
      <div className="text-center color-gray-500">No books yet. Add one!</div>
    );
  return (
    <div className="min-h-screen flex flex-col max-w-7xl from-gray-950 via-gray-900 to-gray-900 text-gray-100">
      <Header />
      <div className="grid px-4 gap-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Left column: form card */}
          <div className="rounded-2xl bg-gray-800/70 p-5 shadow-sm ring-1 ring-white/5">
            <h2 className="mb-3 text-lg font-semibold text-white">
              {editing ? "Edit Book" : "Add Book"}
            </h2>
            <BookForm editing={editing} onDone={() => setEditing(null)} />
          </div>

          {/* Right column: list card */}
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-gray-800/70 p-5 shadow-sm ring-1 ring-white/5">
              <h2 className="mb-3 text-lg font-semibold text-white">Books</h2>
              <BookList onEdit={(b) => setEditing(b)} />
            </div>
          </div>
          <Toaster position="bottom-right" />
        </div>
      </div>
    </div>
  );
}
export default BooksDisplay;