import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CartContextProvider from "./context/CartItems.Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/https://bharat-go-upce.vercel.app/home/">
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </BrowserRouter>
  </StrictMode>
);
