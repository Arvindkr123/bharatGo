import { useNavigate } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";

const CartItems = () => {
  const {
    closeShowCartHandler,
    cartItems,
    calculateTotalPrice,
    addCartFromContextHandler,
    removeCartItemQuantityFromContextHandler,
    removeSingleItemInCart,
    setCartItems,
    addOrder,
  } = useCartContext();

  const navigate = useNavigate();

  const increaseQuantityHandler = (item) => {
    addCartFromContextHandler(item);
  };

  const decreaseQuantityHandler = (item) => {
    removeCartItemQuantityFromContextHandler(item);
  };

  const addMyOrderHandlerFromCart = () => {
    if (cartItems.length > 0) {
      addOrder(Date.now(), calculateTotalPrice(), cartItems); // Add order to the list
      setCartItems([]); // Clear the cart
      navigate("/myOrders"); // Navigate to orders page
    }
  };

  return (
    <div className="w-[300px] sm:w-[400px] h-full flex flex-col fixed bg-white top-[50px] sm:top-[80px] right-0 border border-black rounded-lg z-50">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="font-medium text-xl">My Order</h2>
        <button
          onClick={closeShowCartHandler}
          aria-label="Close cart"
          className="p-2 bg-black text-white rounded cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <main className="overflow-y-auto flex-1 pb-20">
        {cartItems?.length > 0 ? (
          cartItems.map((cartItem, index) => (
            <div
              key={index}
              className="single-cartItem flex p-3 items-center gap-3 border-b border-b-gray-200"
            >
              <img
                className="w-20 h-20 rounded-md"
                src={cartItem.images[0] || "https://i.imgur.com/mp3rUty.jpeg"}
                alt={cartItem.title || "Cart item"}
              />
              <div className="flex-1">
                <p className="text-sm">{cartItem?.title}</p>
                <p className="font-medium">${cartItem?.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQuantityHandler(cartItem)}
                    aria-label="Decrease quantity"
                    className="cursor-pointer bg-red-200 rounded-lg p-1 w-8 h-8 flex justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-black"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="bg-gray-300 w-10 flex justify-center rounded-md">
                    <p className="select-none">{cartItem?.qty}</p>
                  </div>
                  <button
                    onClick={() => increaseQuantityHandler(cartItem)}
                    aria-label="Increase quantity"
                    className="cursor-pointer bg-green-200 rounded-lg p-1 w-8 h-8 flex justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-black"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeSingleItemInCart(cartItem)}
                aria-label="Remove item"
                className="bg-black text-white rounded p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">Your cart is empty</div>
        )}
      </main>
      <div className="w-full sm:w-[400px] border-t bg-white sticky bottom-0 p-3">
        <div className="flex justify-between mb-3">
          <p className="font-bold">Total</p>
          <p className="font-bold">${calculateTotalPrice()}</p>
        </div>
        <button
          onClick={addMyOrderHandlerFromCart}
          className="w-full rounded bg-black text-white p-2 hover:bg-black/90"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItems;
