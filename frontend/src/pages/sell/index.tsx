import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderCard from "./components/orderCard/orderCard";
import { Order } from "../../types/Order";

const Sell = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders.");
      }
    };

    fetchOrders();
  }, []);

  // Update the state for a specific order's status
  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default Sell;
