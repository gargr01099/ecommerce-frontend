"use client"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ProductPage: React.FC = () => {
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

  const handleAddToCart = (productId: number) => {
    // Logic to add the product to the cart
    console.log(`Product ${productId} added to cart.`);
    // You can update the state or use a context to manage cart items
  };

  const handleBuyNow = async (product: any) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Please log in to place an order.");
      router.push("/login");
      return;
    }

    const shippingAddress = {
      phone: "+1-234-567-8900",
      name: "Jane Doe",
      address: "456 Elm St",
      city: "Metropolis",
      postCode: "54321",
      state: "NY",
      country: "USA",
    };

    const orderData = {
      shippingAddress,
      orderedProducts: [
        {
          id: product.id, // Product ID
          product_unit_price: product.price, // Price of the product
          product_quantity: 1, // You can modify this based on user input
        },
      ],
    };

    try {
      const response = await axios.post("http://localhost:3001/api/v1/orders/", orderData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-indigo-300 to-purple-600">
      <header className="w-full p-4 shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">Product List</h1>
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
                    className="text-blue-600 hover:underline mr-4"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
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

export default ProductPage;
