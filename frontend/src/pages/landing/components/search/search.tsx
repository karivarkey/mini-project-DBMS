const Search = () => {
  return (
    <div className="w-full flex justify-center items-center gap-10">
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-1 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300 rounded-full text-left items-center transition-all duration-300 ease-in-out"
        />
      </div>
      <button className="px-4  bg-secondary-gray  rounded-full hover:bg-[#a1a1a1] flex gap-3 items-center text-black font-poppins font-light transition-all duration-300 ease-in-out">
        <p>Filters</p>
        <div className="bg-white w-[1.5px] h-10"></div>

        <img src="/landing/filter.svg" alt="asdas" />
      </button>
    </div>
  );
};

export default Search;
