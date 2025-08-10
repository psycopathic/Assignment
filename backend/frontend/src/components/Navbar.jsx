import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const isAdmin = authUser?.role === "admin";
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <h2 className="text-xl font-bold cursor-pointer hover:underline">
            <Link to="/">Url Shortener</Link>
          </h2>

          <div className="flex items-center space-x-3 md:space-x-4">
            {isAdmin && (
              <Button
                variant="default"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/admin")}
              >
                Admin
              </Button>
            )}

            {!authUser && (
              <>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
                <Button
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
              </>
            )}

            {authUser && (
              <div className="flex gap-2">
                <Button
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Log Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
