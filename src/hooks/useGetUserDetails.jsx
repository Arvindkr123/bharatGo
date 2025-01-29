import { useEffect, useState } from "react";
import { auth, firebaseDb } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const useGetUserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUserDetails = async (user) => {
    try {
      const docRef = doc(firebaseDb, "Users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("User not exists in Firestore");
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(err);
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
          setUser(null);
          setLoading(false);
        }
      },
      (err) => {
        console.error("Auth state listener error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
};

export default useGetUserDetails;
