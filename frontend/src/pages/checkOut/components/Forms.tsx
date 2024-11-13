import { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../../app/hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Forms = () => {
  const navigate = useNavigate();
  const orderItems = useAppSelector((state) => state.order.orderItems);
  const productIds = orderItems.map((item) => item.product._id);

  // State to store form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // State to store errors (for validation)
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    const newErrors = { ...errors };

    // Validate fields
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    } else {
      newErrors.fullName = "";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    } else {
      newErrors.email = "";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    } else {
      newErrors.phone = "";
    }

    if (!formData.street) {
      newErrors.street = "Street is required";
    } else {
      newErrors.street = "";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    } else {
      newErrors.city = "";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    } else {
      newErrors.state = "";
    }

    if (!formData.zip) {
      newErrors.zip = "Postal code is required";
    } else {
      newErrors.zip = "";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    } else {
      newErrors.country = "";
    }

    setErrors(newErrors);

    // Check if the form is valid before submission
    if (Object.values(newErrors).every((error) => error === "")) {
      // Prepare order data
      const orderData = {
        userId: formData.fullName, // Assuming fullName is used as userId for simplicity
        products: productIds,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
      };

      try {
        await axios
          .post("http://localhost:5000/api/orders", orderData)
          .then(() => {
            toast.success("Order placed");
            navigate("/");
          });

        // Reset form or handle successful submission
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        User Information Form
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-lg font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-lg font-medium">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Street Address */}
        <div className="mb-4">
          <label htmlFor="street" className="block text-lg font-medium">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your street address"
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street}</p>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-lg font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        {/* State */}
        <div className="mb-4">
          <label htmlFor="state" className="block text-lg font-medium">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your state"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </div>

        {/* Zip Code */}
        <div className="mb-4">
          <label htmlFor="zip" className="block text-lg font-medium">
            Zip Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your zip code"
          />
          {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label htmlFor="country" className="block text-lg font-medium">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your country"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Forms;
