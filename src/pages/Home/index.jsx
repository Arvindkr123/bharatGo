import { useState, useEffect } from "react";
import { auth, firebaseDb } from "./../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SingleProductDetails from "../../components/SingleProductDetails";

const Home = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSingleProduct, setShowSingleProduct] = useState(false);

  const fetchCurrentUserDetails = async (user) => {
    try {
      const docRef = doc(firebaseDb, "Users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User not exists in Firestore");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          fetchCurrentUserDetails(user);
        } else {
          navigate("/login");
        }
      },
      (error) => {
        console.error("Auth state listener error:", error);
      }
    );

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  const logoutHandler = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
        />
        <div className="cards grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item) => (
            <motion.div
              key={item}
              initial={{ x: "10%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween", stiffness: 50, damping: 20 }}
            >
              <div className="Card bg-white cursor-pointer w-56 h-60 rounded-lg  active:scale-110 transition ease duration-75">
                <figure className="relative mb-2 w-full h-4/5">
                  <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2">
                    Clothes
                  </span>
                  <img
                    onClick={() => setShowSingleProduct(true)}
                    className="w-full h-full object-cover rounded-lg"
                    src="https://i.imgur.com/1twoaDy.jpeg"
                    alt="Classic Red Pullover Hoodie"
                  />
                  <button className="absolute m-2 top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-6 w-6 text-black-500s"
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
                  <span className="text-sm font-light">
                    {" "}
                    Classic Red Pullover Hoodie
                  </span>
                  <span className="text-lg font-medium"> 10$</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {showSingleProduct && (
        <SingleProductDetails setShowSingleProduct={setShowSingleProduct} />
      )}
    </>
  );
};

export default Home;
