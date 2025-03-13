import React, { useEffect, useState } from "react";
import { FaEdit, FaFacebook, FaInstagram, FaTrash, FaWhatsapp, FaYoutube } from "react-icons/fa";
import axios from "axios";


const API_URL = 'http://localhost:3000/common/customization';
// const API_URL= BASE_URL + /common/customization';   IN PRODUCTION

const CustomeFooter = () => {
  const initialFormState = {
    domain: "",
    contactUs: { 
      phone: "", 
      email: "", 
      instaLink: "", 
      facebookLink: "", 
      youtubeLink: "", 
      whatsappLink: "" 
    },
    address: "",
    quicklinksAvailable: { 
      blog: false, 
      "our-story": false, 
      "privacy-policy": false, 
      term_and_condition: false 
    },
    copy_right_text: "© 2025 All Rights Reserved",
    footerBgColor: "#000000",
    footerTextColor: "#ffffff",
    available_payment_methods: null,
  };

  const [footers, setFooters] = useState([]);
  const [formData, setFormData] = useState({...initialFormState});
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchFooters();
  }, []);

  const fetchFooters = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/footer`);
      setFooters(res.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch footers: " + err.message);
      console.error("Error fetching footers:", err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value
        }
      }));
    } else if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        quicklinksAvailable: { 
          ...prev.quicklinksAvailable, 
          [name]: checked 
        }
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value 
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        available_payment_methods: file 
      }));
      
      // Create preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const resetForm = () => {
    setFormData({...initialFormState});
    setEditingId(null);
    setImagePreview(null);
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const data = new FormData();
      
      // Handle nested objects
      for (const [key, value] of Object.entries(formData)) {
        if (key === "contactUs") {
          for (const [contactKey, contactValue] of Object.entries(value)) {
            data.append(`contactUs[${contactKey}]`, contactValue || "");
          }
        } else if (key === "quicklinksAvailable") {
          for (const [linkKey, linkValue] of Object.entries(value)) {
            data.append(`quicklinksAvailable[${linkKey}]`, linkValue);
          }
        } else if (key === "available_payment_methods" && value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, value || "");
        }
      }

      if (editingId) {
        await axios.put(`${API_URL}/footer/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/footer`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      
      resetForm();
      fetchFooters();
    } catch (err) {
      setError("Operation failed: " + err.message);
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (footer) => {
    // Deep clone the footer to avoid reference issues
    const footerToEdit = JSON.parse(JSON.stringify(footer));
    setFormData(footerToEdit);
    setEditingId(footer._id);
    
    // If there's a payment methods image URL, set it for preview
    if (footer.available_payment_methods) {
      setImagePreview(
        typeof footer.available_payment_methods === 'string' 
          ? footer.available_payment_methods 
          : null
      );
    } else {
      setImagePreview(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this footer?")) {
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/footer/${id}`);
      fetchFooters();
    } catch (err) {
      setError("Delete operation failed: " + err.message);
      console.error("Error deleting footer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Custom Footer Management</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-3">{editingId ? "Edit Footer" : "Create New Footer"}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
              <input 
                type="text" 
                name="domain" 
                value={formData.domain} 
                onChange={handleInputChange} 
                placeholder="example.com" 
                required 
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="123 Main St, City, Country" 
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
          
          {/* Copyright Text */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
            <input 
              type="text" 
              name="copy_right_text" 
              value={formData.copy_right_text} 
              onChange={handleInputChange} 
              placeholder="© 2025 Company Name. All Rights Reserved." 
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
            />
            <p className="text-xs text-gray-500 mt-1">Use © for the copyright symbol</p>
          </div>
          
          {/* Contact Information */}
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Phone</label>
                <input 
                  type="text" 
                  name="contactUs.phone" 
                  value={formData.contactUs.phone} 
                  onChange={handleInputChange} 
                  placeholder="+1 (555) 123-4567" 
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="contactUs.email" 
                  value={formData.contactUs.email} 
                  onChange={handleInputChange} 
                  placeholder="contact@example.com" 
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Social Media Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Instagram</label>
                <input 
                  type="url" 
                  name="contactUs.instaLink" 
                  value={formData.contactUs.instaLink} 
                  onChange={handleInputChange} 
                  placeholder="https://instagram.com/username" 
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">Facebook</label>
                <input 
                  type="url" 
                  name="contactUs.facebookLink" 
                  value={formData.contactUs.facebookLink} 
                  onChange={handleInputChange} 
                  placeholder="https://facebook.com/username" 
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">YouTube</label>
                <input 
                  type="url" 
                  name="contactUs.youtubeLink" 
                  value={formData.contactUs.youtubeLink} 
                  onChange={handleInputChange} 
                  placeholder="https://youtube.com/c/channelname" 
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">WhatsApp</label>
                <input 
                  type="text" 
                  name="contactUs.whatsappLink" 
                  value={formData.contactUs.whatsappLink} 
                  onChange={handleInputChange} 
                  placeholder="https://wa.me/1234567890" 
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
            </div>
          </div>
          
          {/* Styling */}
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Footer Styling</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Background Color</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    name="footerBgColor" 
                    value={formData.footerBgColor} 
                    onChange={handleInputChange} 
                    className="p-1 border rounded h-10 w-16" 
                  />
                  <input
                    type="text"
                    name="footerBgColor"
                    value={formData.footerBgColor}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">Text Color</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    name="footerTextColor" 
                    value={formData.footerTextColor} 
                    onChange={handleInputChange} 
                    className="p-1 border rounded h-10 w-16" 
                  />
                  <input
                    type="text"
                    name="footerTextColor"
                    value={formData.footerTextColor}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Quick Links</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.keys(formData.quicklinksAvailable).map((key) => (
               <label key={key} className="flex items-center space-x-3 p-2 border rounded cursor-pointer">
               <div 
                 className={`relative w-12 h-6 rounded-full transition-all duration-300 
                   ${formData.quicklinksAvailable[key] ? 'bg-blue-600' : 'bg-gray-300'}`}
               >
                 <div 
                   className={`absolute top-1 w-4 h-4 rounded-full shadow-md transition-all duration-300 
                     ${formData.quicklinksAvailable[key] ? 'left-7 bg-blue-500' : 'left-1 bg-white'}`}
                 ></div>
               </div>
               <input
                 type="checkbox"
                 name={key}
                 checked={formData.quicklinksAvailable[key]}
                 onChange={handleInputChange}
                 className="sr-only"
               />
               <span className="text-sm">{key.replace(/-/g, " ").replace(/_/g, " ")}</span>
             </label>
              ))}
            </div>
          </div>
          
          {/* Payment Methods Image */}
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Payment Methods Image</h4>
            <input 
              type="file" 
              name="available_payment_methods" 
              onChange={handleFileChange} 
              accept="image/*"
              className="w-full p-2 border rounded" 
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview}
                  alt="Payment methods preview" 
                  className="h-16 object-contain border rounded p-1" 
                />
              </div>
            )}
          </div>
          
          {/* Form Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={handleCancel} 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : editingId ? 'Update Footer' : 'Create Footer'}
            </button>
          </div>
        </div>
      </form>
      
      {/* Footer Listing */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Footer List</h3>
        
        {isLoading && !footers.length ? (
          <div className="text-center py-4">Loading footers...</div>
        ) : footers.length === 0 ? (
          <div className="text-center py-4 bg-gray-50 rounded">No footers found. Create your first one above.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Footer Baground Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Footer Text Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Media</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Quick Links</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Copyright</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Payement Mathods</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {footers.map((footer) => (
                  <tr key={footer._id} className="hover:bg-gray-50 h-6">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{footer.domain}</div>
                    </td>
                    <td>
                    <div className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                        <div 
                          className="inline-block w-10 h-8 mr-1 rounded-3 border" 
                          style={{ backgroundColor: footer.footerBgColor }}
                        ></div>
                      </div>
                    </td>
                    <td>
                    <div className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                        <div 
                          className="inline-block w-10 h-8 mr-1 rounded-3 border" 
                          style={{ backgroundColor: footer.footerTextColor }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{footer.contactUs?.phone}</div>
                      <div className="text-sm text-gray-500">{footer.contactUs?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-400 mt-1 truncate max-w-xs">{footer.address}</div>
                    </td>
                    <td className="px-6 py-4 flex gap-1">
                      <a href={footer.contactUs?.instaLink} target="_blank" rel="noreferrer"><FaInstagram className="text-xl text-red-400" /></a>
                      <a href={footer.contactUs?.facebookLink} target="_blank" rel="noreferrer"><FaFacebook className="text-xl text-blue-600" /></a>
                      <a href={footer.contactUs?.youtubeLink} target="_blank" rel="noreferrer"><FaYoutube className="text-xl text-red-700" /></a>
                      <a href={footer.contactUs?.whatsappLink} target="_blank" rel="noreferrer"><FaWhatsapp className="text-xl text-green-600" /></a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex  gap-1">
                        {Object.entries(footer.quicklinksAvailable || {}).filter(([_, enabled]) => enabled).map(([link]) => (
                          <div key={link} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {link.replace(/-/g, " ").replace(/_/g, " ")}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">
                        {footer.copy_right_text || "No copyright text"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">
                      <img className="w-full" src={footer.available_payment_methods} alt="Payment methods"  />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(footer)} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                       <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(footer._id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomeFooter;