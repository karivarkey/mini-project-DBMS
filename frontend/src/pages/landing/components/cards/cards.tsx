import React from "react";
import placeholder from "./image.png";
import star from "./assets/star.svg";
import { Toy } from "../../../../types/Toy";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
type Props = {
  toy: Toy; // Accept anything as a prop
};

const Card: React.FC<Props> = ({ toy }) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/image/${toy._id}/images`)
      .then((response) => {
        console.log(response.data.images);
        setImages(response.data.images);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, [toy._id]);
  return (
    <div className="card relative w-full max-w-xs group">
      {/* Darkening overlay for the entire card */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center justify-center h-full">
          <button
            className="bg-white px-6 py-2 rounded-full font-poppins z-50 font-light hover:bg-gray-700 hover:text-white transition duration-300"
            onClick={() => {
              navigate(`/product/${toy._id}`);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* Image container */}
      <div className="relative w-full flex items-center justify-center">
        <img
          src={images.length > 0 ? images[0].url : placeholder}
          alt=""
          className="w-full h-auto max-h-52 object-contain transition duration-300 group-hover:opacity-10" // Apply opacity change on card hover
        />
      </div>

      {/* Card details */}
      <div className="w-full bg-secondary-gray rounded-b-xl min-h-20">
        <div className="mt-2 px-3">
          <h1 className="font-poppins font-light text-sm text-left lg:text-xl">
            {toy.productName}
          </h1>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div>₹</div>
              <div>{toy.price}</div>
            </div>
            <div className="flex">
              <img src={star} alt="" />
              <div>{toy.popularity.views}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
