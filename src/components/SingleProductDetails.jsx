/* eslint-disable react/prop-types */

const SingleProductDetails = ({ singleProduct = {}, setShowSingleProduct }) => {
  console.log(singleProduct);
  return (
    <aside className="w-[300px] sm:w-[400px] h-full flex flex-col fixed bg-white top-[48px] sm:top-[66px] right-0 border border-black rounded-lg fade-enter-done">
      <div className="flex justify-between  items-center p-6">
        <h2 className="font-medium text-xl ">Detail</h2>{" "}
        <div onClick={() => setShowSingleProduct(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-6 w-6 text-black-500 cursor-pointer animate-pulse"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 ">
        <img
          className=" w-4/5 h-full rounded-lg"
          src={singleProduct.images[0] || "https://i.imgur.com/cHddUCu.jpeg"}
        />
        <p className="flex flex-col items-center p-4">
          <span className=" font-medium text-2xl mb-4">
            ${singleProduct?.price}
          </span>
          <span className=" font-medium text-md">{singleProduct?.title}</span>
          <span className=" font-light text-sm">
            {singleProduct?.description}
          </span>
        </p>
      </div>
    </aside>
  );
};

export default SingleProductDetails;
