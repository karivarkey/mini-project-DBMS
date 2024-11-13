import { useAppSelector } from "../../app/hooks"; // Hook to access the global state

const CheckOut = () => {
  // Access the global cart state
  const orderItems = useAppSelector((state) => state.order.orderItems); // Assuming `orderItems` is in `order`

  // Calculate total price if each item has `price` and `quantity`
  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">CheckOut</h1>

      {/* Display cart items */}
      {orderItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center p-4 border-b border-gray-300"
            >
              <div>
                <p className="font-medium">{item.product.productName}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Price per item: ${item.product.price.toFixed(2)}
                </p>
              </div>
              <div className="text-lg font-semibold">
                ${item.product.price * item.quantity}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display total price */}
      {orderItems.length > 0 && (
        <div className="mt-6 text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default CheckOut;
