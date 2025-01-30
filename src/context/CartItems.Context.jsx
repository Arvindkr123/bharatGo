/* eslint-disable react/prop-types */
import { useState, useCallback, createContext } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [userOrders, setUserOrders] = useState([]);

  const addOrder = useCallback((currentDate, totalProductPrice, cartItems) => {
    // console.log(currentDate, totalProductPrice, cartItems);
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

  const checkExistedItemInCart = useCallback(
    (item) => cartItems.some((c) => c.id === item.id),
    [cartItems]
  );

  const removeSingleItemInCart = useCallback(
    (item) => {
      setCartItems((prev) => prev.filter((c) => c.id !== item.id));
    },
    [setCartItems]
  );

  const addCartFromContextHandler = useCallback(
    (item) => {
      const oldCartItems = [...cartItems];
      const findExistItem = oldCartItems.find((c) => c.id === item.id);

      if (findExistItem) {
        setCartItems((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
        );
      } else {
        setCartItems((prev) => [...prev, { ...item, qty: 1 }]);
      }
    },
    [cartItems]
  );

  const removeCartItemQuantityFromContextHandler = useCallback(
    (item) => {
      setCartItems((prev) => {
        const findExistItem = prev.find((c) => c.id === item.id);
        if (findExistItem) {
          if (findExistItem.qty > 1) {
            // Reduce quantity if greater than 1
            return prev.map((c) =>
              c.id === item.id ? { ...c, qty: c.qty - 1 } : c
            );
          } else {
            // Remove item from cart if quantity is 1
            return prev.filter((c) => c.id !== item.id);
          }
        }
        return prev; // Return the previous state if item not found
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems]
  );

  const openShowCartHandler = useCallback(() => {
    setShowCart(true);
  }, []);

  const closeShowCartHandler = useCallback(() => {
    setShowCart(false);
  }, []);

  const calculateTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        showCart,
        setCartItems,
        openShowCartHandler,
        closeShowCartHandler,
        addCartFromContextHandler,
        cartItems,
        calculateTotalPrice,
        removeCartItemQuantityFromContextHandler,
        checkExistedItemInCart,
        removeSingleItemInCart,
        userOrders,
        addOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
