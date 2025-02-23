import React, { useState } from "react";

const filtersData = {
  experience: ["Fresher", "0-1 year", "1-3 years", "3-5 years", "5+ years"],
  jobType: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"],
  locationType: ["On-site", "Remote", "Hybrid"],
  industry: ["IT", "Finance", "Healthcare", "Marketing", "Education"],
  skills: ["Java", "Python", "React", "AWS", "SQL"],
  location: ["Delhi / NCR", "Hyderabad", "Gurugram", "Noida", "Bengaluru", "Chennai"],
};

function JobFilters({ onApplyFilters }) {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prev) => {
      const updatedCategory = prev[category] ? [...prev[category]] : [];
      if (updatedCategory.includes(value)) {
        return { ...prev, [category]: updatedCategory.filter((v) => v !== value) };
      } else {
        return { ...prev, [category]: [...updatedCategory, value] };
      }
    });
  };

  return (
    <div className="p-6 border rounded-xl shadow-lg bg-white w-80">
      <h2 className="text-xl font-bold text-center text-blue-700">Filter Jobs</h2>
      <hr className="my-4 border-t-2 border-gray-300" />

      {/* Filters */}
      {Object.entries(filtersData).map(([category, options]) => (
        <div key={category} className="mb-6">
          <h3 className="text-md font-semibold mb-3 text-blue-600 uppercase border-b pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters[category]?.includes(option) || false}
                  onChange={() => handleCheckboxChange(category, option)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => onApplyFilters(selectedFilters)}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default JobFilters;
