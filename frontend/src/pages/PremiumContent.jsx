import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PremiumContent = () => {
  const [status, setStatus] = useState({ isPremium: false, plan: "", message: "Checking premium status..." });
  const [searchParams] = useSearchParams();
  const number = searchParams.get("number"); // Get phone number from URL

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!number) {
        setStatus({ isPremium: false, message: "No phone number provided." });
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/haspremium/${number}`);
        const data = await res.json();
        setStatus(data);
      } catch (error) {
        console.error("Error fetching premium status:", error);
        setStatus({ isPremium: false, message: "Failed to check premium status." });
      }
    };

    checkPremiumStatus();
  }, [number]);

  return (
    <div>
      <h1>Premium Status</h1>
      {status.isPremium ? (
        <p>✅ You have a {status.plan} premium subscription!</p>
      ) : (
        <p>❌ {status.message}</p>
      )}
    </div>
  );
};

export default PremiumContent;
