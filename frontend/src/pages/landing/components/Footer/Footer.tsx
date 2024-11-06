const Footer = () => {
  return (
    <div className="w-full flex-col justify-center items-center gap-12 flex py-5">
      <div className="font-poppins font-extralight text-center text-6xl">
        toy.ai
      </div>
      <div className="flex font-poppins items-center justify-around w-full font-light">
        <h1>HOME</h1>
        <h1>ABOUT</h1>
        <h2>CONTACT</h2>
      </div>
      <div className="flex font-poppins items-center justify-around w-full font-light text-gray-500">
        <p>Privacy policy</p>
        <p>Terms and Conditions</p>
      </div>
    </div>
  );
};

export default Footer;
