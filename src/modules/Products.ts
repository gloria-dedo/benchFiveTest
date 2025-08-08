
export type ProductType = "dvd" | "book" | "furniture";

interface BaseProduct {
  id: string;
  sku: string;
  description: string;
  name: string;
  price: number;
  image: string;
  type: ProductType;
  
}

export interface DVDProduct extends BaseProduct {
  type: "dvd";
  size: number; 
}

export interface BookProduct extends BaseProduct {
  type: "book";
  weight: number; 
}

export interface FurnitureProduct extends BaseProduct {
  type: "furniture";
  height: number;
  width: number;
  length: number;
}

export type Product = DVDProduct | BookProduct | FurnitureProduct;
export type ProductTypeFilter = ProductType | "all";
