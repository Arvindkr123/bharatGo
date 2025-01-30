/* eslint-disable react/prop-types */

import useCartContext from "../../hooks/useCartContext";
import { useNavigate, useParams } from "react-router-dom";

// Reusable SVG Icon Component
const Icon = ({ path, className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    onClick={onClick}
  >
    <path d={path} />
  </svg>
);

const SingleOrder = () => {
  const { userOrders } = useCartContext();
  const navigate = useNavigate();
  const { id } = useParams();

  // Find the specific order by ID
  const selectedOrder = userOrders[id];
  console.log(selectedOrder);

  // Placeholder image logic
  const getImageUrl = (images) =>
    images[0] || "https://i.imgur.com/mp3rUty.jpeg";

  return (
    <div className="grid place-content-center place-items-center justify-center">
      {/* Header with Back Button */}
      <div className="border-2 my-5 text-xl font-bold flex-1 flex items-center gap-x-56 p-4">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <Icon
            path="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            className="h-6 w-6 text-black cursor-pointer"
          />
        </div>
        <p>My Order</p>
      </div>

      {/* Order Details */}
      {selectedOrder ? (
        <div className="w-[400px] rounded p-5 fade-in-enter">
          {/* Order Date */}
          <p className="my-2">
            <span className="font-semibold">Order Date:</span>{" "}
            {new Date(selectedOrder.currentDate).toLocaleString()}
          </p>

          {/* Total Products */}
          <p className="my-2">
            <span className="font-semibold">Total Products:</span>{" "}
            {selectedOrder.products}
          </p>

          {/* Total Price */}
          <p className="my-2">
            <span className="font-semibold">Total Price:</span> $
            {selectedOrder.totalProductPrice}
          </p>

          {/* List of Items in the Order */}
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Items:</h3>
            {selectedOrder?.cartItems?.length > 0 ? (
              <ul className="list-disc ml-5">
                {selectedOrder.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="single-item flex p-3 items-center gap-3 border-b border-b-gray-400"
                  >
                    <img
                      className="w-20 h-20 rounded-md"
                      src={getImageUrl(item.images)}
                      alt={item.title || "Cart item"}
                    />
                    <div className="flex-1">
                      <p className="text-sm">{item?.title}</p>
                      <p className="font-medium">${item?.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="bg-gray-300 w-10 flex justify-center rounded-md">
                          <p className="select-none">{item?.qty}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <p>No items in this order.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Order not found.</p>
      )}
    </div>
  );
};

export default SingleOrder;
