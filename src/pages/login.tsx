'use client'    
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import userService from "../services/userService"; // Your login service
import Input from "../components/Input";
import Button from "../components/Button";
import { usePopup } from "../context/PopupContext"; // Common popup for errors
import "react-phone-input-2/lib/style.css";

const Login: React.FC = () => {
  const router = useRouter();
  const { showPopup } = usePopup();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState<any>(null); // Track user information

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userService.loginUser(formData);
      const userData = await response; // Changed to userData for clarity
    console.log("User Data:", userData.user);
    // Log user data
      // Store user information in localStorage for future reference
      localStorage.setItem("userId", userData.user.id);
      localStorage.setItem("role", userData.user.role);
      console.log("userId", userData.user.id);   
      console.log("role", userData.user.role);   
      setUser(userData); // Store user data in state
      setRedirect(true); // Set redirect to true
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      showPopup(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (redirect && user) { // Check if redirect is true and user is defined
        console.log("Redirecting...");
        console.log("User:", user);
      if (user.role === "admin") {
        console.log("Admin login successful");
        router.push("/profile"); // Redirect admin to profile
      } else if (user.role === "user") {
        console.log("User login successful");
        router.push("/profile"); // Redirect user to profile
      }
    }
  }, [redirect, user, router]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-300 to-blue-600 p-6">
      <header className="w-full p-4 shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">
          Welcome Back! <br />
          <span className="text-lg font-medium">
            We're excited to have you. Please sign in to continue.
          </span>
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border rounded-lg p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="border rounded-lg p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </main>

      <footer className="w-full bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 ECommerce Store. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">
              Terms of Service
            </a>
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
