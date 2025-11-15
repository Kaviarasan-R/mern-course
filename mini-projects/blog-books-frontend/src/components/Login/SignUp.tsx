import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen bg-gray-800 items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 sm:mb-8 text-center">
          <p className="mt-2 text-4xl text-gray-100">Sign Up to Books Blog</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">
          <form onSubmit={handleSignupSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-300 pb-2">
                Email ID
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email ID"
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
              disabled={!email || !password}
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

export default SignUp;
