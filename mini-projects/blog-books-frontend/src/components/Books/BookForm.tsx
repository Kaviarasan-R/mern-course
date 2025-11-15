import { useEffect, useState } from "react";
import type { Book } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addNewBooks, updateBooks } from "../../slice/BooksSlice";
import { selectAllUsers } from "../../slice/UsersSlice";
import type { AppDispatch } from "../../store/store";
import AddNewAuthor from "../Users/AddNewAuthor";

type Props = {
  editing?: Book | null;
  onDone?: () => void;
};


const BookForm: React.FC<Props> = ({ editing = null, onDone }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState(editing?.title ?? "");
  const [author, setAuthor] = useState(editing?.author ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");

  const users = useSelector(selectAllUsers);
  const [userId, setUserId] = useState(editing?.userId);

  
  useEffect(() => {
    setTitle(editing?.title ?? "");
    setAuthor(editing?.author ?? "");
    setDescription(editing?.description ?? "");
    setUserId(editing?.userId ?? 0);
  }, [editing]);

  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAuthor(e.target.value);
    setUserId(Number(e.target.value));
  }
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setAuthor((users.find((u) => u.id === userId)?.name)|| "");
    }
    if (!title.trim() || !author.trim()) return;
    if (editing) {
      const updatedData: Book = {
        ...editing,
        userId: userId,
        title: title.trim(),
        author: author,
        description: description?.trim(),
      };
      dispatch(updateBooks(updatedData)).unwrap();
    } else {
      const newBook = {
        userId: userId,
        title: title.trim(),
        author: author.trim(),
        body: description?.trim(),
        createdAt: new Date().toISOString(),
      };
      dispatch(addNewBooks(newBook)).unwrap();
      setTitle("");
      setAuthor("");
      setDescription("");
    }
    onDone?.();
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id} >
      {user.name}
    </option>
  ));

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-5 rounded-md bg-gray-800"
    >
      <div>
        <label className="block text-sm font-medium text-white">Title</label>
        <input
          id={"title"}
          value={title}
          onChange={onTitleChanged}
          className="mt-1 block w-full rounded-md border p-2 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Author</label>
        <select
          id="author"
          value={userId || ""}
          onChange={onAuthorChanged}
          className=" text-sm mt-1 pr-2 block w-full rounded-md border bg-gray-800 p-2 light:text-black dark:text-white"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <AddNewAuthor />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">
          Description
        </label>
        <textarea
          value={description}
          onChange={onContentChanged}
          className="mt-1 block w-full rounded-md border p-2 text-white"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 text-white opacity-100 disabled:opacity-50"
          disabled={!title.trim() || !author.trim()}
        >
          {editing ? "Save" : "Add Book"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => onDone?.()}
            className="px-4 py-2 rounded border text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;
