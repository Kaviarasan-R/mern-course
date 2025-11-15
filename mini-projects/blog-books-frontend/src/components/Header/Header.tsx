import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="m-4 rounded-2xl bg-gray-800/70 px-6 py-4 shadow-sm flex items-center justify-between">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-100">
        Book Blog
      </h1>

      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/home"
              className="text-gray-200 hover:text-white text-lg font-medium transition underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/home/users"
              className="text-gray-200 hover:text-white text-lg font-medium transition underline"
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
