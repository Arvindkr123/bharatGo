import { useState, useCallback } from "react";

const useAddMyOrders = () => {
  const [userOrders, setUserOrders] = useState([
    {
      currentDate: Date.now(),
      products: 0,
      totalProductPrice: 0,
      cartItems: [],
    },
  ]);

  const addOrder = useCallback((currentDate, totalProductPrice, cartItems) => {
    console.log(currentDate, totalProductPrice, cartItems);
    setUserOrders((prevOrders) => [
      ...prevOrders,
      {
        currentDate,
        products: cartItems.length,
        totalProductPrice,
        cartItems,
      },
    ]);
  }, []);

  return { userOrders, addOrder };
};

export default useAddMyOrders;
