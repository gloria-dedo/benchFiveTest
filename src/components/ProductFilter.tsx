import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import type { ProductTypeFilter } from "@/modules/Products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProducts } from "@/context";

export default function ProductTypeFilter() {
  const { productTypeFilter, setProductTypeFilter } = useProducts();

  // Handle filter change
//  const handleFilterChange = (value: ProductTypeFilter) => {
//   setProductTypeFilter(value);
// };
const handleFilterChange = (value: string) => {
  if (["all", "dvd", "book", "furniture"].includes(value)) {
    setProductTypeFilter(value as ProductTypeFilter);
  } else {
    console.warn("Unexpected filter value:", value);
  }
};

  //dsiplay map
  const filterDisplayNames: Record<ProductTypeFilter, string> = {
  all: "all",
  dvd: "dvd",
  book: "book",
  furniture: "furniture",
};

const getFilterDisplayText = () => {
  return filterDisplayNames[productTypeFilter];
};


  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2 text-sm py-5 shadow-none border-black/8">
            Filter: {getFilterDisplayText()}
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter Products</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={productTypeFilter} 
            onValueChange={handleFilterChange}
          >
            <DropdownMenuRadioItem value="all">All Products</DropdownMenuRadioItem>
            {/* <DropdownMenuRadioItem value="dvd">DVD-disc</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="book">Book</DropdownMenuRadioItem> */}
            <DropdownMenuRadioItem value="furniture">Furniture</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}