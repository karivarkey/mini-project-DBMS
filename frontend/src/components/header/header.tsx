import Buttons from "./components/buttons/buttons";
const Header = () => {
  return (
    <div className="w-full flex justify-between items-center px-2">
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
      <div>PROFILE STUFF</div>
    </div>
  );
};

export default Header;
