import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from './KhwaahishHomepageManager';
import SectionManagement from '../components/SectionManagement';


const GeneralSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    scroll_text: data?.scroll_text || '',
    eshop_web_link: data?.eshop_web_link || '',
    store_mapLink: data?.store_mapLink || '',
    hero_short_desc: data?.hero_short_desc || '',
    hero_desc: data?.hero_desc || '',
  });
 

  const [logoFile, setLogoFile] = useState(null);
  const [heroVideoFile, setHeroVideoFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'logo') {
      setLogoFile(files[0]);
    } else if (name === 'hero_video') {
      setHeroVideoFile(files[0]);
    }
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file fields
      if (logoFile) formDataObj.append('logo', logoFile);
      if (heroVideoFile) formDataObj.append('hero_video', heroVideoFile);

      const response = await axios.put(`${BASE_URL}/general`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('General section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update general section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      scroll_text: data?.scroll_text || '',
      eshop_web_link: data?.eshop_web_link || '',
      store_mapLink: data?.store_mapLink || '',
      hero_short_desc: data?.hero_short_desc || '',
      hero_desc: data?.hero_desc || '',
    });
    setLogoFile(null);
    setHeroVideoFile(null);
  };

  return (
    <SectionManagement
      title="General"
      sectionKey="general_section"
      enabled={data?.general_section}
      onToggle={() => onToggle("general_section", !data?.general_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scroll Text
          </label>
          <input
            type="text"
            name="scroll_text"
            value={formData.scroll_text}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-Shop Web Link
          </label>
          <input
            type="text"
            name="eshop_web_link"
            value={formData.eshop_web_link}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Map Link
          </label>
          <input
            type="text"
            name="store_mapLink"
            value={formData.store_mapLink}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Short Description
          </label>
          <input
            type="text"
            name="hero_short_desc"
            value={formData.hero_short_desc}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Description
          </label>
          <textarea
            name="hero_desc"
            value={formData.hero_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo
          </label>
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {logoFile && (
            <div className="mt-2">
              <img src={URL.createObjectURL(logoFile)} alt="Logo Preview" className="mt-1 h-12 object-contain" />
            </div>
          )}
          {data?.logo && !logoFile && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data?.logo.split('/').pop()}</span>
              <img src={data?.logo} alt="Logo" className="mt-1 h-12 object-contain" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Video
          </label>
          <input
            type="file"
            name="hero_video"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {heroVideoFile && (
            <div className="mt-2">
              <video controls className="mt-1 h-24 object-contain">
                <source src={URL.createObjectURL(heroVideoFile)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {data?.hero_video && !heroVideoFile && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data?.hero_video.split('/').pop()}</span>
              <video controls className="mt-1 h-24 object-contain">
                <source src={data?.hero_video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

const HallmarkSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    hallmark_sec_desc: data?.hallmark_sec_desc || '',
    about_slug_name: data?.about_slug_name || '',
    about_slug: data?.about_slug || '',
  });

  

  const [hallmarkImages, setHallmarkImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setHallmarkImages([...e.target.files]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file fields
      hallmarkImages.forEach(image => {
        formDataObj.append('hallmark_images', image);
      });

      const response = await axios.put(`${BASE_URL}/hallmark`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Hallmark section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update hallmark section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      hallmark_sec_desc: data?.hallmark_sec_desc || '',
      about_slug_name: data?.about_slug_name || '',
      about_slug: data?.about_slug || '',
    });
    setHallmarkImages([]);
  };

  return (
    <SectionManagement
      title="Hallmark"
      sectionKey="hallmark_section"
      enabled={data?.hallmark_section}
      onToggle={() => onToggle("hallmark_section", !data?.hallmark_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Description
          </label>
          <textarea
            name="hallmark_sec_desc"
            value={formData.hallmark_sec_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Slug Name
          </label>
          <input
            type="text"
            name="about_slug_name"
            value={formData.about_slug_name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Slug
          </label>
          <input
            type="text"
            name="about_slug"
            value={formData.about_slug}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hallmark Images
          </label>
          <input
            type="file"
            name="hallmark_images"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         
          {data?.hallmark_images && data?.hallmark_images?.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {data?.hallmark_images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Hallmark ${index}`} className="h-24 w-full object-cover rounded" />
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </SectionManagement>
  );
};

const HighJewelSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    high_jewel_title: data?.high_jewel_title || '',
    high_jewel_desc: data?.high_jewel_desc || '',
  });

  const [carousalItems, setCarousalItems] = useState(data?.high_jewel_list || []);
  const [newItem, setNewItem] = useState({
    high_title: '',
    high_short_desc: '',
    high_slug_name: '',
    high_slug: '',
  });
  const [highImage, setHighImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setHighImage(e.target.files[0]);
  };

  const handleSaveSection = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/high-jewel`, formData);

      if (response.data.success) {
        setData(response.data.data);
        toast.success('High Jewel section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update High Jewel section');
      console.error(err);
    }
  };

  const handleAddItem = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(newItem).forEach(key => {
        formDataObj.append(key, newItem[key]);
      });

      // Add file field
      if (highImage) formDataObj.append('high_Image', highImage);

      const response = await axios.post(`${BASE_URL}/high-jewel-carousel`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Add new item to local state
        setCarousalItems([...carousalItems, response.data.data]);
        // Reset new item form
        setNewItem({
          high_title: '',
          high_short_desc: '',
          high_slug_name: '',
          high_slug: '',
        });
        setHighImage(null);

        toast.success('High Jewel item added successfully');
      }
    } catch (err) {
      toast.error('Failed to add High Jewel item');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/high-jewel-carousel/${id}`);

      if (response.data.success) {
        // Remove item from local state
        setCarousalItems(carousalItems.filter(item => item._id !== id));
        toast.success('High Jewel item deleted successfully');
      }
    } catch (err) {
      toast.error('Failed to delete High Jewel item');
      console.error(err);
    }
  };
  

  const handleReset = () => {
    setFormData({
      high_jewel_title: data?.high_jewel_title || '',
      high_jewel_desc: data?.high_jewel_desc || '',
    });
    setCarousalItems(data?.high_jewel_list || []);
    setNewItem({
      high_title: '',
      high_short_desc: '',
      high_slug_name: '',
      high_slug: '',
    });
    setHighImage(null);
  };

  return (
    <SectionManagement
      title="High Jewellery Collection"
      sectionKey="high_jewel_collection_section"
      enabled={data?.high_jewel_collection_section}
      onToggle={() => onToggle("high_jewel_collection_section", !data?.high_jewel_collection_section)}
      onSave={handleSaveSection}
      onReset={handleReset}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Section Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              name="high_jewel_title"
              value={formData.high_jewel_title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Description
            </label>
            <textarea
              name="high_jewel_desc"
              value={formData.high_jewel_desc}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Carousel Items</h3>

          {carousalItems.length > 0 && (
            <div className="space-y-4">
              {carousalItems.map((item, index) => (
                <div key={item._id || index} className="p-4 border border-gray-200 rounded">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.high_title}</h4>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item?.high_short_desc}</p>
                  <p className="text-sm text-gray-600 mt-1">Slug Name: {item?.high_slug_name}</p>
                  <p className="text-sm text-gray-600 mt-1">Slug: {item?.high_slug}</p>
                  {item?.high_Image && (
                    <img src={item?.high_Image} alt={item?.high_title} className="mt-2 h-20 object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="p-4 border border-gray-200 rounded">
            <h4 className="font-medium mb-3">Add New Item</h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="high_title"
                  value={newItem.high_title}
                  onChange={handleNewItemChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <textarea
                  name="high_short_desc"
                  value={newItem.high_short_desc}
                  onChange={handleNewItemChange}
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug Name
                </label>
                <input
                  type="text"
                  name="high_slug_name"
                  value={newItem.high_slug_name}
                  onChange={handleNewItemChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  name="high_slug"
                  value={newItem.high_slug}
                  onChange={handleNewItemChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="high_Image"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionManagement>
  );
};

const QOHSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    qoh_section_title: data?.qoh_section_title || '',
    qoh_section_short_desc: data?.qoh_section_short_desc || '',
  });

  const [carousalItems, setCarousalItems] = useState(data?.qoh_section_list || []);
  const [newItem, setNewItem] = useState({
    qohTitle: '',
    qohShort_desc: '',
    qoh_slug_name: '',
    qoh_slug: '',
  });
  const [qohImage, setQohImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setQohImage(e.target.files[0]);
  };

  const handleSaveSection = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/qoh`, formData);

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Queen Of Heart section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Queen Of Heart section');
      console.error(err);
    }
  };

  const handleAddItem = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(newItem).forEach(key => {
        formDataObj.append(key, newItem[key]);
      });

      // Add file field
      if (qohImage) formDataObj.append('qohImage', qohImage);

      const response = await axios.post(`${BASE_URL}/qoh-carousel`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Add new item to local state
        setCarousalItems([...carousalItems, response.data.data]);
        // Reset new item form
        setNewItem({
          qohTitle: '',
          qohShort_desc: '',
          qoh_slug_name: '',
          qoh_slug: '',
        });
        setQohImage(null);

        toast.success('Queen Of Heart item added successfully');
      }
    } catch (err) {
      toast.error('Failed to add Queen Of Heart item');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/qoh-carousel/${id}`);

      if (response.data.success) {
        // Remove item from local state
        setCarousalItems(carousalItems.filter(item => item._id !== id));
        toast.success('Queen Of Heart item deleted successfully');
      }
    } catch (err) {
      toast.error('Failed to delete Queen Of Heart item');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      qoh_section_title: data?.qoh_section_title || '',
      qoh_section_short_desc: data?.qoh_section_short_desc || '',
    });
    setCarousalItems(data?.qoh_section_list || []);
    setNewItem({
      qohTitle: '',
      qohShort_desc: '',
      qoh_slug_name: '',
      qoh_slug: '',
    });
    setQohImage(null);
  };

  return (
    <SectionManagement
      title="Queen Of Heart"
      sectionKey="qoh_section"
      enabled={data?.qoh_section}
      onToggle={onToggle}
      onSave={handleSaveSection}
      onReset={handleReset}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Section Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              name="qoh_section_title"
              value={formData.qoh_section_title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Description
            </label>
            <textarea
              name="qoh_section_short_desc"
              value={formData.qoh_section_short_desc}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Carousel Items</h3>

          {carousalItems.length > 0 && (
            <div className="space-y-4">
              {carousalItems.map((item, index) => (
                <div key={item._id || index} className="p-4 border border-gray-200 rounded">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.qohTitle}</h4>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item?.qohShort_desc}</p>
                  <p className="text-sm text-gray-600 mt-1">Slug Name: {item?.qoh_slug_name}</p>
                  <p className="text-sm text-gray-600 mt-1">Slug: {item?.qoh_slug}</p>
                  {item?.qohImage && (
                    <img src={item?.qohImage} alt={item?.high_title} className="mt-2 h-20 object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="p-4 border border-gray-200 rounded">
            <h4 className="font-medium mb-3">Add New Item</h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="qohTitle"
                  value={newItem.qohTitle}
                  onChange={handleNewItemChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <textarea
                  name="qohShort_desc"
                  value={newItem.qohShort_desc}
                  onChange={handleNewItemChange}
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug Name
                </label>
                <input
                  type="text"
                  name="qoh_slug_name"
                  value={newItem.qoh_slug_name}
                  onChange={handleNewItemChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  name="qoh_slug"
                  value={newItem.qoh_slug}
                  onChange={handleNewItemChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="qohImage"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionManagement>
  );
};

const BridalEditSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    bridal_edit_section_title: data?.bridal_edit_section_title || '',
    bridal_edit_section_short_desc: data?.bridal_edit_section_short_desc || '',
    bridal_edit_title: data?.bridal_edit_title || '',
    bridal_edit_short_desc: data?.bridal_edit_short_desc || '',
    bridal_edit_slug_name: data?.bridal_edit_slug_name || '',
    bridal_edit_slug: data?.bridal_edit_slug || '',
  });

  const [bridalEditImage, setBridalEditImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setBridalEditImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file field
      if (bridalEditImage) formDataObj.append('bridal_edit_image', bridalEditImage);

      const response = await axios.put(`${BASE_URL}/edit`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Bridal Edit section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Bridal Edit section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      bridal_edit_section_title: data?.bridal_edit_section_title || '',
      bridal_edit_section_short_desc: data?.bridal_edit_section_short_desc || '',
      bridal_edit_title: data?.bridal_edit_title || '',
      bridal_edit_short_desc: data?.bridal_edit_short_desc || '',
      bridal_edit_slug_name: data?.bridal_edit_slug_name || '',
      bridal_edit_slug: data?.bridal_edit_slug || '',
    });
    setBridalEditImage(null);
  };

  return (
    <SectionManagement
      title="Bridal Edit"
      sectionKey="bridal_edit_section"
      enabled={data?.bridal_edit_section}
      onToggle={() => onToggle('bridal_edit_section', !data?.bridal_edit_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            name="bridal_edit_section_title"
            value={formData.bridal_edit_section_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Short Description
          </label>
          <textarea
            name="bridal_edit_section_short_desc"
            value={formData.bridal_edit_section_short_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="bridal_edit_title"
            value={formData.bridal_edit_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <textarea
            name="bridal_edit_short_desc"
            value={formData.bridal_edit_short_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug Name
          </label>
          <input
            type="text"
            name="bridal_edit_slug_name"
            value={formData.bridal_edit_slug_name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            type="text"
            name="bridal_edit_slug"
            value={formData.bridal_edit_slug}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="bridal_edit_image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {data?.bridal_edit_image && (
            <img src={data?.bridal_edit_image} alt={data?.bridal_edit_title} className="mt-2 h-20 object-cover" />
           )}
        </div>
      </div>
    </SectionManagement>
  );
};

const PolkiEditSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    polki_edit_section_title: data?.polki_edit_section_title || '',
    polki_edit_section_short_desc: data?.polki_edit_section_short_desc || '',
    polki_edit_title: data?.polki_edit_title || '',
    polki_edit_short_desc: data?.polki_edit_short_desc || '',
    polki_edit_slug_name: data?.polki_edit_slug_name || '',
    polki_edit_slug: data?.polki_edit_slug || '',
  });

  const [polkiEditImage, setPolkiEditImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPolkiEditImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file field
      if (polkiEditImage) formDataObj.append('polki_edit_image', polkiEditImage);

      const response = await axios.put(`${BASE_URL}/edit`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Polki Edit section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Polki Edit section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      polki_edit_section_title: data?.polki_edit_section_title || '',
      polki_edit_section_short_desc: data?.polki_edit_section_short_desc || '',
      polki_edit_title: data?.polki_edit_title || '',
      polki_edit_short_desc: data?.polki_edit_short_desc || '',
      polki_edit_slug_name: data?.polki_edit_slug_name || '',
      polki_edit_slug: data?.polki_edit_slug || '',
    });
    setPolkiEditImage(null);
  };

  return (
    <SectionManagement
      title="Polki Edit"
      sectionKey="polki_edit_section"
      enabled={data?.polki_edit_section}
      onToggle={() => onToggle('polki_edit_section', !data?.polki_edit_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            name="polki_edit_section_title"
            value={formData.polki_edit_section_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Short Description
          </label>
          <textarea
            name="polki_edit_section_short_desc"
            value={formData.polki_edit_section_short_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="polki_edit_title"
            value={formData.polki_edit_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <textarea
            name="polki_edit_short_desc"
            value={formData.polki_edit_short_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug Name
          </label>
          <input
            type="text"
            name="polki_edit_slug_name"
            value={formData.polki_edit_slug_name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            type="text"
            name="polki_edit_slug"
            value={formData.polki_edit_slug}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="polki_edit_image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {data?.polki_edit_image && (
             <img src={data?.polki_edit_image} alt={data?.bridal_edit_title} className="mt-2 h-20 object-cover" />
           )}
        </div>
      </div>
    </SectionManagement>
  );
};
  
const PromiseSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    promise_sec_title: data?.promise_sec_title || '',
    promise_short_desc: data?.promise_short_desc || '',
  });

  const [promiseItems, setPromiseItems] = useState(data?.promise_list || []);
  const [newItem, setNewItem] = useState({
    promise_title: '',
  });
  const [promiseImage, setPromiseImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPromiseImage(e.target.files[0]);
  };

  const handleSaveSection = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/promise`, formData);

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Promise section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Promise section');
      console.error(err);
    }
  };

  const handleAddItem = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(newItem).forEach(key => {
        formDataObj.append(key, newItem[key]);
      });

      // Add file field
      if (promiseImage) formDataObj.append('promise_image', promiseImage);

      const response = await axios.post(`${BASE_URL}/promise`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Add new item to local state
        setPromiseItems([...promiseItems, response.data.data]);
        // Reset new item form
        setNewItem({
          promise_title: '',
        });
        setPromiseImage(null);

        toast.success('Promise item added successfully');
      }
    } catch (err) {
      toast.error('Failed to add Promise item');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/promise/${id}`);

      if (response.data.success) {
        // Remove item from local state
        setPromiseItems(promiseItems.filter(item => item._id !== id));
        toast.success('Promise item deleted successfully');
      }
    } catch (err) {
      toast.error('Failed to delete Promise item');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      promise_sec_title: data?.promise_sec_title || '',
      promise_short_desc: data?.promise_short_desc || '',
    });
    setPromiseItems(data?.promise_list || []);
    setNewItem({
      promise_title: '',
    });
    setPromiseImage(null);
  };

  return (
    <SectionManagement
      title="Promise"
      sectionKey="promise_section"
      enabled={data?.promise_section}
      onToggle={onToggle}
      onSave={handleSaveSection}
      onReset={handleReset}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Section Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              name="promise_sec_title"
              value={formData.promise_sec_title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Description
            </label>
            <textarea
              name="promise_short_desc"
              value={formData.promise_short_desc}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Promise Items</h3>

          {promiseItems.length > 0 && (
            <div className="space-y-4">
              {promiseItems.map((item, index) => (
                <div key={item._id || index} className="p-4 border border-gray-200 rounded">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.promise_title}</h4>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  {item?.promise_image && (
                    <img src={item?.promise_image} alt={item?.promise_title} className="mt-2 h-20 object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="p-4 border border-gray-200 rounded">
            <h4 className="font-medium mb-3">Add New Item</h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="promise_title"
                  value={newItem.promise_title}
                  onChange={handleNewItemChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="promise_image"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionManagement>
  );
};

const ComingSoonSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    coming_soon_section_title: data?.coming_soon_section_title || '',
    videoCall_slug: data?.videoCall_slug || '',
  });

  const [comingSoonImages, setComingSoonImages] = useState([]);
  const [videoCallBannerImage, setVideoCallBannerImage] = useState(null);
 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'coming_soon_images') {
      setComingSoonImages([...e.target.files]);
    } else if (e.target.name === 'coming_soon_videCall_banner_image') {
      setVideoCallBannerImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file fields
      comingSoonImages.forEach(file => {
        formDataObj.append('coming_soon_images', file);
      });
      if (videoCallBannerImage) {
        formDataObj.append('coming_soon_videCall_banner_image', videoCallBannerImage);
      }

      const response = await axios.put(`${BASE_URL}/coming-soon`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Coming Soon section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Coming Soon section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      coming_soon_section_title: data?.coming_soon_section_title || '',
      videoCall_slug: data?.videoCall_slug || '',
    });
    setComingSoonImages([]);
    setVideoCallBannerImage(null);
  };

  return (
    <SectionManagement
      title="Coming Soon"
      sectionKey="coming_soon_section"
      enabled={data?.coming_soon_section}
      onToggle={()=>onToggle("coming_soon_section",!data?.coming_soon_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            name="coming_soon_section_title"
            value={formData.coming_soon_section_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video Call Slug
          </label>
          <input
            type="text"
            name="videoCall_slug"
            value={formData.videoCall_slug}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coming Soon Images
          </label>
          <input
            type="file"
            name="coming_soon_images"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {data?.coming_soon_images && data?.coming_soon_images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {data?.coming_soon_images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Hallmark ${index}`} className="h-24 w-full object-cover rounded" />
                  </div>
                ))}
              </div>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video Call Banner Image
          </label>
          <input
            type="file"
            name="coming_soon_videCall_banner_image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         {data?.coming_soon_videCall_banner_image && (
                    <img src={data?.coming_soon_videCall_banner_image} alt={"Video Call Banner"} className="mt-2 h-20 object-cover" />
           )}
        </div>
      </div>
    </SectionManagement>
  );
};

const StoreSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    store_section_title: data?.store_section_title || '',
    storeShort_desc: data?.storeShort_desc || '',
    storeDesc: data?.storeDesc || '',
    mapiframeLink: data?.mapiframeLink || '',
  });

  const [storeImage, setStoreImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setStoreImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file field
      if (storeImage) formDataObj.append('storeImage', storeImage);

      const response = await axios.put(`${BASE_URL}/store`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Store section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Store section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      store_section_title: data?.store_section_title || '',
      storeShort_desc: data?.storeShort_desc || '',
      storeDesc: data?.storeDesc || '',
      mapiframeLink: data?.mapiframeLink || '',
    });
    setStoreImage(null);
  };

return (
    <SectionManagement
        title="Store"
        sectionKey="store_section"
        enabled={data?.store_section}
        onToggle={() => onToggle("store_section", !data?.store_section)}
        onSave={handleSave}
        onReset={handleReset}
    >
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Title
                </label>
                <input
                    type="text"
                    name="store_section_title"
                    value={formData.store_section_title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description
                </label>
                <textarea
                    name="storeShort_desc"
                    value={formData.storeShort_desc}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    name="storeDesc"
                    value={formData.storeDesc}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Map Iframe Link
                </label>
                <input
                    type="text"
                    name="mapiframeLink"
                    value={formData.mapiframeLink}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.mapiframeLink && (
                    <div className="mt-2">
                        <iframe
                            src={formData.mapiframeLink}
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Image
                </label>
                <input
                    type="file"
                    name="storeImage"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {data?.storeImage && (
                    <img src={data?.storeImage} alt={"Store Image"} className="mt-2 h-20 object-cover" />
                )}
            </div>
        </div>
    </SectionManagement>
);
};

const StoreFeatureSection = ({ data, setData, onToggle }) => {
  const [newFeature, setNewFeature] = useState({
    featTitle: '',
    featDesc: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeature(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/store-feature`, newFeature);

      if (response.data.success) {
        setData(prev => ({
          ...prev,
          store_feat_list: [...prev.store_feat_list, response.data.data]
        }));
        setNewFeature({
          featTitle: '',
          featDesc: '',
        });
        toast.success('Store feature added successfully');
      }
    } catch (err) {
      toast.error('Failed to add store feature');
      console.error(err);
    }
  };

  const handleDeleteFeature = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/store-feature/${id}`);

      if (response.data.success) {
        setData(prev => ({
          ...prev,
          store_feat_list: prev.store_feat_list.filter(item => item._id !== id)
        }));
        toast.success('Store feature deleted successfully');
      }
    } catch (err) {
      toast.error('Failed to delete store feature');
      console.error(err);
    }
  };

  return (
    <SectionManagement
      title="Store Features"
      sectionKey="store_feat_section"
      enabled={data?.store_feat_section}
      onToggle={() => onToggle("store_feat_section", !data?.store_feat_section)}
      onSave={() => {}}
      onReset={() => {}}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Add New Feature</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feature Title
            </label>
            <input
              type="text"
              name="featTitle"
              value={newFeature.featTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feature Description
            </label>
            <textarea
              name="featDesc"
              value={newFeature.featDesc}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            onClick={handleAddFeature}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Feature
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Existing Features</h3>

          {data?.store_feat_list?.length > 0 && (
            <div className="space-y-4">
              {data?.store_feat_list?.map((item, index) => (
                <div key={item._id || index} className="p-4 border border-gray-200 rounded">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item?.featTitle}</h4>
                    <button
                      onClick={() => handleDeleteFeature(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item?.featDesc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

const FAQSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    faq_title: data?.faq_title || '',
  });

  const [faqItems, setFaqItems] = useState(data?.faq_list || []);
  const [newItem, setNewItem] = useState({
    question: '',
    answer: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSection = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/faq`, formData);

      if (response.data.success) {
        setData(response.data.data);
        toast.success('FAQ section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update FAQ section');
      console.error(err);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/faq`, newItem);

      if (response.data.success) {
        // Add new item to local state
        setFaqItems([...faqItems, response.data.data]);
        // Reset new item form
        setNewItem({
          question: '',
          answer: '',
        });

        toast.success('FAQ item added successfully');
      }
    } catch (err) {
      toast.error('Failed to add FAQ item');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/faq/${id}`);

      if (response.data.success) {
        // Remove item from local state
        setFaqItems(faqItems.filter(item => item._id !== id));
        toast.success('FAQ item deleted successfully');
      }
    } catch (err) {
      toast.error('Failed to delete FAQ item');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      faq_title: data.faq_title || '',
    });
    setFaqItems(data.faq_list || []);
    setNewItem({
      question: '',
      answer: '',
    });
  };

  return (
    <SectionManagement
      title="FAQ"
      sectionKey="faq_section"
      enabled={data?.faq_section}
      onToggle={()=>onToggle("faq_section",!data?.faq_section)}
      onSave={handleSaveSection}
      onReset={handleReset}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Section Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              name="faq_title"
              value={formData.faq_title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">FAQ Items</h3>

          {faqItems.length > 0 && (
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={item._id || index} className="p-4 border border-gray-200 rounded">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item?.question}</h4>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item?.answer}</p>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 border border-gray-200 rounded">
            <h4 className="font-medium mb-3">Add New Item</h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={newItem.question}
                  onChange={handleNewItemChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Answer
                </label>
                <textarea
                  name="answer"
                  value={newItem.answer}
                  onChange={handleNewItemChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionManagement>
  );
};

export {GeneralSection,HallmarkSection,HighJewelSection,QOHSection,BridalEditSection,PolkiEditSection,PromiseSection,ComingSoonSection,StoreSection,StoreFeatureSection,FAQSection}