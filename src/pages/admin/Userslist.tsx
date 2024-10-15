// pages/UsersList.tsx
"use client"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UsersList: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/users/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log("Response data:", response.data); // Log the response data
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>; // Center the loading message
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-indigo-300 to-purple-600">
      <header className="w-full p-4 shadow-lg bg-white rounded-lg">
        <h1 className="text-gray-800 text-4xl font-bold text-center">Users List</h1>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <div className="overflow-x-auto w-full max-w-6xl">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Created At</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-3 px-6">{user.id}</td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="w-full bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 ECommerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UsersList;
