import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import ProductForm from "./pages/AddProductForm";
import { ProductProvider } from "./context/ProductPageProvider";
import EditProduct from "./pages/EditProduct";
import Onboarding from "./pages/Onboarding";
import CustomSkeleton from "./components/Skeletal";

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
  },
  {
    path: "/onboarding",
    element: <Onboarding/>

  },
  {
    path: "/skeleton",
    element: <CustomSkeleton/>
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
