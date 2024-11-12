import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toy } from "../../types/Toy";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Cart from "../../components/cart/cart";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "../../app/hooks"; // Import hooks
import {
  addItemToOrder,
  removeItemFromOrder,
} from "../../features/order/orderSlice"; // Import actions

interface ImageData {
  url: string;
  publicId: string;
}

const Product = () => {
  const { productID } = useParams<{ productID: string }>();
  const [toy, setToy] = useState<Toy | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const dispatch = useAppDispatch(); // Initialize dispatch
  const orderItems = useAppSelector((state) => state.order.orderItems); // Access the global order state

  useEffect(() => {
    if (productID) {
      // Fetch toy details
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/toys/${productID}`)
        .then((response) => {
          setToy(response.data);
        })
        .catch((error) => {
          console.error("Error fetching toy:", error);
        });

      // Fetch images related to the toy
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/image/${productID}/images`
        )
        .then((response) => {
          setImages(response.data.images);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
  }, [productID]);

  const handleAddToCart = () => {
    if (toy) {
      console.log(`Adding to cart: ${toy.productName}`);
      dispatch(addItemToOrder(toy)); // Dispatch the action to add item to order
    }
  };

  const handleRemoveFromCart = () => {
    if (toy) {
      console.log(`Removing from cart: ${toy.productName}`);
      dispatch(removeItemFromOrder(toy._id)); // Dispatch the action to remove item from order
    }
  };

  // Find the current quantity of the product in the cart
  const productInCart = orderItems.find(
    (item) => item.product._id === toy?._id
  );

  return (
    <div className="container mx-auto p-6 lg:space-x-6">
      <div className="flex flex-col items-center justify-center mb-8 lg:mb-0">
        {images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg"
          >
            {images.map((image) => (
              <SwiperSlide key={image.publicId}>
                <img
                  src={image.url}
                  alt="Toy Image"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-gray-500">No images available.</p>
        )}
      </div>

      <div className="lg:w-1/2 space-y-6 pt-5">
        {toy ? (
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4 font-poppins">
              {toy.productName}
            </h1>
            <p className="text-gray-600 mb-4">{toy.description}</p>
            <div className="text-2xl font-bold text-green-600 mb-4">
              ${toy.price.toFixed(2)}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Age Range:</strong> {toy.ageGroup[0]} -{" "}
                {toy.ageGroup[1]} years
              </p>
              <p className="text-sm text-gray-700">
                <strong>Category:</strong> {toy.category.type}
              </p>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={handleAddToCart}
                className="px-2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors "
              >
                {productInCart
                  ? `Add More to Cart : (${productInCart.quantity})`
                  : "Add to Cart"}
              </button>
              <button
                onClick={handleRemoveFromCart}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading toy details...</p>
        )}
      </div>

      {/* Debugging the cart */}
      {orderItems.length > 0 && <Cart />}
    </div>
  );
};

export default Product;
