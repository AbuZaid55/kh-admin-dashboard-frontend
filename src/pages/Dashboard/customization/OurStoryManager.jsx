import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SectionManagement from './components/SectionManagement';



const API_URL = 'http://localhost:3000/common/customization';
// const API_URL= BASE_URL + /common/customization';   IN PRODUCTION

// Our Desire Section Component
const OurDesire = ({ data, setData, onToggle }) => {
    const [formData, setFormData] = useState({
      desire_title: data.desire_title || '',
      desire_descriptions: data.desire_descriptions || [''],
      desire_image: null,
    });
    const [imagePreview, setImagePreview] = useState(data.desire_image || '');
    const [featFormData, setFeatFormData] = useState({
      title: '',
      descripton: '', // Note: This matches the typo in the backend model
    });
  
    // Handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Handle description array changes
    const handleDescriptionChange = (index, value) => {
      const updatedDescriptions = [...formData.desire_descriptions];
      updatedDescriptions[index] = value;
      setFormData({
        ...formData,
        desire_descriptions: updatedDescriptions,
      });
    };
  
    // Add a new description field
    const addDescriptionField = () => {
      setFormData({
        ...formData,
        desire_descriptions: [...formData.desire_descriptions, ''],
      });
    };
  
    // Remove a description field
    const removeDescriptionField = (index) => {
      const updatedDescriptions = formData.desire_descriptions.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        desire_descriptions: updatedDescriptions,
      });
    };
  
    // Handle image change
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setFormData({
          ...formData,
          desire_image: e.target.files[0],
        });
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    // Handle saving section data
    const handleSave = async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append('desire_title', formData.desire_title);
        formData.desire_descriptions.forEach((desc, index) => {
          formDataObj.append(`desire_descriptions[${index}]`, desc);
        });
        if (formData.desire_image) {
          formDataObj.append('desire_image', formData.desire_image);
        }
  
        const response = await axios.put(`${API_URL}/our-story/desire`, formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        if (response.data.success) {
          setData(response.data.data);
          toast.success('Our Desire section updated successfully');
        } else {
          toast.error('Failed to update Our Desire section');
        }
      } catch (err) {
        toast.error('An error occurred while updating Our Desire section');
        console.error(err);
      }
    };
  
    // Handle feature form input changes
    const handleFeatInputChange = (e) => {
      const { name, value } = e.target;
      setFeatFormData({
        ...featFormData,
        [name]: value,
      });
    };
  
    // Add a new feature
    const handleAddFeature = async () => {
      try {
        if (!featFormData.title || !featFormData.descripton) {
          toast.warning('Both title and description are required');
          return;
        }
  
        const response = await axios.post(`${API_URL}/our-story/desire`, featFormData);
  
        if (response.data.success) {
          setData(response.data.data);
          // Reset the form
          setFeatFormData({ title: '', descripton: '' });
          toast.success('Feature added successfully');
        } else {
          toast.error('Failed to add feature');
        }
      } catch (err) {
        toast.error('An error occurred while adding feature');
        console.error(err);
      }
    };
  
    // Delete a feature
    const handleDeleteFeature = async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/our-story/desire`,{
            params:{id}
        });
  
        if (response.data.success) {
          setData(response.data.data);
          toast.success('Feature deleted successfully');
        } else {
          toast.error('Failed to delete feature');
        }
      } catch (err) {
        toast.error('An error occurred while deleting feature');
        console.error(err);
      }
    };
  
    // Reset form to original data
    const handleReset = () => {
      setFormData({
        desire_title: data.desire_title || '',
        desire_descriptions: data.desire_descriptions || [''],
        desire_image: null,
      });
      setImagePreview(data.desire_image || '');
    };
  
    return (
      <SectionManagement
        title="Our Desire"
        sectionKey="our_desire_section"
        enabled={data.our_desire_section}
        onSave={handleSave}
        onReset={handleReset}
        onToggle={onToggle}
      >
        <div className="space-y-6">
          {/* Main Section Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                name="desire_title"
                value={formData.desire_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded"
                  />
                </div>
              )}
              {data?.desire_image && (
                <div className="mt-2">
                  <img
                    src={data.desire_image}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded"
                  />
                </div>
              )}
            </div>
  
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Descriptions
                </label>
                <button
                  type="button"
                  onClick={addDescriptionField}
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Description
                </button>
              </div>
              {formData.desire_descriptions.map((desc, index) => (
                <div key={index} className="flex mb-2">
                  <textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                    rows="2"
                  />
                  <button
                    type="button"
                    onClick={() => removeDescriptionField(index)}
                    className="px-2 bg-red-500 text-white rounded hover:bg-red-600"
                    disabled={formData.desire_descriptions.length <= 1}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
  
          {/* Features Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Desire Features</h3>
  
            {/* Current Features */}
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2">Current Features</h4>
              {data.desire_feat && data.desire_feat.length > 0 ? (
                <div className="space-y-3">
                  {data.desire_feat.map((feat) => (
                    <div
                      key={feat._id}
                      className="p-3 bg-gray-50 rounded-md border flex justify-between items-start"
                    >
                      <div>
                        <h5 className="font-medium">{feat.title}</h5>
                        <p className="text-sm text-gray-600">{feat.descripton}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteFeature(feat._id)}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No features added yet</p>
              )}
            </div>
  
            {/* Add New Feature */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-md font-medium mb-2">Add New Feature</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={featFormData.title}
                    onChange={handleFeatInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="descripton"
                    value={featFormData.descripton}
                    onChange={handleFeatInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="text-right">
                  <button
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionManagement>
    );
};
  
  // Our Logo Section Component
const OurLogo = ({ data, setData, onToggle }) => {
    const [formData, setFormData] = useState({
      logo_title: data.logo_title || '',
      logo_short_desc: data.logo_short_desc || '',
      logo_desc_1: data.logo_desc_1 || '',
      logo_desc_2: data.logo_desc_2 || '',
      logo_message: data.logo_message || '',
      logo_img: null,
    });
    const [imagePreview, setImagePreview] = useState(data.logo_img || '');
  
    // Handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Handle image change
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setFormData({
          ...formData,
          logo_img: e.target.files[0],
        });
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    // Handle saving section data
    const handleSave = async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append('logo_title', formData.logo_title);
        formDataObj.append('logo_short_desc', formData.logo_short_desc);
        formDataObj.append('logo_desc_1', formData.logo_desc_1);
        formDataObj.append('logo_desc_2', formData.logo_desc_2);
        formDataObj.append('logo_message', formData.logo_message);
        if (formData.logo_img) {
          formDataObj.append('logo_img', formData.logo_img);
        }
  
        const response = await axios.put(`${API_URL}/our-story/logo`, formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        if (response.data.success) {
          setData(response.data.data);
          toast.success('Our Logo section updated successfully');
        } else {
          toast.error('Failed to update Our Logo section');
        }
      } catch (err) {
        toast.error('An error occurred while updating Our Logo section');
        console.error(err);
      }
    };
  
    // Reset form to original data
    const handleReset = () => {
      setFormData({
        logo_title: data.logo_title || '',
        logo_short_desc: data.logo_short_desc || '',
        logo_desc_1: data.logo_desc_1 || '',
        logo_desc_2: data.logo_desc_2 || '',
        logo_message: data.logo_message || '',
        logo_img: null,
      });
      setImagePreview(data.logo_img || '');
    };
  
    return (
      <SectionManagement
        title="Our Logo"
        sectionKey="our_logo_section"
        enabled={data.our_logo_section}
        onSave={handleSave}
        onReset={handleReset}
        onToggle={onToggle}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo Title
            </label>
            <input
              type="text"
              name="logo_title"
              value={formData.logo_title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            )}
              {data.logo_img && (
                <div className="mt-2">
                  <img
                    src={data.logo_img}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded"
                  />
                </div>
              )}
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              name="logo_short_desc"
              value={formData.logo_short_desc}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description 1
            </label>
            <textarea
              name="logo_desc_1"
              value={formData.logo_desc_1}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description 2
            </label>
            <textarea
              name="logo_desc_2"
              value={formData.logo_desc_2}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="logo_message"
              value={formData.logo_message}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </SectionManagement>
    );
};
  
  // Our Values Section Component
const OurValues = ({ data, setData, onToggle }) => {
    const [sectionTitle, setSectionTitle] = useState(data.our_value_section_title || '');
    const [valueFormData, setValueFormData] = useState({
      title: '',
      desc: '',
    });
  
    // Handle section title change
    const handleSectionTitleChange = (e) => {
      setSectionTitle(e.target.value);
    };
  
    // Handle value form input changes
    const handleValueInputChange = (e) => {
      const { name, value } = e.target;
      setValueFormData({
        ...valueFormData,
        [name]: value,
      });
    };
  
    // Handle saving section title
    const handleSave = async () => {
      try {
        const response = await axios.put(`${API_URL}/our-story/value`, {
          our_value_section_title: sectionTitle,
        });
  
        if (response.data.success) {
          setData(response.data.data);
          toast.success('Our Values section title updated successfully');
        } else {
          toast.error('Failed to update Our Values section title');
        }
      } catch (err) {
        toast.error('An error occurred while updating Our Values section title');
        console.error(err);
      }
    };
  
    // Add a new value
    const handleAddValue = async () => {
      try {
        if (!valueFormData.title || !valueFormData.desc) {
          toast.warning('Both title and description are required');
          return;
        }
  
        const response = await axios.post(`${API_URL}/our-story/value`, valueFormData);
  
        if (response.data.success) {
          setData(response.data.data);
          // Reset the form
          setValueFormData({ title: '', desc: '' });
          toast.success('Value added successfully');
        } else {
          toast.error('Failed to add value');
        }
      } catch (err) {
        toast.error('An error occurred while adding value');
        console.error(err);
      }
    };
  
    // Delete a value
    const handleDeleteValue = async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/our-story/value/${id}`);
  
        if (response.data.success) {
          setData(response.data.data);
          toast.success('Value deleted successfully');
        } else {
          toast.error('Failed to delete value');
        }
      } catch (err) {
        toast.error('An error occurred while deleting value');
        console.error(err);
      }
    };
  
    // Reset form to original data
    const handleReset = () => {
      setSectionTitle(data.our_value_section_title || '');
    };
  
    return (
      <SectionManagement
        title="Our Values"
        sectionKey="our_value_section"
        enabled={data.our_value_section}
        onSave={handleSave}
        onReset={handleReset}
        onToggle={onToggle}
      >
        <div className="space-y-6">
          {/* Section Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={sectionTitle}
              onChange={handleSectionTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          {/* Current Values */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Values List</h3>
            {data.values_list && data.values_list.length > 0 ? (
              <div className="space-y-3">
                {data.values_list.map((value) => (
                  <div
                    key={value._id}
                    className="p-3 bg-gray-50 rounded-md border flex justify-between items-start"
                  >
                    <div>
                      <h5 className="font-medium">{value.title}</h5>
                      <p className="text-sm text-gray-600">{value.desc}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteValue(value._id)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No values added yet</p>
            )}
          </div>
  
          {/* Add New Value */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-md font-medium mb-2">Add New Value</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={valueFormData.title}
                  onChange={handleValueInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={valueFormData.desc}
                  onChange={handleValueInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="text-right">
                <button
                  onClick={handleAddValue}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Value
                </button>
              </div>
            </div>
          </div>
        </div>
      </SectionManagement>
    );
};
  
  // Our Promoters Section Component
const OurPromoters = ({ data, setData, onToggle }) => {
      const [sectionTitle, setSectionTitle] = useState(data.our_promoter_section_title || '');
      const [promoterFormData, setPromoterFormData] = useState({
        name: '',
        designation: '',
        feedback: '',
        profileImg: null,
      });
      const [imagePreview, setImagePreview] = useState('');
    
      // Handle section title change
      const handleSectionTitleChange = (e) => {
        setSectionTitle(e.target.value);
      };
    
      // Handle promoter form input changes
      const handlePromoterInputChange = (e) => {
        const { name, value } = e.target;
        setPromoterFormData({
          ...promoterFormData,
          [name]: value,
        });
      };
    
      // Handle image change
      const handleImageChange = (e) => {
        if (e.target.files[0]) {
          setPromoterFormData({
            ...promoterFormData,
            profileImg: e.target.files[0],
          });
          setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
      };
    
      // Handle saving section title
      const handleSave = async () => {
        try {
          const response = await axios.put(`${API_URL}/our-story/promoter`, {
            our_promoter_section_title: sectionTitle,
          });
    
          if (response.data.success) {
            setData(response.data.data);
            toast.success('Our Promoters section title updated successfully');
          } else {
            toast.error('Failed to update Our Promoters section title');
          }
        } catch (err) {
          toast.error('An error occurred while updating Our Promoters section title');
          console.error(err);
        }
      };
    
      // Add a new promoter
      const handleAddPromoter = async () => {
        try {
          if (!promoterFormData.name || !promoterFormData.designation || !promoterFormData.feedback || !promoterFormData.profileImg) {
            toast.warning('All fields including profile image are required');
            return;
          }
    
          const formDataObj = new FormData();
          formDataObj.append('name', promoterFormData.name);
          formDataObj.append('designation', promoterFormData.designation);
          formDataObj.append('feedback', promoterFormData.feedback);
          formDataObj.append('profileImg', promoterFormData.profileImg);
    
          const response = await axios.post(`${API_URL}/our-story/promoter`, formDataObj, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
    
          if (response.data.success) {
            setData(response.data.data);
            // Reset the form
            setPromoterFormData({ name: '', designation: '', feedback: '', profileImg: null });
            setImagePreview('');
            toast.success('Promoter added successfully');
          } else {
            toast.error('Failed to add promoter');
          }
        } catch (err) {
          toast.error('An error occurred while adding promoter');
          console.error(err);
        }
      };
    
      // Delete a promoter
      const handleDeletePromoter = async (id) => {
        try {
          const response = await axios.delete(`${API_URL}/our-story/promoter`,{
            params:{id}
          });
    
          if (response.data.success) {
            setData(response.data.data);
            toast.success('Promoter deleted successfully');
          } else {
            toast.error('Failed to delete promoter');
          }
        } catch (err) {
          toast.error('An error occurred while deleting promoter');
          console.error(err);
        }
      };
    
      // Reset form to original data
      const handleReset = () => {
        setSectionTitle(data.our_promoter_section_title || '');
      };
    
      return (
        <SectionManagement
          title="Our Promoters"
          sectionKey="our_promoter_section"
          enabled={data.our_promoter_section}
          onSave={handleSave}
          onReset={handleReset}
          onToggle={onToggle}
        >
          <div className="space-y-6">
            {/* Section Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={sectionTitle}
                onChange={handleSectionTitleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
    
            {/* Current Promoters */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Promoters List</h3>
              {data.promoters_list && data.promoters_list.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.promoters_list.map((promoter) => (
                    <div
                      key={promoter._id}
                      className="p-4 bg-gray-50 rounded-md border flex flex-col"
                    >
                      <div className="flex items-start mb-3">
                        {promoter.profileImg && (
                          <img
                            src={promoter.profileImg}
                            alt={promoter.name}
                            className="w-16 h-16 object-cover rounded-full mr-3"
                          />
                        )}
                        <div>
                          <h5 className="font-medium">{promoter.name}</h5>
                          <p className="text-sm text-gray-600">{promoter.designation}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 flex-grow italic">"{promoter.feedback}"</p>
                      <div className="text-right">
                        <button
                          onClick={() => handleDeletePromoter(promoter._id)}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No promoters added yet</p>
              )}
            </div>
    
            {/* Add New Promoter */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-md font-medium mb-2">Add New Promoter</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={promoterFormData.name}
                    onChange={handlePromoterInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={promoterFormData.designation}
                    onChange={handlePromoterInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback
                  </label>
                  <textarea
                    name="feedback"
                    value={promoterFormData.feedback}
                    onChange={handlePromoterInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="text-right">
                  <button
                    onClick={handleAddPromoter}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add Promoter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SectionManagement>
      );
};


// Main component to manage all sections
const OurStoryManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load homepage data
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/our-story`);   
      console.log(response.data.data);
      
      setData(response.data.data);
    } catch (err) {
      setError('Failed to load page data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle section visibility
  const handleToggleSection = async (section, value) => {
    try {
      const response = await axios.put(`${API_URL}/our-story/toggle`, {
        section,
        value
      });
      
      if (response.data.success) {
        // Update local state
        setData(response.data.data);
        
        toast.success(`${section.replace(/_/g, ' ')} section ${value ? 'enabled' : 'disabled'}`);
      } else {
        toast.error('Failed to update section visibility');
      }
    } catch (err) {
      toast.error('An error occurred while updating section visibility');
      console.error(err);
    }
  };
  
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!data) return <div className="text-center py-10">No data available</div>;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">OUR STORY PAGE Management</h1>
      
      <OurDesire data={data} setData={setData} onToggle={handleToggleSection} />
      <OurLogo data={data} setData={setData} onToggle={handleToggleSection} />
      <OurValues data={data} setData={setData} onToggle={handleToggleSection} />
      <OurPromoters data={data} setData={setData} onToggle={handleToggleSection} />
    </div>
  );
};

export default OurStoryManager;