import { useState, useEffect } from 'react';
import type { Product } from '@/modules/Products';
import type { ProductTypeFilter } from "@/modules/Products";

// const [productTypeFilter, setProductTypeFilter] = useState<ProductTypeFilter>("all");


// Hook for managing products data
export const useProductsData = (): { products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>; loadProducts: () => void; } => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, setProducts, loadProducts };
};

// Hook for managing product selection
export const useProductSelection = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const selectProduct = (sku: string) => {
    setSelectedProducts(prev => 
      prev.includes(sku) ? prev : [...prev, sku]
    );
  };

  const unselectProduct = (sku: string) => {
    setSelectedProducts(prev => prev.filter(item => item !== sku));
  };

  const selectAllProducts = (productSkus: string[]) => {
    setSelectedProducts(productSkus);
  };

  const unselectAllProducts = () => {
    setSelectedProducts([]);
  };

  const isAnyProductSelected = selectedProducts.length > 0;

  return {
    selectedProducts,
    selectProduct,
    unselectProduct,
    selectAllProducts,
    unselectAllProducts,
    isAnyProductSelected,
    setSelectedProducts
  };
};

// Hook for managing pagination
export const useProductPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  return {
    currentPage,
    productsPerPage,
    setCurrentPage,
    setProductsPerPage
  };
};

// Hook for managing filters
export const useProductFilters = () => {
 const [productTypeFilter, setProductTypeFilter] = useState<ProductTypeFilter>("all");

  return {
    productTypeFilter,
    setProductTypeFilter
  };
};

// Hook for filtering and pagination logic
export const useProductLogic = (
  products: Product[],
  productTypeFilter: string,
  currentPage: number,
  productsPerPage: number
) => {
  // Filter products based on type
  const filteredProducts = products.filter(product => {
    return productTypeFilter === 'all' || product.type === productTypeFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    filteredProducts,
    totalPages,
    paginatedProducts
  };
};