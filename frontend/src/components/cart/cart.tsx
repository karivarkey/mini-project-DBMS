import { useState } from "react";
import { useAppSelector } from "../../app/hooks"; // Access global state
import { useAppDispatch } from "../../app/hooks"; // Access dispatch if needed for actions (e.g. removing items)
import { removeItemFromOrder } from "../../features/order/orderSlice"; // Import action to remove items from the cart

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orderItems = useAppSelector((state) => state.order.orderItems); // Access the order items from the Redux store

  const dispatch = useAppDispatch();

  // Toggle the modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle removing item from cart
  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromOrder(productId)); // Dispatch the action to remove the item
  };

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      return total + item.quantity * item.product.price; // Multiply quantity by price and sum
    }, 0);
  };

  const totalPrice = calculateTotal(); // Get the total price

  return (
    <>
      {/* Cart icon at the bottom of the screen */}
      {!isModalOpen && (
        <div
          onClick={toggleModal}
          className="fixed bottom-4 right-4 bg-blue-600 p-4 rounded-full shadow-lg cursor-pointer transition-all transform hover:scale-110 duration-300 ease-in-out"
        >
          <img src="/product/cart.png" alt="Cart" className="w-12 h-12" />

          {orderItems.length > 0 && (
            <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {orderItems.length}
            </div>
          )}
        </div>
      )}

      {/* Modal/Pop-up for cart details */}
      {isModalOpen && (
        <div
          className="fixed flex items-end justify-center z-50 right-0 bottom-0 min-w-[50%]"
          onClick={toggleModal}
        >
          {/* Pop-up modal container with scaling and sliding animation */}
          <div
            className="bg-white p-6 w-full max-w-md rounded-t-lg shadow-lg transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal
            style={{
              transform: isModalOpen
                ? "translateY(0) scale(1)" // Full size and at the bottom
                : "translateY(100%) scale(0)", // Hidden and scaled down
              opacity: isModalOpen ? 1 : 0, // Fade in/out during transition
            }}
          >
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            <div className="max-h-60 overflow-y-auto">
              {orderItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                orderItems.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div className="flex items-center">
                      <div>
                        <p className="font-medium">
                          {item.product.productName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Display total price */}
            <div className="mt-4 flex justify-between items-center">
              <p className="font-semibold text-lg">Total:</p>
              <p className="font-semibold text-lg text-blue-600">
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={toggleModal}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => alert("Proceeding to Checkout")} // Replace with actual checkout functionality
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
