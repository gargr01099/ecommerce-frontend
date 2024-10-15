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
  const [username, setUsername] = useState("");

  //   useEffect(()=>{
  //     const storedUser = localStorage.getItem("user");
  //     if(storedUser){
  //       const user = JSON.parse(storedUser);
  //       setUsername(user.username);
  //     }
  //   },[]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userService.loginUser(formData);
      const user = response.data;
      //   localStorage.setItem("user", JSON.stringify(user));
      //   setUsername(user.username);
      // Check user role and route accordingly
      if (user.role === "admin") {
        router.push("/admin/products"); // Admin: Manage products
      } else if (user.role === "user") {
        router.push("/user/profile"); // User: Show profile and reviews
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      showPopup(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
