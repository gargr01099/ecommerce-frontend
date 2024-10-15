"use client"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProductEditModal from "../../components/ProductEditModal"; // Import the modal component

const ProductsList: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/products/");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data.products) {
          setProducts(response.data.products);
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
    console.log(`Product ${productId} added to cart.`);
  };

  const handleBuyNow = async (product: any) => {
    const shippingAddress = {
      phone: "+1-234-567-8900",
      name: "Jane Doe",
      address: "456 Elm St",
      city: "Metropolis",
      postCode: "54321",
      state: "NY",
      country: "USA"
    };

    const orderedProducts = [
      {
        id: product.id,
        product_unit_price: product.price,
        product_quantity: 1
      }
    ];

    const orderPayload = {
      shippingAddress,
      orderedProducts
    };

    try {
      const response = await axios.post("http://localhost:3001/api/v1/orders/", orderPayload);
      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async (updatedProduct: any) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/products/${updatedProduct.id}`, updatedProduct);
      setProducts(products.map(product => (product.id === updatedProduct.id ? response.data : product)));
      alert("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

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
                <td className="py-2 px-4 flex space-x-2">
                  {role === "user" ? (
                    <>
                      <button
                        className="text-green-500 hover:underline"
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
                    </>
                  ) : (
                    <>
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
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

      <ProductEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
      />
    </div>
  );
};

export default ProductsList;
