import React, { useState } from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any | null;
  onSubmit: (shippingAddress: any, orderedProducts: any[]) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, product, onSubmit }) => {
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const orderedProducts = [
      {
        id: product?.id,
        product_unit_price: product?.price,
        product_quantity: 1, // You can adjust this as needed
      },
    ];
    
    onSubmit(shippingAddress, orderedProducts);
  };

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-lg font-bold">Order Product</h2>
        <p>Are you sure you want to order <strong>{product?.title}</strong>?</p>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Shipping Address</h3>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleInputChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            className="border p-2 w-full mb-2"
            required
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Confirm Order
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
