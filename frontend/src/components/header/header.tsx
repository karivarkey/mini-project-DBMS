import Buttons from "./components/buttons/buttons";
import Sidebar from "./components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center px-8 pt-2">
      <div className="flex gap-4 items-center ">
        <div className="">
          <Sidebar />
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/landing");
            }}
          >
            <h1 className="font-poppins text-3xl font-extralight ">toy.ai</h1>
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Buttons />
      </div>
      <div>
        <button
          className="bg-primary-gray p-2 rounded-full flex items-center justify-center gap-2 hover:bg-secondary-gray  transition duration-300 ease-in-out text-sm md:text-base lg:text-lg px-2 md:px-4
      "
        >
          <img src="/header/bag.svg" className="h-4 w-4 md:h-6 md:w-6" />{" "}
          {/* Adjusting icon size */}
          <div className="h-8 w-[0.5px] bg-black mx-1"></div>{" "}
          {/* Adjusted height for mobile */}
          <h2 className="text-xs md:text-sm lg:text-base">Cart</h2>{" "}
          {/* Adjusted text size */}
        </button>
      </div>
    </div>
  );
};

export default Header;
