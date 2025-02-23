import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-6 relative font-['Poppins']"
      style={{ backgroundImage: "url('../assets/about.jpg')" }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Card Overlaying the Background */}
      <div className="relative bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl max-w-4xl w-full text-center font-['Merriweather']">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-6 tracking-wide font-['Montserrat']">
          Your Career, Your Future
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed font-['Roboto']">
          Discover opportunities that match your skills and ambitions. Whether you're 
          a fresher looking to step into the industry or a seasoned expert, we connect 
          you with the right employers effortlessly.
        </p>

        <h2 className="text-2xl font-semibold text-blue-600 mb-4 font-['Playfair Display']">
          Why Choose Us?
        </h2>
        <ul className="text-gray-800 font-medium text-lg space-y-3 text-left md:text-center">
          <li>✔ Smart job recommendations tailored for you.</li>
          <li>✔ Real-time job alerts and instant applications.</li>
          <li>✔ Insights into salaries, industries, and career growth.</li>
          <li>✔ Build your network and advance your career.</li>
        </ul>

        <div className="flex justify-center mt-6">
          <Link
            to="/jobs"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-800 transition font-['Lora']"
          >
            Explore Jobs Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
