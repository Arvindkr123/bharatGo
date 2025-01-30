import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useGetProductsByCategory = (categoryId = 1) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/products/?categoryId=${categoryId}`,
          {
            signal: controller.signal,
          }
        );
        setProducts(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError(err.message || "An error occurred");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort(); // Cleanup function to cancel request
  }, [categoryId]);

  return { loading, products, error };
};

export default useGetProductsByCategory;
