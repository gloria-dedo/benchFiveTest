import React, { useState } from "react";
import { Search } from "lucide-react";

export default function DashboardSearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); //pass query to parent component
  };

  return (
    <div className="md:flex hidden  bg-white/10 text-white border-none px-2 md:px-6 py-1 gap-2 rounded-full md:[30%] lg:w-[50%]  ">
      <div className=" w-4 md:w-8 h-4 md:h-8 bg-primary-color text-white flex justify-center items-center rounded-full">
        <Search className=" text-white w-2 md:w-4 h-2 md:h-4" />
      </div>
      <input
        type="text"
        placeholder="search dashboard .."
        value={query}
        onChange={handleInputChange}
        className="outline-none text-sm  w-full"
      />
    </div>
  );
}
