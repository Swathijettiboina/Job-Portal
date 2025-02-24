import React from "react";
import { Briefcase, Globe, Linkedin, Info } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="max-w-lg mx-auto border border-gray-200 rounded-xl shadow-lg p-6 bg-white transition-transform transform hover:scale-105 duration-300">
      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Briefcase size={22} className="text-blue-500" />
        {job.job_title}
      </h2>

      {/* Company Name with Link */}
      <p className="text-lg text-gray-700 mt-1">
        🏢{" "}
        {/* <a
          href={job.company_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:underline"
        >
          {job.company_name}
        </a> */}
        {job.company_name}
      </p>

      {/* Job Type (Remote / Location) */}
      <div className="mt-3">
        {job.is_remote ? (
          <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-lg">
            🌍 Remote 
          </span>
        ) : (
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-lg">
            📍 On-site {job.job_location}
          </span>
        )}
      </div>

      {/* Posted Date */}
      <p className="text-gray-500 text-sm mt-3">📅 Posted on: {job.posted_date}</p>

      {/* Company Links */}
      <div className="mt-4 flex gap-4">
        {job.company_url && (
          <a
            href={job.company_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 font-medium hover:underline"
          >
            <Globe size={18} className="mr-2" />Visit Website
          </a>
        )}

        {job.company_linkedin_url && (
          <a
            href={job.company_linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-700 font-medium hover:underline"
          >
            <Linkedin size={18} className="mr-2" /> LinkedIn
          </a>
        )}
      </div>

      {/* Buttons Section */}
      <div className="mt-5 flex gap-3">
      <Link
  to={`/jobs/${job.job_id}`}
  className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
>
  <Info size={18} />
  View Full Details
</Link>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Apply Now 🚀
        </a>
      </div>
    </div>
  );
};

export default JobCard;
