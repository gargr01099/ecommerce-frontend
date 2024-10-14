import { useState } from "react";
import { useRouter } from "next/router";
import userService from "../services/userService";
import Input from "../components/Input";
import Button from "../components/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Home = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    address: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (phone: string) => {
    setFormData({ ...formData, phone });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.registerUser(formData);
      console.log("Registration successful");
      router.push("/login"); // Redirect to a success page
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-300 to-purple-600 p-6">
      <header className="w-full p-4 shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">ECommerce Store</h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="border rounded-lg p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="border rounded-lg p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border rounded-lg p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Phone"
              inputClass="border rounded-lg p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              Register
            </Button>
          </form>
        </div>
      </main>

      <footer className="w-full bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 ECommerce Store. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">Privacy Policy</a>
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">Terms of Service</a>
            <a href="#" className="text-blue-300 hover:text-blue-100 mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
