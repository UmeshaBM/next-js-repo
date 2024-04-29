"use client";
import React, { useEffect } from "react";
import NavBar from "./infrastucter/navigation/navBar";
import Footer from "./infrastucter/navigation/footer";
import Login from "./auth/page";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthNavigator = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = checkIfUserIsAuthenticated();
  const router = useRouter();
  const pathname = usePathname();
  const allowedRoutes = ["/auth", "/auth/createAccount"];

  useEffect(() => {
    if (!isAuthenticated && !allowedRoutes.includes(pathname)) {
      router.push("/auth");
    }
  }, []);

  return isAuthenticated ? (
    <div>
      <NavBar />
      {children}
      <ToastContainer />
      <Footer />
    </div>
  ) : (
    allowedRoutes.includes(pathname) && (
      <div>
        {children}
        <ToastContainer />
      </div>
    )
  );
};

const checkIfUserIsAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return !!token;
  }
  return false;
};

export default AuthNavigator;
