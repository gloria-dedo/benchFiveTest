import React, { useEffect } from 'react';
// import type { Product } from '@/modules/Products';
import ProductContext from './ProductContext';
import { 
  useProductsData, 
  useProductSelection,
  useProductPagination, 
  useProductFilters, 
  useProductLogic 
} from './ProductCom';



export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { products, setProducts, loadProducts } = useProductsData();
  const selectionHook = useProductSelection();
  const paginationHook = useProductPagination();
  const filtersHook = useProductFilters();

  // Get computed values
  const { filteredProducts, totalPages, paginatedProducts } = useProductLogic(
    products,
    filtersHook.productTypeFilter,
    paginationHook.currentPage,
    paginationHook.productsPerPage
  );

  // Delete selected products
  const deleteSelectedProducts = () => {
    const updatedProducts = products.filter(
      product => !selectionHook.selectedProducts.includes(product.sku)
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    selectionHook.setSelectedProducts([]);
  };


  useEffect(() => {
    paginationHook.setCurrentPage(1);
  }, [filtersHook.productTypeFilter]);

  // Create context value
  const value = {
    
    products,
    filteredProducts,
    loadProducts,
    ...selectionHook,
    ...paginationHook,
    totalPages,
    paginatedProducts,
    ...filtersHook,
    deleteSelectedProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};