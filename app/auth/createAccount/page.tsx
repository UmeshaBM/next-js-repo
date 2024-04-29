"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserAccount } from "@/src/apiCalls/authApicalls";
import { regex } from "@/src/utils/regex";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    let isValid = true;

    // Validate name
    if (!formData.name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!formData.email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!regex.EMAILREGEX.test(formData.email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!regex.PASSWORDREGEX.test(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!handleValidation()) {
        return;
      }

      const response = await createUserAccount(formData);
      const [{ Error = "", isAuthorised = false, customerId = 0, token = "" }] =
        response;

      if (Error) {
        toast.error(Error);
        return;
      }

      if (isAuthorised) {
        toast.success("Account created successfully ");
        await localStorage.setItem("customerId", customerId);
        await localStorage.setItem("token", token);
        toast.success("Successfully account created");
        router.push("/");
      }
    } catch (error) {
      console.error("Error while creating user account:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-blue-500 text-2xl font-semibold mb-4">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your name"
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>
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
              value={formData.email}
              onChange={handleChange}
              className="p-2 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your email"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter your password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md mb-2 md:mb-0 md:mr-4"
              aria-label="Create a new account"
            >
              Submit
            </button>
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Already have an account?{" "}
              <Link href="/auth" className="text-blue-500 hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
