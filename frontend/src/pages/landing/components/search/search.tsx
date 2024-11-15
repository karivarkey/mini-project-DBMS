import { useState, useEffect, ChangeEvent } from "react";
import { Toy } from "../../../../types/Toy";

interface SearchProps {
  toys: Toy[];
  filteredToys: Toy[];
  setFilteredToys: React.Dispatch<React.SetStateAction<Toy[]>>;
}

const Search: React.FC<SearchProps> = ({
  toys,
  filteredToys,
  setFilteredToys,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Update filteredToys whenever search term changes
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
  }, [searchTerm, toys, setFilteredToys]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredToys(toys);
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  const applyFilter = (filterType: string) => {
    let sortedToys = [...filteredToys];

    switch (filterType) {
      case "Price: High to Low":
        sortedToys.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "Price: Low to High":
        sortedToys.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "Newest Arrivals":
        sortedToys.sort((a, b) => (b.__v ?? 0) - (a.__v ?? 0));
        break;
      case "Top Rated":
        sortedToys.sort(
          (a, b) => (b.popularity?.views ?? 0) - (a.popularity?.views ?? 0)
        );
        break;
      default:
        break;
    }
    setFilteredToys(sortedToys);
    setShowFilters(false);
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
    </div>
  );
};

export default Search;
