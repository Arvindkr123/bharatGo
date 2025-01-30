import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectRoute from "./components/ProtectRoute";

// Lazy-loaded components for better performance
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home"));
import MyAccount from "./pages/myaccount/index";
import MyOrder from "./pages/myorder/index";
import Toys from "./pages/toys/Toys";
import Furnitures from "./pages/furnitures/index";
import Electronics from "./pages/elctronics/index";
import Clothes from "./pages/clothes/index";
import Loader from "./components/Loader";
import NotFoundPage from "./components/NotFound";
import SingleOrder from "./pages/myorder/SingleOrder";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/myAccount"
          element={
            <ProtectRoute>
              <Layout>
                <MyAccount />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/myOrders"
          element={
            <ProtectRoute>
              <Layout>
                <MyOrder />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/myOrders/:id"
          element={
            <ProtectRoute>
              <Layout>
                <SingleOrder />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/toys"
          element={
            <ProtectRoute>
              <Layout>
                <Toys />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/furnitures"
          element={
            <ProtectRoute>
              <Layout>
                <Furnitures />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/electronics"
          element={
            <ProtectRoute>
              <Layout>
                <Electronics />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/clothes"
          element={
            <ProtectRoute>
              <Layout>
                <Clothes />
              </Layout>
            </ProtectRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Fallback for undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
