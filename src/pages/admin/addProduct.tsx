import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "../../components/Button";
import { usePopup } from "../../context/PopupContext";

const AddProduct: React.FC = () => {
  const router = useRouter();
  const { showPopup } = usePopup();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    images: ["", ""], // For two image URLs
  });
  const [fileImages, setFileImages] = useState<File[]>([]); // For local files
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handles input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;

    if (name === "images" && index !== undefined) {
      const updatedImages = [...formData.images];
      updatedImages[index] = value;
      setFormData({ ...formData, images: updatedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    console.log(`Updated form data:`, formData);
  };

  // Handles file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFileImages(files);
    console.log(`Files selected:`, files);
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const productData = new FormData();
    
    // Append the string data to FormData
    productData.append("title", formData.title);
    productData.append("description", formData.description);
    productData.append("price", String(formData.price));
    productData.append("stock", String(formData.stock));

    console.log("Appending product details:");
    console.log(`Title: ${formData.title}`);
    console.log(`Description: ${formData.description}`);
    console.log(`Price: ${formData.price}`);
    console.log(`Stock: ${formData.stock}`);

    formData.images.forEach((image, index) => {
      if (image) {
        productData.append(`images[${index}]`, image);
        console.log(`Appended image URL ${index + 1}:`, image);
      }
    });

    fileImages.forEach((file, index) => {
      productData.append("images", file);
      console.log(`Appended file image ${index + 1}:`, file);
    });

    try {
      const response = await axios.post("http://localhost:3001/api/v1/products/", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("Product added successfully:", response.data);
      showPopup("Product added successfully!");
      router.push("/admin/products"); // Redirect after success
    } catch (error: any) {
      console.error("Error adding product:", error.response?.data || error);
      setError("Failed to add product. Please try again.");
      showPopup("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-indigo-300 to-purple-600">
      <header className="w-full p-4 shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center drop-shadow-lg">Add New Product</h1>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Image URLs:</label>
            {formData.images.map((image, index) => (
              <input
                key={index}
                type="text"
                name="images"
                value={image}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Image URL ${index + 1}`}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Upload Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded"
            />
          </div>
          <Button
            className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 rounded`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Product'}
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

export default AddProduct;
