import ProductPagination from "./Pagination";
import DateFilter from "./DateFilter";
import ProductTypeFilter from "./ProductFilter";
// import ProductPageSearchBar from "./ProductPageSearchBAR";
import { Plus, Trash } from "lucide-react";
import { Link } from "react-router";
export default function ProductNav(){
    return(
        <nav className="flex flex-col gap-3 bg-[#f3faff] px-8 border-b py-2  md:flex-row items-start md:items-center justify-between">
            <div className="flex gap-3 items-center justify-between">
                <ProductPagination/>
            <DateFilter/> 
            <ProductTypeFilter/> 
            </div>
             
            {/* <ProductPageSearchBar onSearch={() => {}}/>  */}

                <div className="flex gap-3">
                    <Link to= "/add-product" className="text-sm items-center rounded-md flex text-sm gap-2 font-syne rounded-full  bg-black text-white px-4 py-2"><Plus className="h-4 w-4"/>Add Product</Link>
                    <button className="text-sm flex gap-2 font-syne rounded-md  border border-black text-black px-4 py-2 items-center cursor-pointer"><Trash className="h-4 w-4"/>Mass Delete  </button>
                </div>
            
        </nav>
    )
}