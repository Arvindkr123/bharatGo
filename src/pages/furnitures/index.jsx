import { motion } from "framer-motion";
import { useState } from "react";
import SingleProductDetails from "../../components/SingleProductDetails";
import useGetProductsByCategory from "../../hooks/useGetProductsByCategory";

const Furnitures = () => {
  const [showSingleProduct, setShowSingleProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, products } = useGetProductsByCategory(3);

  const handleSearchChange = (e) =>
    setSearchQuery(e.target.value.toLowerCase());

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  const showSingleProductDetailsHandler = (product) => {
    setSelectedProduct(product);
    setShowSingleProduct(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid justify-center items-center">
        <p className="text-center my-5">Home</p>
        <input
          type="text"
          className="w-[200px] mx-auto px-3 py-3 outline-none border hover:border-1 rounded"
          placeholder="Search a product"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {filteredProducts?.map((item) => (
            <motion.div
              key={item?.id}
              initial={{ x: "10%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween", stiffness: 50, damping: 20 }}
            >
              <div className="Card bg-white cursor-pointer w-56 h-60 rounded-lg active:scale-110 transition ease duration-75">
                <figure className="relative mb-2 w-full h-4/5">
                  <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2">
                    {item?.category?.name}
                  </span>
                  <img
                    onClick={() => showSingleProductDetailsHandler(item)}
                    className="w-full h-full object-cover rounded-lg"
                    src={item.images[0] || "https://i.imgur.com/1twoaDy.jpeg"}
                    alt={item?.title || "Product Image"}
                  />
                  <button className="absolute m-2 top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-6 text-black"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </figure>
                <p className="flex justify-between">
                  <span className="text-sm font-light">{item?.title}</span>
                  <span className="text-lg font-medium">{item?.price}$</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {showSingleProduct && selectedProduct && (
        <SingleProductDetails
          singleProduct={selectedProduct}
          setShowSingleProduct={setShowSingleProduct}
        />
      )}
    </>
  );
};

export default Furnitures;
