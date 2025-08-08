import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/context";
import { useState } from "react";

export default function ProductPagination() {
  const { 
    currentPage, 
    totalPages, 
    productsPerPage, 
    filteredProducts,
    setCurrentPage, 
    setProductsPerPage 
  } = useProducts();

  const [showPerPageOptions, setShowPerPageOptions] = useState(false);

 
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle products per page change
  const handlePerPageChange = (count: number) => {
    setProductsPerPage(count);
    setShowPerPageOptions(false);
  };

 
  const startItem = (currentPage - 1) * productsPerPage + 1;
  const endItem = Math.min(currentPage * productsPerPage, filteredProducts.length);

  return (
    <div className="flex items-center gap-4 font-syne">
     
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">
          All Products ({filteredProducts.length})
        </p>
        
        {/* Products per page dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPerPageOptions(!showPerPageOptions)}
            className="gap-2 border items-center md:flex hidden py-1 px-2 rounded-md border-black text-sm font-medium"
          >
            {productsPerPage}
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showPerPageOptions && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[120px]">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  onClick={() => handlePerPageChange(count)}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                    productsPerPage === count ? 'bg-blue-50 font-medium' : ''
                  }`}
                >
                  {count} per page
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
         
          <p className="text-xs text-gray-600 hidden lg:block">
            Showing {startItem}-{endItem} of {filteredProducts.length}
          </p>
          
        
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1 rounded ${
              currentPage === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-black cursor-pointer'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Page numbers - simplified for mobile */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 3) {
                pageNum = i + 1;
              } else if (currentPage === 1) {
                pageNum = i + 1;
              } else if (currentPage === totalPages) {
                pageNum = totalPages - 2 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-2 py-1 text-sm rounded min-w-[24px] ${
                    currentPage === pageNum
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Show ... and last page if needed */}
            {totalPages > 3 && currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && <span className="text-gray-400 px-1">...</span>}
                <button
                  onClick={() => goToPage(totalPages)}
                  className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-1 rounded ${
              currentPage === totalPages 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-black cursor-pointer'
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}