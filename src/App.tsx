import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import ProductForm from "./pages/AddProductForm";
import { ProductProvider } from "./context/ProductPageProvider";
import EditProduct from "./pages/EditProduct";

const benchFiveTestRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-product",
    element: <ProductForm />,
  },
  {
    path: "/edit-product/:sku",
    element: <EditProduct />,
  }
]);

function App() {
  return (
    <>
    <ProductProvider>
      <RouterProvider router={benchFiveTestRoutes} />
      </ProductProvider>
    </>
  );
}

export default App;
