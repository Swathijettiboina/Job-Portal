import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      
      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 px-6">
        
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src="https://assets-v2.lottiefiles.com/a/d07c305c-117f-11ee-b58d-d7baacc402de/OXV1AtPqup.gif" 
            alt="Find Your Dream Job" 
            className="w-3/4 md:w-2/3 rounded-lg shadow-lg mt-10"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800">
            Find Your Dream Job Now!
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Explore thousands of job opportunities and kickstart your career today.
          </p>
          <button className="mt-6 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">
            Get Started
          </button>
        </div>

      </div>
    </>
  );
};

export default Home;
