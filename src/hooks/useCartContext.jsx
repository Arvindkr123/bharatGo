import { useContext } from "react";
import { CartContext } from "../context/CartItems.Context";

const useCartContext = () => {
  return useContext(CartContext);
};

export default useCartContext;
