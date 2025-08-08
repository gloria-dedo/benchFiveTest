// import furni1Image from "@/assets/furni3.jpg";
import { useProducts } from "@/context";
import { useState, useEffect } from "react";
// import { ProductType } from "@/modules/Products";
import type { Product } from "@/modules/Products";
import notFound from "@/assets/notFound.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function ProductCard() {

   const { 
    paginatedProducts, 
    selectedProducts, 
    selectProduct, 
    unselectProduct 
  } = useProducts();

  const handleCheckboxChange = (sku: string, isChecked: boolean) => {
    if (isChecked) {
      selectProduct(sku);
    } else {
      unselectProduct(sku);
    }
  };

  // const handleProductNameClick = (imageUrl: string, productName: string) => {
  //   const newWindow = window.open('', '_blank', 'width=800,height=600');
  //   if (newWindow) {
  //     newWindow.document.write(`
  //       <html>
  //         <head><title>${productName}</title></head>
  //         <body style="margin:0;padding:20px;display:flex;flex-direction:column;align-items:center;background:#f5f5f5;">
  //           <h1>${productName}</h1>
  //           <img src="${imageUrl}" alt="${productName}" style="max-width:90%;border-radius:8px;" />
  //         </body>
  //       </html>
  //     `);
  //   }
  // };

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  if (products.length === 0) {
    return (
      <div className="text-center flex flex-col justify-center items-center font-inter mt-28">
        <img src ={notFound} className = "w-full lg:w-[25%] "></img>
        <p className="text-xl text-black font-normal font-inter">You have no products.</p>
        <p className="text-gray-500">Let's fix that! Go ahead and add your  product!</p>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {paginatedProducts.map((product) => {
  const isSelected = selectedProducts.includes(product.sku);
  return (
    <div className={`rounded-sm font-syne border transition-all duration-200 ${
      isSelected ? ' border-gray-100' : 'bg-[#F5F5F4] border-gray-200 px-4 py-4'
    }`} key={product.sku}>
      <div className="relative">
        <input
          type="checkbox"
          className="absolute top-2 left-2 z-10 w-4 h-4 accent-black"
          checked={isSelected}
          onChange={(e) => handleCheckboxChange(product.sku, e.target.checked)}
        />
        <img
          src={product.image}
          className="w-full h-[300px] object-cover rounded-sm"
          alt="Product"
        />
      </div>
      <div className="w-full flex flex-col gap-3 px-2 py-2">
        <div>
          <p className="text-sm text-gray-700">#{product.sku || "N/A"}</p>
           <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-lg font-medium text-left hover:text-black hover:underline cursor-pointer">
                      {product.name || "N/A"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 flex justify-center items-center">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-semibold leading-none">
                        {product.name}
                      </h3>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-md object-cover"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
          <p className="text-sm text-gray-700">{product.description || "N/A"}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700 font-inter">
            {product.type === "furniture"
              ? `${product.height} x ${product.width} x ${product.length}`
              : product.type === "book"
              ? `${product.weight} KG`
              : product.type === "dvd"
              ? `${product.size} MB`
              : "N/A"}
          </p>
          <p className="text-lg font-inter font-medium">$ {product.price || "N/A"}</p>
        </div>
      </div>
    </div>
  );
})}

    </div>
  );
}
