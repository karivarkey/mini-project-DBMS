import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Buttons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // Function to handle navigation and update current path
  const handleNavigation = (path: any) => {
    setCurrentPath(path);
    navigate(path); // Use navigate instead of window.location.pathname
  };

  return (
    <div className="relative bg-primary-gray p-2 rounded-full flex justify-around w-full gap-5 font-semibold">
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-[#ffffff] rounded-full transition-all duration-300 ease-in-out`}
        style={{
          transform:
            currentPath === "/" ? "translateX(0%)" : "translateX(100%)",
        }}
      />

      <button
        className={`relative z-10 rounded-full px-6 py-1 ${
          currentPath === "/" ? "text-black" : "text-white"
        }`}
        onClick={() => setTimeout(() => handleNavigation("/"), 300)}
      >
        BUY
      </button>

      <button
        className={`relative z-10 rounded-full px-6 py-1 ${
          currentPath === "/sell" ? "text-black" : "text-white"
        }`}
        onClick={() => setTimeout(() => handleNavigation("/sell"), 300)}
      >
        SELL
      </button>
    </div>
  );
};

export default Buttons;
