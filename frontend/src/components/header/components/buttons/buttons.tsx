import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Buttons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // Function to handle navigation and update current path
  const handleNavigation = (path: any) => {
    setCurrentPath(path);
    navigate(path);
  };

  return (
    <div className="relative bg-primary-gray p-2 rounded-full flex justify-around w-full gap-5 font-semibold m-2 ">
      {/* Background Indicator */}
      <div
        className="absolute top-1.5 left-1.5 h-[80%] w-[45%] bg-white rounded-full transition-all duration-300 ease-in-out"
        style={{
          transform:
            currentPath === "/" ? "translateX(0%)" : "translateX(110%)",
        }}
      />

      {/* Buy Button */}
      <button
        className={`relative z-10 rounded-full px-6 py-2 ${
          currentPath === "/" ? "text-black" : "text-black"
        }`}
        onClick={() => handleNavigation("/")}
      >
        BUY
      </button>

      {/* Sell Button */}
      <button
        className={`relative z-10 rounded-full px-6 py-2 ${
          currentPath === "/sell" ? "text-black" : "text-black"
        }`}
        onClick={() => handleNavigation("/sell")}
      >
        SELL
      </button>
    </div>
  );
};

export default Buttons;
