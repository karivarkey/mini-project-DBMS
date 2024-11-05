import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: any) => {
    navigate(path);
    setIsOpen(false); // Close the sidebar after navigation
  };

  return (
    <div className="md:hidden block">
      <img
        src="/header/hamburger.svg"
        alt="Menu"
        className="block lg:hidden cursor-pointer"
        onClick={toggleSidebar}
      />
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-white transition-transform duration-300 h-screen z-40 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start p-8">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-2xl mb-4 font-poppins font-light">toy.ai</h2>
            {/* Close Button */}
            <button
              className="self-end text-gray-500 text-xl hover:text-black mb-4"
              onClick={() => setIsOpen(false)}
            >
              &times; {/* This is the close icon (×) */}
            </button>
          </div>
          <button
            className={`w-full text-lg p-2 rounded-md mb-2 text-left ${
              location.pathname === "/"
                ? "bg-primary-gray text-white"
                : "text-black"
            }`}
            onClick={() => handleNavigation("/")}
          >
            Buy
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-left ${
              location.pathname === "/sell"
                ? "bg-secondary-gray text-white"
                : "text-black"
            }`}
            onClick={() => handleNavigation("/sell")}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
