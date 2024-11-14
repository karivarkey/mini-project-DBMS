import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Search from "./components/search/search";
import Card from "./components/cards/cards";
import AiBubble from "./components/AI/ai";
import Footer from "./components/Footer/Footer";
import Cart from "../../components/cart/cart";
import { Toy } from "../../types/Toy";

interface Data {
  toy: Toy[];
  imageUrl: string;
  mostPopularToy: Toy;
}

const Landing = () => {
  const [data, setData] = useState<Data | null>(null);
  const [toys, setToys] = useState<Toy[] | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null); // Create a ref for the cards section

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Data | null>(
          `${import.meta.env.VITE_BACKEND_URL}/api/home`
        );
        setData(res.data);

        const resToys = await axios.get<Toy[] | null>(
          `${import.meta.env.VITE_BACKEND_URL}/api/toys`
        );
        console.log(resToys.data);
        setToys(resToys.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Scroll function
  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <AiBubble />
      <div className="w-full py-2">
        <Search />
      </div>

      <div className="relative">
        <img
          src={data?.imageUrl}
          alt="New Arrival"
          className="w-full min-h-56 object-cover"
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
          <button
            onClick={scrollToCards} // Add onClick to scroll to cards section
            className="relative bg-[#FCE1E4] px-6 py-2 rounded-full font-poppins font-regular group hover:bg-white transition duration-300"
          >
            <span className="relative z-10 text-sm md:text-base">
              EXPLORE NOW!
            </span>
            <span className="absolute left-0 right-0 top-3/4 h-[2px] mx-10 bg-black transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
          </button>
        </div>
      </div>

      <div className="text-center font-poppins font-semibold text-3xl py-10">
        New Arrivals
      </div>
      
      <div className="z-50">
        <Cart />
      </div>

      {/* Cards Section */}
      <div
        ref={cardsRef} // Attach the ref to the cards section
        className="flex flex-wrap justify-around gap-5 lg:gap-20 lg:px-10 px-10 items-center z-0"
      >
        {toys?.map((toy: Toy) => (
          <div key={toy._id} className="flex-1 min-w-[30%] lg:min-w-[20%]">
            <Card toy={toy} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
