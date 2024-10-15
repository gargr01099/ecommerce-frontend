// components/ProductEditModal.tsx

import React, { useEffect, useState } from "react";

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onUpdate: (updatedProduct: any) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ isOpen, onClose, product, onUpdate }) => {
  const [formValues, setFormValues] = useState<any>({});

  useEffect(() => {
    if (product) {
      setFormValues({
        title: product.title,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...product, ...formValues });
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formValues.title}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formValues.price}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="stock">Stock:</label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={formValues.stock}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 text-gray-500">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
