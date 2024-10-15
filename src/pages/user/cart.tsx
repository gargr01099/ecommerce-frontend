/**
 * The `Cart` component represents the user's shopping cart. It displays the items in the cart, allows the user to remove items, and provides a button to proceed to the checkout page.
 *
 * The component retrieves the cart items from the browser's local storage and updates the state accordingly. It provides a `handleRemoveFromCart` function to remove an item from the cart, and a `handleCheckout` function to navigate to the checkout page.
 *
 * The component renders a table displaying the cart items, with columns for the product ID, title, and price. It also includes a "Remove" button for each item, which calls the `handleRemoveFromCart` function when clicked. If the cart is empty, a message is displayed instead of the table.
 *
 * At the bottom of the component, a "Checkout" button is rendered, which calls the `handleCheckout` function when clicked.
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Cart: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    router.push("/checkout"); // Navigate to a checkout page or order summary
  };

  return (
    <div className="flex flex-col p-6 bg-gradient-to-br from-indigo-300 to-purple-600 min-h-screen">
      <h1 className="text-white text-4xl font-bold text-center mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-white text-lg text-center">Your cart is empty.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.price}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
