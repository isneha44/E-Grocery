import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import ProductPage from "./pages/ProductPage";
import DashboardPage from "./pages/DashboardPage";
import OrderPage from "./pages/OrderPage";
import Payment from "./pages/Payment";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./pages/CartPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/product",
          element: <ProductPage />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: <>Checkout</>,
        },
        {
          path: "/order",
          element: <OrderPage />,
        },
      ],
    },
  ]);

  return (
    <div>
      <ToastContainer />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
