import React, { useState, useEffect } from "react";
import { Trash2, Plus, Save, Info } from 'lucide-react';

const API_URL = 'http://localhost:3000/common/customization';
// const API_URL = BASE_URL + /common/customization';   IN PRODUCTION

const PrivacyPolicyManager = () => {
    const [greeting, setGreeting] = useState("");
    const [privacyList, setPrivacyList] = useState([{ title: "", description: "" }]);

    useEffect(() => {
        fetch(`${API_URL}/privacy-policy`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setGreeting(data.greeting);
                    setPrivacyList(data.privacy_list);
                }
            });
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedList = [...privacyList];
        updatedList[index][field] = value;
        setPrivacyList(updatedList);
    };

    const addPrivacyItem = () => {
        setPrivacyList([...privacyList, { title: "", description: "" }]);
    };

    const removePrivacyItem = (index) => {
        const updatedList = privacyList.filter((_, i) => i !== index);
        setPrivacyList(updatedList);
    };

    const handleSubmit = async () => {
        await fetch(`${API_URL}/privacy-policy`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ greeting, privacy_list: privacyList }),
        });
    };
        return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <div className="mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy Editor</h1>
            <p className="text-gray-600">Create and customize your privacy policy</p>
          </div>
    
          {/* Greeting Section */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">Greeting</h2>
              <div className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                <Info size={16} />
              </div>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Enter a welcoming message for your privacy policy..."
              rows="3"
            />
          </div>
    
          {/* Privacy List Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Privacy Statements</h2>
              <button
                onClick={addPrivacyItem}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
    
            {privacyList.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No privacy statements added yet.</p>
                <button
                  onClick={addPrivacyItem}
                  className="mt-4 text-blue-500 hover:text-blue-700 transition"
                >
                  Add your first statement
                </button>
              </div>
            ) : (
              privacyList.map((item, index) => (
                <div 
                  key={index} 
                  className="mb-6 p-6 border rounded-lg relative bg-gray-50 hover:bg-white transition"
                >
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => removePrivacyItem(index)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statement Title
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      value={item.title}
                      onChange={(e) => handleInputChange(index, "title", e.target.value)}
                      placeholder="e.g., Data Collection, Cookies, Third-Party Services"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statement Description
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      value={item.description}
                      onChange={(e) => handleInputChange(index, "description", e.target.value)}
                      placeholder="Describe your privacy practices in detail..."
                      rows="4"
                    />
                  </div>
                  
                  <div className="mt-4 text-right text-xs text-gray-500">
                    Statement #{index + 1}
                  </div>
                </div>
              ))
            )}
          </div>
    
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
            >
              <Save size={16} /> Save Policy
            </button>
          </div>
        </div>
      );
    };
    
    export default PrivacyPolicyManager;
