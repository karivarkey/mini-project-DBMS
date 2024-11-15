import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sell = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      price,
      photo,
      ageRange,
      category,
      description,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        newProduct
      );
      toast.success("Product added successfully!");
      navigate("/landing"); // Navigate back to landing page after adding product
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-4 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-8">Add New Product</h1>

      <form
        onSubmit={handleAddProduct}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex flex-col mb-4">
          <label className="text-lg font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCE1E4]"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-lg font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCE1E4]"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-lg font-medium mb-1">Photo URL</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCE1E4]"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-lg font-medium mb-1">Age Range</label>
          <input
            type="text"
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCE1E4]"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-lg font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCE1E4]"
            required
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="text-lg font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCE1E4]"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#FCE1E4] px-6 py-3 rounded-md font-medium hover:bg-white transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Sell;
