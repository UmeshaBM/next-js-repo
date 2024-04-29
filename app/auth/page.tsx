"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { userLogin } from "@/src/apiCalls/authApicalls";
import { regex } from "@/src/utils/regex";
import Link from "next/link";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Email validation
      const emailError = !email
        ? "Email is required"
        : !regex.EMAILREGEX.test(email)
        ? "Email is invalid"
        : "";
      setEmailError(emailError);

      // Password validation
      const passwordError = !regex.PASSWORDREGEX.test(password)
        ? "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
        : "";
      setPasswordError(passwordError);

      if (emailError || passwordError) {
        // Return if there are validation errors
        return;
      }
      const res = await userLogin({ email, password });
      const [{ Error = "", isAuthorised = false, customerId = 0, token = "" }] =
        res;

      if (Error) {
        alert(Error);
        return;
      }

      if (isAuthorised) {
        await localStorage.setItem("customerId", customerId);
        await localStorage.setItem("token", token);
        setEmail("");
        setPassword("");
        toast.success("Successfully logged in");
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-blue-500 text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your email"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password*
            </label>
            <div className="flex justify-end items-center ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pr-12"
                placeholder="Enter your password"
              />

              {/* Toggle password visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute flex items-center justify-center pr-3 text-white rounded-md"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6"
                    viewBox="0 0 24 24"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 6.66a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6"
                    viewBox="0 0 24 24"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 4c4.29 0 7.863 2.429 10.665 7.154l.22 .379l.045 .1l.03 .083l.014 .055l.014 .082l.011 .1v.11l-.014 .111a.992 .992 0 0 1 -.026 .11l-.039 .108l-.036 .075l-.016 .03c-2.764 4.836 -6.3 7.38 -10.555 7.499l-.313 .004c-4.396 0 -8.037 -2.549 -10.868 -7.504a1 1 0 0 1 0 -.992c2.831 -4.955 6.472 -7.504 10.868 -7.504zm0 5a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md mb-2 md:mb-0 md:mr-4"
              aria-label="Login"
            >
              Login
            </button>
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              {"Don't have an account yet? "}
              <Link
                href="/auth/createAccount"
                className="text-blue-500 hover:underline"
              >
                Create an account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
