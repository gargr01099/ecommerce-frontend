'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAdminProfile, getUserProfile } from "../services/userService";
import Button from "../components/Button";
import { usePopup } from "../context/PopupContext";

const Profile: React.FC = () => {
  const router = useRouter();
  const { showPopup } = usePopup();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);    
  const [role, setRole] = useState<string | null>(null);    

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");   
    const accessToken = localStorage.getItem("accessToken"); // Get access token

    if (!accessToken) {
      setError("You must be logged in to view this page.");
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }

    if (storedUserId && storedRole) {
      setUserId(storedUserId);
      setRole(storedRole);
    } else {
      setError("User data not found.");
      router.push("/login"); // Redirect if user data is missing
    }
  }, [router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId || !role) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      try {
        let profileData;
        if (role === "admin") {
          profileData = await getAdminProfile();
        } else {
          profileData = await getUserProfile(Number(userId));
        }
        setUserProfile(profileData);
      } catch (err) {
        setError("Failed to fetch profile.");
        showPopup("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    if(userId && role ){
    fetchProfile();
    }
  }, [role, userId, showPopup]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token"); // Clear token if necessary
    router.push("/login");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-indigo-300 to-purple-600">
      <header className="w-full p-4 shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">
          Welcome, {userProfile?.name}!
        </h1>
      </header>

      <main className="flex-grow flex items-start space-x-4">
        {/* Sidebar */}
        <aside className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => router.push("/profile")}
              >
                Manage Profile
              </Button>
            </li>
            {role === "admin" && (
              <>
                <li>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => router.push("/admin/products")}
                  >
                    Manage Products
                  </Button>
                </li>
                <li>
                  <Button
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => router.push("/admin/orders")}
                  >
                    Manage Orders
                  </Button>
                </li>
              </>
            )}
            {role === "user" && (
              <>
                <li>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => router.push("/user/orders")}
                  >
                    Browse Products
                  </Button>
                </li>
                <li>
                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => router.push("/user/cart")}
                  >
                    View Cart
                  </Button>
                </li>
              </>
            )}
            <li>
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </ul>
        </aside>

        {/* Main content area */}
        <section className="flex-grow p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
          <div className="space-y-4">
            <p><strong>Name:</strong> {userProfile?.name}</p>
            <p><strong>Email:</strong> {userProfile?.email}</p>
            <p><strong>Address:</strong> {userProfile?.address || "N/A"}</p>
            <p><strong>Phone:</strong> {userProfile?.phone || "N/A"}</p>
            <p><strong>Role:</strong> {userProfile?.role}</p>
          </div>

          {role === "user" && (
            <>
              <h3 className="text-xl font-bold mt-6">Orders</h3>
              {/* Add component or logic to display user's orders here */}
            </>
          )}
        </section>
      </main>

      <footer className="w-full bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 ECommerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
