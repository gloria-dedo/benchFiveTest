import ProductPagination from "./Pagination";
// import DateFilter from "./DateFilter";
import ProductTypeFilter from "./ProductFilter";
import { useProducts } from "@/context";
// import ProductPageSearchBar from "./ProductPageSearchBAR";
import { Plus, Trash , Edit} from "lucide-react";
import { Link } from "react-router";
export default function ProductNav(){
     const { 
    selectedProducts, 
    isAnyProductSelected, 
    deleteSelectedProducts,
    products 
  } = useProducts();

  const handleMassDelete = () => {
  deleteSelectedProducts();
};

//   const handleMassDelete = () => {
//     if (selectedProducts.length === 0) return;
    
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${selectedProducts.length} selected product(s)?`
//     );
    
//     if (confirmDelete) {
//       deleteSelectedProducts();
//       alert(`${selectedProducts.length} product(s) deleted successfully!`);
//     }
//   };

  const getSelectedProductForEdit = () => {
    if (selectedProducts.length === 1) {
      return products.find(product => product.sku === selectedProducts[0]);
    }
    return null;
  };

  const selectedProductForEdit = getSelectedProductForEdit();
    return(
        <nav className="flex flex-col gap-3 bg-[#F5F5F4] px-8 border-b py-2  md:flex-row items-start md:items-center justify-between">
            <div className="flex gap-3 items-center justify-between">
                <ProductPagination/>
            {/* <DateFilter/>  */}
            <ProductTypeFilter/> 
            </div>
             
            {/* <ProductPageSearchBar onSearch={() => {}}/>  */}

                <div className="flex gap-3">
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