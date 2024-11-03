import { useState } from "react";

const Buttons = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  console.log(currentPath);
  return (
    <div className="bg-primary-gray p-2 rounded-full flex justify-around w-full gap-5 font-semibold">
      <button
        className={
          currentPath === "/"
            ? "bg-[#ffffff] text-black  rounded-full px-6 py-1"
            : "rounded-full px-6 py-1"
        }
        onClick={() => {
          setCurrentPath("/buy");
          window.location.pathname = "/";
        }}
      >
        BUY
      </button>
      <button
        className={
          currentPath === "/sell"
            ? "bg-[#ffffff] text-black  rounded-full px-6 py-1"
            : "rounded-full px-6 py-1"
        }
        onClick={() => {
          setCurrentPath("/sell");
          window.location.pathname = "/sell";
        }}
      >
        SELL
      </button>
    </div>
  );
};

export default Buttons;
