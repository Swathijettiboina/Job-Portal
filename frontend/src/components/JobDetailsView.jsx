import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, Globe, Linkedin, MapPin, Calendar, Building, Users, Info } from "lucide-react";

// Function to format job description
const formatJobDescription = (description) => {
  if (!description) return "No description available.";

  // Convert **bold** text to JSX <strong>
  description = description.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert ✅ to list items
  description = description.replace(/✅ (.*?)\n/g, "<li>✅ $1</li>");
  
  // Convert * bullet points to lists
  description = description.replace(/\* (.*?)\n/g, "<li>• $1</li>");

  // Convert new lines into proper paragraph breaks
  description = description.replace(/\n/g, "<br />");

  return description;
};

const JobDetailsView = () => {
  const { job_id } = useParams(); 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${job_id}`);
        const data = await response.json();
        if (response.ok) {
          setJob(data.job);
        } else {
          console.error("Error fetching job details:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  if (loading) return <p className="text-center text-gray-500">Loading job details... </p>;
  if (!job) return <p className="text-center text-red-500">Job not found!</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
      {/* Job Title */}
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <Briefcase size={26} className="text-blue-500" /> {job.job_title}
      </h1>

      {/* Company Details */}
      <div className="mt-4 flex items-center gap-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Building size={22} className="text-gray-600" /> {job.company_name}
        </h3>
        {job.company_url && (
          <a
            href={job.company_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center gap-1"
          >
            <Globe size={18} /> Website
          </a>
        )}
        {job.company_linkedin_url && (
          <a
            href={job.company_linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
        )}
      </div>

      {/* Job Details */}
      <div className="mt-4 space-y-2">
        <p className="text-gray-700 flex items-center gap-2">
          <MapPin size={18} className="text-gray-600" />
          <strong>Location:</strong> {job.is_remote ? "Remote" : job.job_location}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <Calendar size={18} className="text-gray-600" />
          <strong>Posted on:</strong> {new Date(job.posted_date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <Users size={18} className="text-gray-600" />
          <strong>Company Size:</strong> {job.company_employee_count || "Not specified"}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <Building size={18} className="text-gray-600" />
          <strong>Industry:</strong> {job.company_industry || "Not specified"}
        </p>
      </div>

      {/* Job Description */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Info size={22} className="text-blue-500" />
          Job Description
        </h3>
        <div
          className="text-gray-700 mt-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatJobDescription(job.job_description) }}
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-lg transition duration-300"
        >
          Apply Now 🚀
        </a>
        {job.company_url && (
          <a
            href={job.company_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-5 rounded-lg transition duration-300"
          >
            Visit Company
          </a>
        )}
      </div>
    </div>
  );
};

export default JobDetailsView;
