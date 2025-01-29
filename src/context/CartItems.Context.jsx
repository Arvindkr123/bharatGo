/* eslint-disable react/prop-types */

import { useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);

  const openShowCartHandler = () => {
    setShowCart(true);
  };
  const closeShowCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartContext.Provider
      value={{ showCart, openShowCartHandler, closeShowCartHandler }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
