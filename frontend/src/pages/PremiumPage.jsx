import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import PremiumContent from "./PremiumContent";
import NewPremiumUser from "./NewPremiumUser";

const PremiumPage = () => {
  const [userExists, setUserExists] = useState(null);


  useEffect(() => {
   

    if (!userId) {
      navigate("/no-access"); // Redirect if no ID is found
      return;
    }

    // Check if the user exists in PostgreSQL
    axios
      .get(`http://localhost:5000/check-user'`)
      .then((response) => {
        setUserExists(response.data.exists);
      })
      .catch((error) => {
        console.error("Error checking user:", error);
        setUserExists(false);
      });
  }, []);

  if (userExists === null) {
    return <div>Loading...</div>; // Show loading state while checking
  }

  return (
    <Routes>
      {userExists ? (
        <Route path="*" element={<PremiumContent />} />
      ) : (
        <Route path="*" element={<NewPremiumUser />} />
      )}
    </Routes>
  );
};

export default PremiumPage;
