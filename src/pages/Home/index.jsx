import { useState, useEffect } from "react";
import { auth, firebaseDb } from "./../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCurrentUserDetails(user);
      } else {
        navigate("/login");
      }
    });

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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {userDetails?.name || "User"}!</h1>
      <p>Email: {userDetails?.email || "N/A"}</p>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Home;
