import axios from "axios";
import { useState, useEffect } from "react";
import Search from "./components/search/search";

const Landing = () => {
  const [data, setData] = useState<any>(null); // Using `any` for the data state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<any>("http://localhost:5000/api/home"); // Using `any` for the response
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="w-full py-2">
        <Search />
      </div>
      <div className="relative">
        <img
          src={data?.imageUrl}
          alt="New Arrival"
          className="w-full  min-h-56 object-cover"
        />
        <div className="absolute inset-0 flex items-center flex-col gap-4 justify-center text-black text-center p-4 md:p-8">
          <div className="bg-white bg-opacity-70 p-4 rounded-lg">
            <h1 className="text-xl md:text-3xl font-light font-poppins pb-1">
              Explore our new Arrival
            </h1>
            <h2 className="text-md md:text-2xl font-semibold">
              {data?.mostPopularToy?.productName} !!
            </h2>
          </div>
          <button className="relative bg-[#FCE1E4] px-6 py-2 rounded-full font-poppins font-regular group hover:bg-white transition duration-300">
            <span className="relative z-10 text-sm md:text-base">
              EXPLORE NOW!
            </span>
            <span className="absolute left-0 right-0 top-3/4 h-[2px] mx-10 bg-black transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
