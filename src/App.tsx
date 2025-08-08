import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import ProductForm from "./pages/AddProductForm";

const benchFiveTestRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-product",
    element: <ProductForm />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={benchFiveTestRoutes} />
    </>
  );
}

export default App;
