import { Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <>
      <Routes>
        <Route>
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
