import { ChevronDown } from "lucide-react"
export default function ProductPagination(){
    return(
        <div className="flex items-center gap-2 font-syne">
            <p className="text-sm  font-medium">All Products</p>
            <p className="gap-2 border items-center md:flex hidden py-1 px-2 rounded-md border-black text-sm font-medium">10<ChevronDown className="h-4 w-4"/></p>
        </div>
    )
}