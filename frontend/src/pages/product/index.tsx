import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toy } from "../../types/Toy";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Swiper navigation styles
import "swiper/css/pagination"; // Swiper pagination styles
import { Navigation, Pagination } from "swiper/modules"; // Swiper modules

interface ImageData {
  url: string;
  publicId: string;
}

const Product = () => {
  const { productID } = useParams<{ productID: string }>(); // Get productID from route parameters
  const [toy, setToy] = useState<Toy | null>(null); // Initialize state with Toy type or null
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    if (productID) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/toys/${productID}`)
        .then((response) => {
          setToy(response.data); // Set toy data from the API response
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/image/${productID}/images`
        )
        .then((response) => {
          setImages(response.data.images); // Set images data from the API response
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
  }, [productID]);

  return (
    <div className="container mx-auto p-6  lg:space-x-6">
      {/* Left Column: Image Slider */}
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

      {/* Right Column: Product Details */}
      <div className="lg:w-1/2 space-y-6 pt-5">
        {toy ? (
          <div>
            {/* Toy Name */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-4 font-poppins">
              {toy.productName}
            </h1>

            {/* Toy Description */}
            <p className="text-gray-600 mb-4">{toy.description}</p>

            {/* Price */}
            <div className="text-2xl font-bold text-green-600 mb-4">
              ${toy.price.toFixed(2)}
            </div>

            {/* Additional Details */}
            {/* <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Age Range:</strong> {toy.ageRange}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Category:</strong> {toy.category}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Brand:</strong> {toy.brand}
              </p>
            </div> */}

            {/* Call-to-Action Buttons */}
            <div className="mt-6 space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors">
                Add to Cart
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                Add to Wishlist
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading toy details...</p>
        )}
      </div>
    </div>
  );
};

export default Product;
