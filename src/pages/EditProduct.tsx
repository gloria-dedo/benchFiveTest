import Navbar from "@/components/Navbar";
import { Save, CloudUpload } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import uploadImageToCloudinary from "@/utils/cloudinaryUpload";
import toast, { Toaster } from "react-hot-toast";
import { useProducts } from "@/context/ProductContext"; 

export default function EditProduct() {
  const navigate = useNavigate();
  const { sku } = useParams(); 
  const { products, loadProducts } = useProducts();
  
  const [productType, setProductType] = useState("dvd");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    category: "dvd",
    size: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    description: "",
    image: "",
  });

  // Load product data when component mounts
  useEffect(() => {
    if (sku && products.length > 0) {
      const productToEdit = products.find(product => product.sku === sku);
      if (productToEdit) {
        setFormData({
          productName: productToEdit.name,
          productPrice: productToEdit.price.toString(),
          category: productToEdit.type,
          size: productToEdit.type === 'dvd' ? productToEdit.size.toString() : "",
          height: productToEdit.type === 'furniture' ? productToEdit.height.toString() : "",
          width: productToEdit.type === 'furniture' ? productToEdit.width.toString() : "",
          length: productToEdit.type === 'furniture' ? productToEdit.length.toString() : "",
          weight: productToEdit.type === 'book' ? productToEdit.weight.toString() : "",
          description: productToEdit.description,
          image: productToEdit.image,
        });
        setProductType(productToEdit.type);
      } else {
        toast.error("Product not found!");
        navigate("/");
      }
    }
  }, [sku, products, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const toastId = toast.loading("Uploading image...");
      setIsLoading(true);

      try {
        const url = await uploadImageToCloudinary(file);
        setFormData((prev) => ({ ...prev, image: url }));
        toast.success("Image uploaded successfully!", { id: toastId });
      } catch (error) {
        toast.error("Image upload failed. Please try again.", { id: toastId });
        console.error("Image upload error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload a product image first.");
      return;
    }

    const toastId = toast.loading("Updating product...");
    setIsLoading(true);

    try {
      const { productName, productPrice, category, ...rest } = formData;

     
      const updatedProductData = {
        ...rest,
        sku, 
        name: productName,
        price: parseFloat(productPrice),
        type: category,
      };

      // Get existing products and update the specific one
      const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const updatedProducts = existingProducts.map((product: any) =>
        product.sku === sku ? updatedProductData : product
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      console.log("Product updated in local storage:", updatedProductData);
      toast.success("Product updated successfully!", { id: toastId });

      // Reload products in context
      loadProducts();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update product. Please try again.", { id: toastId });
      console.error("Failed to update product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setProductType(formData.category);
  }, [formData.category]);

  return (
    <section>
      <Navbar />
      <Toaster />
      <form className="px-8 font-inter space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3 justify-between mt-12">
          <p className="text-lg font-syne font-semibold">Edit Product</p>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex gap-2 py-2 text-sm font-inter rounded-full justify-center items-center bg-black text-white/90 w-full md:w-[180px] cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save className="w-3 h-3 md:h-4 md:w-4" />
              Update
            </button>
            <Link
              to="/"
              className="flex gap-2 font-inter text-sm py-2 rounded-full justify-center items-center border border-black w-full md:w-[180px] cursor-pointer"
            >
              Cancel
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full justify-center gap-8 ">
          <div className="w-full lg:w-[40%] flex flex-col space-y-4">
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                name="productName"
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 text-sm border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:border-black"
                required
                value={formData.productName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Product Price($) <span className="text-red-500">*</span>
              </label>
              <input
                name="productPrice"
                type="number"
                placeholder="Enter the cost of your product"
                className="w-full text-sm px-4 py-2 border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:border-black"
                required
                value={formData.productPrice}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="w-full">
              <label className="block font-medium text-gray-500 text-sm mb-2">
                Select Product Type <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                className="w-full px-4 py-2 text-sm border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:border-black"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="dvd">DVD</option>
                <option value="furniture">Furniture</option>
                <option value="book">Book</option>
              </select>
            </div>
            
            {productType === "dvd" && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Product Size(MB) <span className="text-red-500">*</span>
                </label>
                <input
                  name="size"
                  type="number"
                  placeholder="Enter DVD size"
                  className="w-full px-4 py-2 text-sm border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:border-black"
                  required
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </div>
            )}
            
            {productType === "furniture" && (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Furniture Height (CM) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="height"
                    type="number"
                    placeholder="Enter furniture height"
                    className="w-full px-4 py-2 text-sm border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:border-black"
                    required
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Furniture Width (CM) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="width"
                    type="number"
                    placeholder="Enter furniture width"
                    className="w-full px-4 py-2 text-sm border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:border-black"
                    required
                    value={formData.width}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    Furniture Length (CM) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="length"
                    type="number"
                    placeholder="Enter furniture length"
                    className="w-full px-4 py-2 text-sm border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:border-black"
                    required
                    value={formData.length}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            
            {productType === "book" && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Book Weight (KG) <span className="text-red-500">*</span>
                </label>
                <input
                  name="weight"
                  type="number"
                  placeholder="Enter book weight"
                  className="w-full px-4 py-2 text-sm border bg-gray-100 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:border-black"
                  required
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-sm text-gray-500 font-medium">
                Product Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Give a brief description about the product"
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring focus:border-black/25"
                rows={4}
                required
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="lg:w-[40%] w-full">
            <div className="space-y-1">
              <label className="text-sm text-gray-500 font-medium">
                Upload Product Image <span className="text-red-500">*</span>
              </label>
              <label className="flex flex-col items-center justify-center w-full h-88 p-6 gap-2 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Product Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <CloudUpload className="text-black" />
                    <p className="text-black font-medium text-sm text-center">
                      Click to upload or
                      <span className="text-gray-600">
                        {" "}
                        drag and drop your image
                      </span>
                    </p>
                  </>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}