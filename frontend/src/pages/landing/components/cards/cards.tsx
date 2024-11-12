import React from "react";
import placeholder from "./image.png";
import star from "./assets/star.svg";
import { Toy } from "../../../../types/Toy";
type Props = {
  toy: Toy; // Accept anything as a prop
};

const Card: React.FC<Props> = ({ toy }) => {
  return (
    <div className="card relative w-full max-w-xs group">
      {/* Darkening overlay for the entire card */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center justify-center h-full">
          <button className="bg-white px-6 py-2 rounded-full font-poppins font-light hover:bg-gray-700">
            Add to cart
          </button>
        </div>
      </div>

      {/* Image container */}
      <div className="relative w-full flex items-center justify-center">
        <img
          src={placeholder}
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
