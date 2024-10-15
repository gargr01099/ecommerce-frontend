// pages/register.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import userService from "../services/userService";
import Input from "../components/Input";
import Button from "../components/Button";
import PhoneInput from "react-phone-input-2";
import { usePopup } from "../context/PopupContext";
import "react-phone-input-2/lib/style.css";

const Register: React.FC = () => {
  const router = useRouter();
  const { showPopup } = usePopup();
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
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      showPopup(errorMessage);
    }
  };

  return (
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
  );
};

export default Register;
