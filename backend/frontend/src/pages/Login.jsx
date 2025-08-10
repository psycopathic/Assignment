import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Add error states for each field
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, isLogin } = useAuthStore();

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      toast.error("Invalid email format");
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      toast.error("Password is required");
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      toast.error("Password must be at least 6 characters");
      valid = false;
    }

    setErrors(newErrors); // update error states to show inline errors
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      try {
        await login(formData);
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 border border-black w-[400px] h-[450px] p-6 rounded-lg hover:shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="size-5 text-base-content/40" />
            </div>
            <input
              type="email"
              className={`input w-full h-14 pl-10 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`input w-full h-14 pl-10 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              role="button"
              tabIndex={0}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer select-none"
              onClick={() => setShowPassword(!showPassword)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowPassword(!showPassword);
                }
              }}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition-colors duration-200 cursor-pointer"
          disabled={isLogin}
        >
          {isLogin ? (
            <>
              <Loader2 className="size-5 animate-spin inline-block mr-2" />
              Loading...
            </>
          ) : (
            "Login"
          )}
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-500 ml-1">Signup</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
