import Buttons from "./components/buttons/buttons";
const Header = () => {
  return (
    <div className="w-full flex justify-between items-center px-8 pt-2">
      <div className="flex gap-4 items-center ">
        <div>
          <img src="/header/hamburger.svg" alt="" />
        </div>
        <div>
          <h1 className="font-poppins text-3xl font-extralight ">toy.ai</h1>
        </div>
      </div>
      <div>
        <Buttons />
      </div>
      <div>
        <button className="bg-primary-gray p-2 rounded-full px-4 flex items-center justify-center gap-2">
          <img src="/header/bag.svg" />

          <div className="h-10 w-[0.5px] bg-black mx-1"></div>
          <h2>Cart</h2>
        </button>
      </div>
    </div>
  );
};

export default Header;
