import React, { useState } from "react";
import JobFilters from "../components/JobFilters";
import JobListing from "../components/JobListing";

function Jobs() {
  const [filters, setFilters] = useState({});

  const handleApplyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  return (
    <div className="flex p-4">
      <aside className="w-1/4 p-4 ">
        <JobFilters onApplyFilters={handleApplyFilters} />
      </aside>

      <main className="w-3/4 p-4">
        <JobListing filters={filters} />
      </main> 
    </div>
  );
}

export default Jobs;
