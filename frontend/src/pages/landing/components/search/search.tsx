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
    type: string; // This matches the "type" property in the category object
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
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch toys from the API when the component mounts
  useEffect(() => {
    const fetchToys = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get<Toy[]>(
          `${import.meta.env.VITE_BACKEND_URL}/api/toys`
        );
        setToys(response.data);
        setFilteredToys(response.data);
      } catch (error) {
        console.error("Error fetching toys:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchToys();
  }, []);

  // Fuzzy search through toys with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm === "") {
        setFilteredToys(toys); // Show all toys if search is empty
      } else {
        const searchResults = toys.filter((toy) =>
          toy.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredToys(searchResults);
      }
    }, 300); // Adjust debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, toys]);

  // Update search term based on user input
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Clear search term
  const clearSearch = () => {
    setSearchTerm("");
    setFilteredToys(toys); // Reset to all toys when cleared
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
        <button className="px-4 bg-secondary-gray rounded-full hover:bg-[#a1a1a1] flex gap-3 items-center text-black font-poppins font-light transition-all duration-300 ease-in-out">
          <p>Filters</p>
          <div className="bg-white w-[1.5px] h-10"></div>
          <img src="/landing/filter.svg" alt="Filter" />
        </button>
      </div>

      {/* Display loading, results, or empty message */}
      <div className="relative lg:w-1/3 w-full">
        {loading ? (
          <div className="absolute w-full bg-white shadow-lg rounded-lg p-4">
            <p>Loading toys...</p>
          </div>
        ) : filteredToys.length > 0 && searchTerm ? (
          <ul className="absolute w-full bg-white shadow-lg rounded-lg p-4 max-h-60 overflow-y-auto z-30 ">
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
