import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";

// Define a Toy interface to describe the shape of each toy object
interface Toy {
  _id: string;
  productName: string;
  manufacturer: {
    _id: string;
  };
  price: number;
  category: {
    type: string;
    features: string[];
  };
  ageGroup: number[];
  stockLeft: number;
  popularity: {
    views: number;
    purchases: number;
    _id: string;
  };
  __v: number;
}

const Search = () => {
  const [toys, setToys] = useState<Toy[]>([]);
  const [filteredToys, setFilteredToys] = useState<Toy[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false); // Toggle filter dropdown

  useEffect(() => {
    const fetchToys = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Toy[]>(`${import.meta.env.VITE_BACKEND_URL}/api/toys`);
        setToys(response.data);
        setFilteredToys(response.data);
      } catch (error) {
        console.error("Error fetching toys:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchToys();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm === "") {
        setFilteredToys(toys);
      } else {
        const searchResults = toys.filter((toy) =>
          toy.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredToys(searchResults);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, toys]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredToys(toys);
  };

  // Toggle the filter dropdown visibility
  const toggleFilters = () => setShowFilters(!showFilters);

  // Sort function based on filter selection
  const applyFilter = (filterType: string) => {
    let sortedToys = [...filteredToys];
    switch (filterType) {
      case "Price: High to Low":
        sortedToys.sort((a, b) => b.price - a.price);
        break;
      case "Price: Low to High":
        sortedToys.sort((a, b) => a.price - b.price);
        break;
      case "Newest Arrivals":
        sortedToys.sort((a, b) => b.__v - a.__v); // Assuming __v can represent recent additions
        break;
      case "Top Rated":
        sortedToys.sort((a, b) => b.popularity.views - a.popularity.views);
        break;
      default:
        break;
    }
    setFilteredToys(sortedToys);
    setShowFilters(false); // Close the dropdown after applying the filter
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-0">
      <div className="flex items-center justify-center w-full gap-3 relative">
        <input
          type="text"
          placeholder="Search"
          className="w-1/3 px-4 py-1 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300 rounded-full text-left items-center transition-all duration-300 ease-in-out"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
        <button
          onClick={toggleFilters}
          className="px-4 bg-secondary-gray rounded-full hover:bg-[#a1a1a1] flex gap-3 items-center text-black font-poppins font-light transition-all duration-300 ease-in-out"
        >
          <p>Filters</p>
          <div className="bg-white w-[1.5px] h-10"></div>
          <img src="/landing/filter.svg" alt="Filter" />
        </button>

        {/* Filter Dropdown */}
        {showFilters && (
          <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48 py-2 z-10">
            <button
              onClick={() => applyFilter("Price: High to Low")}
              className="block w-full px-4 py-2 text-left text-[#000000] hover:bg-[#FCE1E4]"
            >
              Price: High to Low
            </button>
            <button
              onClick={() => applyFilter("Price: Low to High")}
              className="block w-full px-4 py-2 text-left text-[#000000] hover:bg-[#FCE1E4]"
            >
              Price: Low to High
            </button>
            <button
              onClick={() => applyFilter("Newest Arrivals")}
              className="block w-full px-4 py-2 text-left text-[#000000] hover:bg-[#FCE1E4]"
            >
              Newest Arrivals
            </button>
            <button
              onClick={() => applyFilter("Top Rated")}
              className="block w-full px-4 py-2 text-left text-[#101010] hover:bg-[#FCE1E4]"
            >
              Top Rated
            </button>
          </div>
        )}
      </div>

      {/* Display loading, results, or empty message */}
      <div className="relative lg:w-1/3 w-full">
        {loading ? (
          <div className="absolute w-full bg-white shadow-lg rounded-lg p-4">
            <p>Loading toys...</p>
          </div>
        ) : filteredToys.length > 0 && searchTerm ? (
          <ul className="absolute w-full bg-white shadow-lg rounded-lg p-4 max-h-60 overflow-y-auto z-30">
            {filteredToys.map((toy) => (
              <li key={toy._id} className="border-b py-2">
                {toy.productName}
              </li>
            ))}
          </ul>
        ) : searchTerm ? (
          <div className="absolute w-full bg-white shadow-lg rounded-lg p-4">
            <p>No toys found.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
