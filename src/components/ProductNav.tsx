import ProductPagination from "./Pagination";
// import DateFilter from "./DateFilter";
import ProductTypeFilter from "./ProductFilter";
import { useProducts } from "@/context";
// import ProductPageSearchBar from "./ProductPageSearchBAR";
import { Plus, Trash , Edit} from "lucide-react";
import { useState, useEffect} from "react";
import { Link } from "react-router";
export default function ProductNav(){
 const [isScrolled, setIsScrolled] = useState(false);

 useEffect(() => {
    const handleScroll = () => {
  
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


     const { 
    selectedProducts, 
    isAnyProductSelected, 
    deleteSelectedProducts,
    products 
  } = useProducts();

  const handleMassDelete = () => {
  deleteSelectedProducts();
};


  const getSelectedProductForEdit = () => {
    if (selectedProducts.length === 1) {
      return products.find(product => product.sku === selectedProducts[0]);
    }
    return null;
  };

  const selectedProductForEdit = getSelectedProductForEdit();
    return(
        <nav
      className={`fixed top-14 md:top-16 items-center w-full lg:h-14 h-30 bottom-0 z-30 flex flex-col gap-3 bg-white px-8 py-2 md:flex-row justify-between transition-shadow duration-200 ${
        isScrolled ? 'shadow-md border-b border-gray-200' : ' '
      }`}
    >
            <div className="flex gap-3 items-center justify-between lg:justify-start w-full lg:w-xl">
                <ProductPagination/>
            {/* <DateFilter/>  */}
            <ProductTypeFilter/> 
            </div>
             
            {/* <ProductPageSearchBar onSearch={() => {}}/>  */}

                <div className="flex gap-3 justify-between lg:justify-end w-full lg:w-xl items-center">
                    {!isAnyProductSelected ? (
          <Link to="/add-product" className="text-sm items-center rounded-md flex gap-2 font-syne bg-black text-white px-4 py-2">
            <Plus className="h-4 w-4" />Add Product
          </Link>
        ) : selectedProducts.length === 1 ? (
          <Link to={`/edit-product/${selectedProductForEdit?.sku}`} className="text-sm items-center rounded-md flex gap-2 font-syne bg-blue-800 text-white px-4 py-2">
            <Edit className="h-4 w-4" />Edit Product
          </Link>
        ) : (
          <button disabled className="text-sm items-center rounded-md flex gap-2 font-syne bg-gray-400 text-white px-4 py-2 cursor-not-allowed">
            <Edit className="h-4 w-4" />Edit Product
          </button>
        )}

        <button 
          onClick={handleMassDelete}
          disabled={!isAnyProductSelected}
          className={`text-sm flex gap-2 font-syne rounded-md border px-4 py-2 items-center cursor-pointer ${
            isAnyProductSelected 
              ? 'border-red-500 text-red-500 hover:bg-red-50' 
              : 'border-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Trash className="h-4 w-4" />
          Mass Delete {isAnyProductSelected && `(${selectedProducts.length})`}
        </button>
                </div>
            
        </nav>
    )
}