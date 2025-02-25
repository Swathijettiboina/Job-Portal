import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || ""); // Update input when URL changes
  }, [searchParams]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = searchTerm.trim();
      if (query) {
        setSearchParams({ search: query });
      } else {
        navigate("/jobs"); // Reset to all jobs
      }
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search jobs..."
        className="w-full max-w-lg p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchComponent;
