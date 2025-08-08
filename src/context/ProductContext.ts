import { createContext, useContext } from 'react';
import type { Product, ProductType } from '@/modules/Products';


interface ProductContextType {
 
  products: Product[];
  filteredProducts: Product[];

  selectedProducts: string[];
  isAnyProductSelected: boolean;
  

  currentPage: number;
  productsPerPage: number;
  totalPages: number;
  paginatedProducts: Product[];
  

  productTypeFilter: string;
  
 
  loadProducts: () => void;
  selectProduct: (sku: string) => void;
  unselectProduct: (sku: string) => void;
  selectAllProducts: () => void;
  unselectAllProducts: () => void;
  deleteSelectedProducts: () => void;
  setCurrentPage: (page: number) => void;
  setProductsPerPage: (count: number) => void;
  setProductTypeFilter: (type: string) => void;
}


const ProductContext = createContext<ProductContextType | undefined>(undefined);


export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export default ProductContext;