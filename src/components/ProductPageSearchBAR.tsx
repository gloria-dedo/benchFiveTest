import { useState } from "react";
import { Search } from "lucide-react";

export default function ProductPageSearchBar({ onSearch }: { onSearch: (query: string) => void }){
     const [query, setQuery] = useState('');
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
            const newQuery = event.target.value;
            setQuery(newQuery);
            onSearch(newQuery); //pass query to parent component
        }
    return(
                  <div className="md:flex hidden bg-white border border-gray-300 px-2 md:px-4 py-2 gap-2 rounded-full w-[30%]  focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-black">
    <div className=" w-4 md:w-8 h-4 md:h-8 bg-primary-color text-white flex justify-center items-center rounded-full">
        <Search className=" text-black w-2 md:w-4 h-2 md:h-4" />
    </div>
    <input
        type="text"
        placeholder="search Products .."
        value={query}
        onChange={handleInputChange}
        className="outline-none text-sm flex-1"
    /> 
</div>
    )
}