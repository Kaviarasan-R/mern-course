import { Link } from "react-router-dom";
import { selectAllUsers } from "../../slice/UsersSlice";
import { useSelector } from "react-redux";
import AddNewAuthor from "./AddNewAuthor";
import Header from "../Header/Header";
import { Toaster } from "sonner";

function UserList() {
  const users = useSelector(selectAllUsers);

  return (
    <div className="min-h-screen flex flex-col bg-gray-800/70">
      <Header />

      <main className="bg-gray-800/70 rounded-2xl sm:px-3 lg:px-4 mx-4 pt-2 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div className="sm:ml-auto">
            <div className="inline-flex">
              <AddNewAuthor />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {users.map((user) => (
            <Link
              key={user.id}
              to={`/home/users/${user.id}`}
              className="group block rounded-2xl p-4 sm:p-5 bg-gray-800"
              aria-label={`Open ${user.name}'s profile`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-indigo-300">
                    {user.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">View profile</p>
                </div>
                <span
                  className="mt-1 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white w-8 h-8"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </Link>
          ))}
          <Toaster position="bottom-center" />
        </div>
      </main>
    </div>
  );
}

export default UserList;