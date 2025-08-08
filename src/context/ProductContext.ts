import { createContext, useContext } from "react";
import type { Product } from "@/modules/Products";
import type { ProductTypeFilter } from "@/modules/Products";
import { useState } from "react";

interface ProductContextType {

  products: Product[];
  filteredProducts: Product[];
  loadProducts: () => void;
  selectedProducts: string[];
  selectProduct: (sku: string) => void;
  unselectProduct: (sku: string) => void;
  selectAllProducts: (productSkus: string[]) => void; 
  unselectAllProducts: () => void;
  isAnyProductSelected: boolean;
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: number;
  productsPerPage: number;
  setCurrentPage: (page: number) => void;
  setProductsPerPage: (count: number) => void;
  totalPages: number;
  paginatedProducts: Product[];
   productTypeFilter: ProductTypeFilter;
  setProductTypeFilter: React.Dispatch<React.SetStateAction<ProductTypeFilter>>;
  deleteSelectedProducts: () => void;
}
export function useProductFilters(): {
  productTypeFilter: ProductTypeFilter;
  setProductTypeFilter: React.Dispatch<React.SetStateAction<ProductTypeFilter>>;
} {
  const [productTypeFilter, setProductTypeFilter] = useState<ProductTypeFilter>("all");
  return { productTypeFilter, setProductTypeFilter };
}




const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export default ProductContext;
