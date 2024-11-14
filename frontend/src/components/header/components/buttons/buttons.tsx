import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Buttons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  // Define an explicit union type for valid paths
  type ValidPath = "/landing" | "/sell";

  // Type the path parameter as ValidPath to enforce valid route types
  const handleNavigation = (path: ValidPath) => {
    setCurrentPath(path);
    navigate(path);
  };

  return (
    <div className="relative bg-primary-gray p-2 rounded-full flex justify-around w-full gap-5 font-semibold m-2">
      {/* Background Indicator */}
      <div
        className="absolute top-1.5 left-1.5 h-[80%] w-[45%] bg-white rounded-full transition-all duration-300 ease-in-out"
        style={{
          transform:
            currentPath === "/landing" ? "translateX(0%)" : "translateX(110%)",
        }}
      />

      {/* Buy Button */}
      <button
        className={`relative z-10 rounded-full px-6 py-2 transition-all duration-300 ease-in-out ${
          currentPath === "/landing"
            ? "text-black hover:bg-white"
            : "text-black hover:bg-secondary-gray"
        }`}
        onClick={() => handleNavigation("/landing")}
      >
        BUY
      </button>

      {/* Sell Button */}
      <button
        className={`relative z-10 rounded-full px-6 py-2 transition-all duration-300 ease-in-out ${
          currentPath === "/sell"
            ? "text-black hover:bg-white"
            : "text-black hover:bg-secondary-gray"
        }`}
        onClick={() => handleNavigation("/sell")}
      >
        SELL
      </button>
    </div>
  );
};

export default Buttons;
