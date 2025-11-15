import React from "react";
import type { Book } from "../../types/types";
import { useDispatch } from "react-redux";
import { deleteBook } from "../../slice/BooksSlice";
import type { AppDispatch } from "../../store/store";
import BookAuthor from "./BookAuthor";

type Props = {
  selectedbook: Book;
  onEdit: (b: Book) => void;
};

const BookItem: React.FC<Props> = ({ selectedbook, onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const addedDate = selectedbook.date ? new Date(selectedbook.date) : null;

  return (
    <article
      className="rounded-2xl bg-gray-800 p-[15px] shawdow-sm"
      aria-label={`Book: ${selectedbook.title}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Title & Meta */}
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-100">
            {selectedbook.title}
          </h3>
          {selectedbook.userId && (
            <div className="mt-1 text-sm text-white">
              <BookAuthor userId={selectedbook.userId} />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onEdit(selectedbook)}
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-2 py-1 text-sm shadow-sm"
            aria-label={`Edit ${selectedbook.title}`}
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteBook(selectedbook.id)).unwrap()}
            className="inline-flex items-center justify-center rounded-xl bg-red-400 px-2 py-1 text-sm shadow-sm"
            aria-label={`Delete ${selectedbook.title}`}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Description */}
      {selectedbook.description && (
        <p className="mt-3 text-sm text-gray-300 line-clamp-3 sm:line-clamp-none">
          {selectedbook.description}
        </p>
      )}

      {/* Footer meta */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
        <span className="inline-flex items-center rounded-full bg-gray-800">
          Added:
        </span>
        <time dateTime={addedDate ? addedDate.toISOString() : undefined}>
          {addedDate ? addedDate.toLocaleString() : "N/A"}
        </time>
      </div>
    </article>
  );
};

export default BookItem;