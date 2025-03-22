import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SectionManagement from '../components/SectionManagement';
import { BASE_URL } from './CollectionHomepageKHManager';


const GeneralSection = ({ data, setData, onToggle }) => {
    const [formData, setFormData] = useState({
      hero_desc: data.hero_desc || '',
      collection_name: data.collection_name || '',
      ad_title: data.ad_title || '',
      slug: data.slug || '',
    });
  
    const [heroDesktopBannerImg, setHeroDesktopBannerImg] = useState(null);
    const [heroMobileBannerImg, setHeroMobileBannerImg] = useState(null);
    const [collectionLogo, setCollectionLogo] = useState(null);
    const [adVideo, setAdVideo] = useState(null);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      if (name === 'hero_desktop_banner_img') {
        setHeroDesktopBannerImg(files[0]);
      } else if (name === 'hero_mobile_banner_img') {
        setHeroMobileBannerImg(files[0]);
      } else if (name === 'collection_logo') {
        setCollectionLogo(files[0]);
      } else if (name === 'ad_video') {
        setAdVideo(files[0]);
      }
    };
  
    const handleSave = async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append('collection_homepage_name', data.collection_homepage_name);
  
        // Add text fields
        Object.keys(formData).forEach(key => {
          formDataObj.append(key, formData[key]);
        });
  
        // Add file fields
        if (heroDesktopBannerImg) formDataObj.append('hero_desktop_banner_img', heroDesktopBannerImg);
        if (heroMobileBannerImg) formDataObj.append('hero_mobile_banner_img', heroMobileBannerImg);
        if (collectionLogo) formDataObj.append('collection_logo', collectionLogo);
        if (adVideo) formDataObj.append('ad_video', adVideo);
  
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
        hero_desc: data.hero_desc || '',
        collection_name: data.collection_name || '',
        ad_title: data.ad_title || '',
        slug: data.slug || '',
      });
      setHeroDesktopBannerImg(null);
      setHeroMobileBannerImg(null);
      setCollectionLogo(null);
      setAdVideo(null);
    };
  
    return (
      <SectionManagement
        title="General"
        sectionKey="general_section"
        enabled={data.general_section}
        onToggle={() => onToggle("general_section", !data.general_section)}
        onSave={handleSave}
        onReset={handleReset}
      >
        <div className="space-y-4">
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
              Collection Name
            </label>
            <input
              type="text"
              name="collection_name"
              value={formData.collection_name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Title
            </label>
            <input
              type="text"
              name="ad_title"
              value={formData.ad_title}
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
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero Desktop Banner Image
            </label>
            <input
              type="file"
              name="hero_desktop_banner_img"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {heroDesktopBannerImg && (
              <div className="mt-2">
                <img src={URL.createObjectURL(heroDesktopBannerImg)} alt="Hero Desktop Banner Preview" className="mt-1 h-12 object-contain" />
              </div>
            )}
            {data.hero_desktop_banner_img && !heroDesktopBannerImg && (
              <div className="mt-2">
                <span className="text-sm text-gray-500">Current: {data.hero_desktop_banner_img.split('/').pop()}</span>
                <img src={data.hero_desktop_banner_img} alt="Hero Desktop Banner" className="mt-1 h-12 object-contain" />
              </div>
            )}
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hero Mobile Banner Image
            </label>
            <input
              type="file"
              name="hero_mobile_banner_img"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {heroMobileBannerImg && (
              <div className="mt-2">
                <img src={URL.createObjectURL(heroMobileBannerImg)} alt="Hero Mobile Banner Preview" className="mt-1 h-12 object-contain" />
              </div>
            )}
            {data.hero_mobile_banner_img && !heroMobileBannerImg && (
              <div className="mt-2">
                <span className="text-sm text-gray-500">Current: {data.hero_mobile_banner_img.split('/').pop()}</span>
                <img src={data.hero_mobile_banner_img} alt="Hero Mobile Banner" className="mt-1 h-12 object-contain" />
              </div>
            )}
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Logo
            </label>
            <input
              type="file"
              name="collection_logo"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {collectionLogo && (
              <div className="mt-2">
                <img src={URL.createObjectURL(collectionLogo)} alt="Collection Logo Preview" className="mt-1 h-12 object-contain" />
              </div>
            )}
            {data.collection_logo && !collectionLogo && (
              <div className="mt-2">
                <span className="text-sm text-gray-500">Current: {data.collection_logo.split('/').pop()}</span>
                <img src={data.collection_logo} alt="Collection Logo" className="mt-1 h-12 object-contain" />
              </div>
            )}
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Video
            </label>
            <input
              type="file"
              name="ad_video"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {adVideo && (
              <div className="mt-2">
                <video controls className="mt-1 h-24 object-contain">
                  <source src={URL.createObjectURL(adVideo)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {data.ad_video && !adVideo && (
              <div className="mt-2">
                <span className="text-sm text-gray-500">Current: {data.ad_video.split('/').pop()}</span>
                <video controls className="mt-1 h-24 object-contain">
                  <source src={data.ad_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      </SectionManagement>
    );
};
  
const CollectionSection = ({ data, setData, onToggle }) => {
    const [formData, setFormData] = useState({
      collection_data_section_title: data.collection_data_section_title || '',
      collection_data_title: data.collection_data_title || '',
      collection_data_desc: data.collection_data_desc || '',
    });
  
    const [collectionDataImage, setCollectionDataImage] = useState(null);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      if (name === 'collection_data_image') {
        setCollectionDataImage(files[0]);
      }
    };
  
    const handleSave = async () => {
      try {
        const formDataObj = new FormData();
        formDataObj.append('collection_homepage_name', data.collection_homepage_name);
  
        // Add text fields
        Object.keys(formData).forEach(key => {
          formDataObj.append(key, formData[key]);
        });
  
        // Add file fields
        if (collectionDataImage) formDataObj.append('collection_data_image', collectionDataImage);
  
        const response = await axios.put(`${BASE_URL}/collection`, formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        if (response.data.success) {
          setData(response.data.data);
          toast.success('Collection section updated successfully');
        }
      } catch (err) {
        toast.error('Failed to update collection section');
        console.error(err);
      }
    };
  
    const handleReset = () => {
      setFormData({
        collection_data_section_title: data.collection_data_section_title || '',
        collection_data_title: data.collection_data_title || '',
        collection_data_desc: data.collection_data_desc || '',
      });
      setCollectionDataImage(null);
    };
  
    return (
      <SectionManagement
        title="Collection"
        sectionKey="collection_data_section"
        enabled={data.collection_data_section}
        onToggle={() => onToggle("collection_data_section", !data.collection_data_section)}
        onSave={handleSave}
        onReset={handleReset}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Data Section Title
            </label>
            <input
              type="text"
              name="collection_data_section_title"
              value={formData.collection_data_section_title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Data Title
            </label>
            <input
              type="text"
              name="collection_data_title"
              value={formData.collection_data_title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Data Description
            </label>
            <textarea
              name="collection_data_desc"
              value={formData.collection_data_desc}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Data Image
            </label>
            <input
              type="file"
              name="collection_data_image"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {collectionDataImage && (
              <div className="mt-2">
                <img src={URL.createObjectURL(collectionDataImage)} alt="Collection Data Image Preview" className="mt-1 h-12 object-contain" />
              </div>
            )}
            {data.collection_data_image && !collectionDataImage && (
              <div className="mt-2">
                <span className="text-sm text-gray-500">Current: {data.collection_data_image.split('/').pop()}</span>
                <img src={data.collection_data_image} alt="Collection Data Image" className="mt-1 h-12 object-contain" />
              </div>
            )}
          </div>
        </div>
      </SectionManagement>
    );
};

const JewelAtGlanceSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    jewel_at_glance_title: data.jewel_at_glance_title || '',
    jewel_at_glance_desc: data.jewel_at_glance_desc || '',
  });

  const [jewelAtGlanceImages, setJewelAtGlanceImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setJewelAtGlanceImages([...e.target.files]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('collection_homepage_name', data.collection_homepage_name);

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file fields
      jewelAtGlanceImages.forEach(file => {
        formDataObj.append('jewel_at_glance_images', file);
      });

      const response = await axios.put(`${BASE_URL}/jewel-at-glance`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Jewel At Glance section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Jewel At Glance section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      jewel_at_glance_title: data.jewel_at_glance_title || '',
      jewel_at_glance_desc: data.jewel_at_glance_desc || '',
    });
    setJewelAtGlanceImages([]);
  };

  return (
    <SectionManagement
      title="Jewel At Glance"
      sectionKey="jewel_at_glance_section"
      enabled={data.jewel_at_glance_section}
      onToggle={() => onToggle("jewel_at_glance_section", !data.jewel_at_glance_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jewel At Glance Title
          </label>
          <input
            type="text"
            name="jewel_at_glance_title"
            value={formData.jewel_at_glance_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jewel At Glance Description
          </label>
          <textarea
            name="jewel_at_glance_desc"
            value={formData.jewel_at_glance_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jewel At Glance Images
          </label>
          <input
            type="file"
            name="jewel_at_glance_images"
            onChange={handleFileChange}
            multiple
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {data.jewel_at_glance_images && data.jewel_at_glance_images.length > 0 && (
            <div className="mt-2 flex gap-4">
              {data.jewel_at_glance_images.map((image, index) => (
                <img key={index} src={image} alt={`Jewel At Glance ${index}`} className="mt-1 h-12 object-contain" />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

const CategorySection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    category_section_title: data.category_section_title || '',
    category_section_desc: data.category_section_desc || '',
  });

  const [categorySectionImages, setCategorySectionImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCategorySectionImages([...e.target.files]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('collection_homepage_name', data.collection_homepage_name);

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file fields
      categorySectionImages.forEach(file => {
        formDataObj.append('category_section_images', file);
      });

      const response = await axios.put(`${BASE_URL}/category-section`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Category Section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Category Section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      category_section_title: data.category_section_title || '',
      category_section_desc: data.category_section_desc || '',
    });
    setCategorySectionImages([]);
  };

  return (
    <SectionManagement
      title="Category Section"
      sectionKey="category_section"
      enabled={data.category_section}
      onToggle={() => onToggle("category_section", !data.category_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Section Title
          </label>
          <input
            type="text"
            name="category_section_title"
            value={formData.category_section_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Section Description
          </label>
          <textarea
            name="category_section_desc"
            value={formData.category_section_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Section Images
          </label>
          <input
            type="file"
            name="category_section_images"
            onChange={handleFileChange}
            multiple
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!data.category_section_images && categorySectionImages.length > 0 && (
            <div className="my-2 gap-3 flex">
              {categorySectionImages.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt={`Category Section ${index}`} className="mt-1 h-12 object-contain" />
              ))}
            </div>
          )}
          {data.category_section_images && data.category_section_images.length > 0 && (
            <div className="my-2 gap-3 flex ">
              {data.category_section_images.map((image, index) => (
                <img key={index} src={image} alt={`Category Section ${index}`} className="mt-1 h-12 object-contain" />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

// updated
const TopicsSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    topic_section_title: data.topic_section_title || '',
  });
   
  const [topics, setTopics] = useState(data.topics || []);
  const [newTopic, setNewTopic] = useState({
    topicTitle: '',
    topicDesc: '',
    topicImages: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewTopicChange = (e) => {
    const { name, value } = e.target;
    setNewTopic(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewTopic(prev => ({ ...prev, [name]: [...files] }));
  };

  const handleAddTopic = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('collection_homepage_name', data.collection_homepage_name);

      // Add text fields
      Object.keys(newTopic).forEach(key => {
        if (key !== 'topicImages') {
          formDataObj.append(key, newTopic[key]);
        }
      });

      // Add file fields
      newTopic.topicImages.forEach(file => {
        formDataObj.append('topicImages', file);
      });
      console.log(`${BASE_URL}/topic`);
      
      const response = await axios.post(`${BASE_URL}/topic`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        const updatedTopics = [...topics, response.data.data];
        setTopics(updatedTopics);
        setData(prevData => ({ ...prevData, topics: updatedTopics }));
        setNewTopic({
          topicTitle: '',
          topicDesc: '',
          topicImages: [],
        });
        toast.success('Topic added successfully');
      }
    } catch (err) {
      toast.error('Failed to add topic');
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {

      const Obj = {
        collection_homepage_name: data.collection_homepage_name,
        topic_section_title: formData.topic_section_title
      };
      
      const response = await axios.put(`${BASE_URL}/topic`, Obj, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setFormData(response.data.data)
        toast.success('Topic Updated successfully');
      }
    } catch (err) {
      toast.error('Failed to add topic');
      console.error(err);
    }
  };

  const handleDeleteTopic = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/topic`, {
        params: { id,collection_homepage_name:data.collection_homepage_name },
      });
        const updatedTopics = topics.filter(topic => topic._id !== id);
        setTopics(updatedTopics);
        setData(prevData => ({ ...prevData, topics: updatedTopics }));
      if (response.data.success) {
        setTopics(response.data.data.topics);
        toast.success('Topic deleted successfully');
      }
    } catch (err) {
      toast.error('Failed to delete topic');
      console.error(err);
    }
  };

  return (
    <SectionManagement
      title="Topics"
      sectionKey="topic_section"
      enabled={data.topic_section}
      onToggle={() => onToggle("topic_section", !data.topic_section)}
      onSave={handleSave}
      onReset={() => setNewTopic({ topicTitle: '', topicDesc: '', topicImages: [] })}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic Section Title
          </label>
          <input
            type="text"
            name="topic_section_title"
            value={formData.topic_section_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Topic Title
          </label>
          <input
            type="text"
            name="topicTitle"
            value={newTopic.topicTitle}
            onChange={handleNewTopicChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Topic Description
          </label>
          <textarea
            name="topicDesc"
            value={newTopic.topicDesc}
            onChange={handleNewTopicChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Topic Images
          </label>
          <input
            type="file"
            name="topicImages"
            onChange={handleFileChange}
            multiple
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {newTopic.topicImages.length > 0 && (
            <div className="mt-2">
              {newTopic.topicImages.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt={`Topic ${index}`} className="mt-1 h-12 object-contain" />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleAddTopic}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Topic
        </button>

        <div className="space-y-4 mt-4">
          {topics.map((topic, index) => (
            <div key={topic._id || index} className="p-4 border border-gray-200 rounded">
              <div className="flex justify-between">
                <h4 className="font-medium">{topic.topicTitle}</h4>
                <button
                  onClick={() => handleDeleteTopic(topic._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{topic.topicDesc}</p>
              {topic.topicImages && topic.topicImages.length > 0 && (
                <div className="mt-2">
                  {topic.topicImages.map((image, index) => (
                    <img key={index} src={image} alt={`Topic ${index}`} className="mt-1 h-12 object-contain" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionManagement>
  );
};

const CuratorThoughtSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    curator_thought_section_title: data.curator_thought_section_title || '',
    curator_name: data.curator_name || '',
    curator_thought_desc: data.curator_thought_desc || '',
  });

  const [curatorProfileImg, setCuratorProfileImg] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCuratorProfileImg(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('collection_homepage_name', data.collection_homepage_name);

      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });

      // Add file fields
      if (curatorProfileImg) formDataObj.append('curator_profileImg', curatorProfileImg);

      const response = await axios.put(`${BASE_URL}/curator-thought`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Curator Thought section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update Curator Thought section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      curator_thought_section_title: data.curator_thought_section_title || '',
      curator_name: data.curator_name || '',
      curator_thought_desc: data.curator_thought_desc || '',
    });
    setCuratorProfileImg(null);
  };

  return (
    <SectionManagement
      title="Curator Thought"
      sectionKey="curator_thought_section"
      enabled={data.curator_thought_section}
      onToggle={() => onToggle("curator_thought_section", !data.curator_thought_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curator Thought Section Title
          </label>
          <input
            type="text"
            name="curator_thought_section_title"
            value={formData.curator_thought_section_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curator Name
          </label>
          <input
            type="text"
            name="curator_name"
            value={formData.curator_name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curator Thought Description
          </label>
          <textarea
            name="curator_thought_desc"
            value={formData.curator_thought_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curator Profile Image
          </label>
          <input
            type="file"
            name="curator_profileImg"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {curatorProfileImg && (
            <div className="mt-2">
              <img src={URL.createObjectURL(curatorProfileImg)} alt="Curator Profile Preview" className="mt-1 h-12 object-contain" />
            </div>
          )}
          {data.curator_profileImg && !curatorProfileImg && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data.curator_profileImg.split('/').pop()}</span>
              <img src={data.curator_profileImg} alt="Curator Profile" className="mt-1 h-12 object-contain" />
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

export {GeneralSection,CollectionSection,JewelAtGlanceSection,CategorySection,TopicsSection,CuratorThoughtSection}

  
  