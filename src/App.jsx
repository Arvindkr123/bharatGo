import { Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
