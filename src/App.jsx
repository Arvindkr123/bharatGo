import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectRoute from "./components/ProtectRoute";

// Lazy-loaded components
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home"));
const MyAccount = lazy(() => import("./pages/myaccount/index"));
const MyOrder = lazy(() => import("./pages/myorder/index"));
const Toys = lazy(() => import("./pages/toys/Toys"));
const Furnitures = lazy(() => import("./pages/furnitures/index"));
const Electronics = lazy(() => import("./pages/elctronics/index"));
const Clothes = lazy(() => import("./pages/clothes/index"));
const Loader = lazy(() => import("./components/Loader"));
const NotFoundPage = lazy(() => import("./components/NotFound"));
const SingleOrder = lazy(() => import("./pages/myorder/SingleOrder"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
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

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
