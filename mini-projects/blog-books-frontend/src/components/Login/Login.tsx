import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen bg-gray-800 items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 sm:mb-8 text-center">
          <p className="mt-2 text-4xl text-gray-100">Books Blog Login</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-300 pb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Username"
                className="mt-1 block w-full rounded-xl border bg-gray-900 px-3 py-2 text-gray-100"
              />
            </div>

            <label className="block text-sm font-medium pb-2 pt-2 text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="mt-1 block w-full rounded-xl border bg-gray-900 px-3 py-2 text-gray-100"
            />
            <button
              type="submit"
              disabled={!username || !password}
              className="inline-flex w-full items-center justify-center mt-4 rounded-xl bg-indigo-500 px-4 py-2.5 text-white cursor-pointer disabled-button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
