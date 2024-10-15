"use client"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ProductsList: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3001/api/v1/products/");
          console.log("API Response:", response.data); // Log the response data
          if (Array.isArray(response.data)) {
            setProducts(response.data); // Directly set if response is an array
          } else if (response.data.products) {
            setProducts(response.data.products); // Access the products array if nested
          } else {
            throw new Error("Unexpected data format");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          setError("Failed to fetch products.");
        } finally {
          setLoading(false);
        }
      };
      

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-indigo-300 to-purple-600">
      <header className="w-full p-4 shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">Products List</h1>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.title}</td>
                <td className="py-2 px-4">{product.price}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => router.push(`/admin/edit-product/${product.id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="w-full bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2023 ECommerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductsList;
