import React, { useState } from "react";
import axios from "axios";
import { Order } from "../../../../types/Order";
import toast from "react-hot-toast";
type OrderCardProps = {
  order: Order;
  onStatusChange: (id: string, status: string) => void;
};

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    // Start the loading state
    setLoading(true);

    try {
      // Send PATCH request to update status
      await axios
        .patch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${order._id}`, {
          status: newStatus,
        })
        .then(() => {
          toast.success("Updated order status successfully!");
        })
        .catch(() => {
          toast.error("Failed to update order status!");
        });

      // Trigger the parent function to update the status in parent state if successful
      onStatusChange(order._id, newStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
      // Optionally handle error UI here, e.g., by showing an alert or reverting the state
      setStatus(order.status); // revert to previous status on failure
    } finally {
      // Stop the loading state
      setLoading(false);
    }
  };

  return (
    <div className="order-card border p-4 rounded mb-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order ID: {order._id}</h2>

      <table className="table-auto w-full border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-semibold">User ID</td>
            <td className="py-2">{order.userId}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Address</td>
            <td className="py-2">{`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zip}`}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Total Price</td>
            <td className="py-2">${order.price.total.toFixed(2)}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">ETA</td>
            <td className="py-2">{new Date(order.ETA).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold">Status</td>
            <td className="py-2">
              <select
                value={status}
                onChange={handleStatusChange}
                className="p-1 border rounded"
                disabled={loading} // Disable dropdown while loading
              >
                <option value="Dispatched">Dispatched</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
              {loading && (
                <span className="ml-2 text-gray-500">Updating...</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderCard;
