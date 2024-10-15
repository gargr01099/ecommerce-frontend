"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "../components/Button";
import { usePopup } from "../context/PopupContext";
import { getAdminProfile, getUserProfile } from "../services/userService";
const EditProfile: React.FC = () => {
  const router = useRouter();
  const { showPopup } = usePopup();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "mohali,Punjab",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setError("You must be logged in to view this page.");
      router.push("/login");
      return;
    }

    if (storedUserId && storedRole) {
      setUserId(storedUserId);
      setRole(storedRole);
      fetchUserProfile(storedUserId, storedRole); // Use the role and user ID to fetch the profile
    } else {
      setError("User data not found.");
      router.push("/login");
    }
  }, [router]);

  // Fetch user profile using the existing getAdminProfile or getUserProfile function
  const fetchUserProfile = async (userId: string, role: string) => {
    try {
      let profileData;
      if (role === "admin") {
        profileData = await getAdminProfile();
      } else {
        profileData = await getUserProfile(Number(userId));
      }
      const { name, email, address, phone } = profileData;
      setFormData({ name, email, address: address || "", phone: phone || "" });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile.");
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to update user profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Form Data:', formData); // Add this for debugging

    try {
      const response  = await axios.patch(
        `http://localhost:3001/api/v1/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log('Update Response:', response.data); // Add this for debugging
      showPopup("Profile updated successfully!");
      router.replace("/profile"); // Redirect back to profile page after update
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-indigo-300 to-purple-600">
      <header className="w-full p-4 shadow-lg bg-white rounded-lg">
        <h1 className="text-gray-800 text-4xl font-bold text-center">
          Edit Profile
        </h1>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        >
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <Button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 rounded`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </main>

      <footer className="w-full bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 ECommerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EditProfile;
