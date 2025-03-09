// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/common/customization';
// const BASE_URL + /common/customization';   IN PRODUCTION

function TermAndCondition() {
  const [termsData, setTermsData] = useState({
    _id: '',
    term_desc_1: '',
    term_desc_2: '',
    termList: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');

  // Fetch terms and conditions
  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setTermsData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching terms:', error);
      setError('Failed to fetch terms and conditions');
      setLoading(false);
      
      // Removed the code that creates default terms on 404
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTermsData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(`${API_URL}/${termsData._id}`, {
        term_desc_1: termsData.term_desc_1,
        term_desc_2: termsData.term_desc_2
      });
      
      if (response.data.success) {
        setSuccess('Changes saved successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      setError('Failed to save changes');
      setTimeout(() => setError(''), 3000);
    }
  };

  const addTerm = async () => {
    if (!newTerm.trim()) {
      setError('Term cannot be empty');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/${termsData._id}/term`, {
        term: newTerm,
        conditions: []
      });
      
      if (response.data.success) {
        setTermsData(response.data.data);
        setNewTerm('');
        setSuccess('Term added successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error adding term:', error);
      setError('Failed to add term');
      setTimeout(() => setError(''), 3000);
    }
  };

  const removeTerm = async (termId) => {
    try {
      const response = await axios.delete(`${API_URL}/${termsData._id}/term/${termId}`);
      
      if (response.data.success) {
        setTermsData(response.data.data);
        setSuccess('Term removed successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error removing term:', error);
      setError('Failed to remove term');
      setTimeout(() => setError(''), 3000);
    }
  };

  const addCondition = async () => {
    if (!selectedTermId) {
      setError('Please select a term first');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    if (!newCondition.trim()) {
      setError('Condition cannot be empty');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    try {
      const response = await axios.post(
        `${API_URL}/${termsData._id}/term/${selectedTermId}/condition`,
        { condition: newCondition }
      );
      
      if (response.data.success) {
        setTermsData(response.data.data);
        setNewCondition('');
        setSuccess('Condition added successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error adding condition:', error);
      setError('Failed to add condition');
      setTimeout(() => setError(''), 3000);
    }
  };

  const removeCondition = async (termId, conditionIndex) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${termsData._id}/term/${termId}/condition/${conditionIndex}`
      );
      
      if (response.data.success) {
        setTermsData(response.data.data);
        setSuccess('Condition removed successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error removing condition:', error);
      setError('Failed to remove condition');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Terms and Conditions Manager</h1>
      
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
        {error}
      </div>}
      
      {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
        {success}
      </div>}
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">General Descriptions</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description 1:</label>
          <textarea
            name="term_desc_1"
            value={termsData.term_desc_1}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description 2:</label>
          <textarea
            name="term_desc_2"
            value={termsData.term_desc_2}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button 
          onClick={saveChanges} 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
        >
          Save Changes
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Terms List</h2>
        
        <div className="space-y-4">
          {termsData.termList.map((item, index) => (
            <div key={item._id} className="bg-gray-50 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{item.term}</h3>
                <button 
                  onClick={() => removeTerm(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition duration-200"
                >
                  Remove
                </button>
              </div>
              
              <ul className="mb-4 pl-5 space-y-1">
                {item.conditions.map((condition, cIndex) => (
                  <li key={cIndex} className="flex justify-between items-center">
                    <span>{condition}</span>
                    <button 
                      onClick={() => removeCondition(item._id, cIndex)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => setSelectedTermId(item._id)}
                className={`w-full py-2 px-4 rounded-md transition duration-200 text-sm ${
                  selectedTermId === item._id 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                }`}
              >
                {selectedTermId === item._id ? 'Selected' : 'Select to Add Condition'}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-gray-50 rounded-md p-4">
          <h3 className="text-lg font-medium mb-3">Add New Term</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter new term"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button 
              onClick={addTerm}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200"
            >
              Add Term
            </button>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-50 rounded-md p-4">
          <h3 className="text-lg font-medium mb-3">Add Condition to Selected Term</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter new condition"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
              disabled={!selectedTermId}
              className={`flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                !selectedTermId ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <button 
              onClick={addCondition} 
              disabled={!selectedTermId}
              className={`py-2 px-4 rounded-md transition duration-200 ${
                !selectedTermId 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Add Condition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermAndCondition;