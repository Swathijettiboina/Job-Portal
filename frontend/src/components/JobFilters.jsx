import React, { useEffect, useState } from "react";
import { Briefcase, MapPin, Building, Search } from "lucide-react";
import { motion } from "framer-motion";

const staticFilters = {
  experience: ["Fresher", "0-1 year", "1-3 years", "3-5 years", "5+ years"],
  jobType: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"],
  industry: [
    "IT Services and IT Consulting",
    "Finance",
    "Healthcare",
    "Marketing",
    "Education",
    "Software Development",
    "Electric Power Generation",
    "Real Estate",
    "Pharmaceutical Manufacturing",
  ],
};

const JobFilters = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experience: "",
    industry: "",
    remote: false,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs");
        const data = await response.json();
        if (response.ok) {
          setJobs(data.jobs);
          setFilteredJobs(data.jobs);
        } else {
          console.error("Error fetching jobs:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    let filtered = jobs.filter((job) => {
      const jobLocation = job.job_location || "";
      const jobType = job.job_type || "";
      const experienceLevel = job.experience_level || "";
      const companyIndustry = job.company_industry || "";

      return (
        (!filters.location || jobLocation.includes(filters.location)) &&
        (!filters.jobType || jobType === filters.jobType) &&
        (!filters.experience || experienceLevel === filters.experience) &&
        (!filters.industry || companyIndustry.includes(filters.industry)) &&
        (!filters.remote || job.is_remote === filters.remote)
      );
    });

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Filters Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-blue-700">
          <Search size={22} className="mr-2" />
          Filter Jobs
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold text-gray-700">Location:</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:outline-blue-500"
            >
              <option value="">All</option>
              {[...new Set(jobs.map((job) => job.job_location).filter(Boolean))].map(
                (location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Job Type:</label>
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:outline-blue-500"
            >
              <option value="">All</option>
              {staticFilters.jobType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Experience:</label>
            <select
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:outline-blue-500"
            >
              <option value="">All</option>
              {staticFilters.experience.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Industry:</label>
            <select
              name="industry"
              value={filters.industry}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:outline-blue-500"
            >
              <option value="">All</option>
              {staticFilters.industry.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              name="remote"
              checked={filters.remote}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <label className="font-semibold text-gray-700">Remote Jobs Only</label>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <motion.div layout className="space-y-4 mt-6">
        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-bold flex items-center gap-2 text-blue-700">
                <Briefcase size={18} /> {job.job_title}
              </h3>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin size={16} /> {job.job_location}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <Building size={16} /> {job.company_name}
              </p>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default JobFilters;
