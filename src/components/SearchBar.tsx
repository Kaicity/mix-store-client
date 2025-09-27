import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="hidden sm:flex items-center w-[600px] relative">
      <input
        id="search"
        placeholder="Bạn đang tìm gì..."
        className="w-full rounded-md pl-3 pr-10 py-2 text-sm outline-none border border-gray-300 focus:border-black bg-white text-black"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBar;
