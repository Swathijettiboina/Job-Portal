import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    location: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSelectUserType = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!userType) {
      setError('Please select a user type before signing up.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      const apiUrl =
        userType === 'recruiter'
          ? 'http://localhost:5000/recruiter'
          : 'http://localhost:5000/jobseeker';

      const response = await axios.post(apiUrl, { ...formData, userType });
      console.log('Response:', response.data);
      alert('User created successfully!');
      navigate('/main'); // Redirect after successful signup
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'There was an error signing up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        
        {/* Left Side - User Type Selection */}
        <div className="flex flex-col items-center justify-center w-1/3 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Select User Type</h2>
          <div
            onClick={() => handleSelectUserType('jobSeeker')}
            className={`cursor-pointer w-32 h-32 bg-gray-100 rounded-lg relative transition-all duration-300 mb-6 ${
              userType === 'jobSeeker' ? 'border-4 border-blue-500' : ''
            }`}
          >
            <img
              src="https://empower-prod.s3.ap-south-1.amazonaws.com/movement/series/65/1597326671998446.jpg"
              alt="Job Seeker"
              className="object-cover w-full h-full rounded-lg"
            />
            <div
              className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-xl font-semibold transition-all duration-300 ${
                userType === 'jobSeeker' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Job Seeker
            </div>
          </div>

          <div
            onClick={() => handleSelectUserType('recruiter')}
            className={`cursor-pointer w-32 h-32 bg-gray-100 rounded-lg relative transition-all duration-300 ${
              userType === 'recruiter' ? 'border-4 border-green-500' : ''
            }`}
          >
            <img
              src="https://image.freepik.com/free-vector/illustration-vector-graphic-cartoon-character-hiring_516790-23.jpg"
              alt="Recruiter"
              className="object-cover w-full h-full rounded-lg"
            />
            <div
              className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-xl font-semibold transition-all duration-300 ${
                userType === 'recruiter' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Recruiter
            </div>
          </div>
        </div>

        {/* Right Side - Form Fields */}
        <div className="w-2/3 p-6">
          <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>

              {userType === 'recruiter' && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your company name"
                    />
                  </div>
                </>
              )}

              <button onClick={()=>{handleSubmit(e)}}
                type="submit"
                className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
