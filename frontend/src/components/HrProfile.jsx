import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HrProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    industry: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    jobPosts: [],
    premium: false,
  });
  const [newJob, setNewJob] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recruiter details (mock API call for now)
    axios.get('http://localhost:5000/recruiter/profile')
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => console.error('Error fetching recruiter data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addJobPost = () => {
    if (newJob.trim()) {
      setFormData(prev => ({
        ...prev,
        jobPosts: [...prev.jobPosts, { title: newJob, premium: false }],
      }));
      setNewJob('');
    }
  };

  const togglePremium = () => {
    setFormData(prev => ({ ...prev, premium: !prev.premium }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">HR Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-gray-700">Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} readOnly className="w-full p-2 border rounded-lg" />
        </div>
        <div className="space-y-4">
          <label className="block text-gray-700">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="space-y-4">
          <label className="block text-gray-700">Industry</label>
          <input type="text" name="industry" value={formData.industry} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="space-y-4">
          <label className="block text-gray-700">Website</label>
          <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="space-y-4">
          <label className="block text-gray-700">Contact Email</label>
          <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="space-y-4">
          <label className="block text-gray-700">Contact Phone</label>
          <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 justify-center items-center">
        <button onClick={addJobPost} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Job
        </button>
      </div>

      <button onClick={togglePremium} className={`mt-6 w-full py-3 rounded-lg text-white ${formData.premium ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}>{formData.premium ? 'Premium Active' : 'Activate Premium'}</button>
    </div>
  );
};

export default HrProfile;
