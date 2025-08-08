import furni1Image from "@/assets/furni3.jpg";
import { useState, useEffect } from "react";
// import { ProductType } from "@/modules/Products";
import type { Product } from "@/modules/Products";

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  if (products.length === 0) {
    return (
      <div className="text-center mt-12 font-inter">
        <p className="text-xl">No products found.</p>
        <p className="text-gray-500">Go ahead and add your first product!</p>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      {products.map((product) => (
        <div className="rounded-sm  font-syne bg-[#f3faff] border border-gray-200" key={product.sku}>
          <div className="relative">
            <input
              type="checkbox"
              className="absolute top-2 left-2 z-10 w-4 h-4 accent-black"
            />
            <img
              src={product.image}
              className="w-full h-[300px] object-cover rounded-t-sm"
              alt="Product"
            />
          </div>

          <div className="w-full flex flex-col gap-3 px-2 py-2">
            <div>
              <p className="text-sm text-gray-700">#{product.sku || "N/A"}</p>
              <p className="text-lg font-medium">{product.name || "N/A"}</p>
              <p className="text-sm text-gray-700">
                {product.description || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 font-inter">
                {product.type === "furniture"
                  ? `${product.height} x ${product.width} x ${product.length}`
                  : product.type === "book"
                  ? ` ${product.weight} KG`
                  : product.type === "dvd"
                  ? ` ${product.size} MB`
                  : "N/A"}
              </p>

              <p className="text-lg font-inter font-medium">$ {product.price || "N/A"} </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
