import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from './EshopHomepageManager';
import SectionManagement from '../components/SectionManagement';


export const GeneralSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    scroll_text: data.scroll_text || '',
    brand_web_link: data.brand_web_link || '',
    logo_text: data.logo_text || '',
  });

  const [logo, setLogo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
    //   formDataObj.append('section', 'general');
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });
      if (logo) formDataObj.append('logo', logo);

      const response = await axios.put(`${BASE_URL}/landing-page`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
      scroll_text: data.scroll_text || '',
      brand_web_link: data.brand_web_link || '',
      logo_text: data.logo_text || '',
    });
    setLogo(null);
  };

  return (
    <SectionManagement
      title="General"
      sectionKey="general"
      enabled={data.general_section}
      onToggle={() => onToggle("general_section", !data.general_section)}
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
            Brand Web Link
          </label>
          <input
            type="text"
            name="brand_web_link"
            value={formData.brand_web_link}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo Text
          </label>
          <input
            type="text"
            name="logo_text"
            value={formData.logo_text}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          {logo && (
            <div className="mt-2">
              <img src={URL.createObjectURL(logo)} alt="Logo Preview" className="mt-1 h-12 object-contain" />
            </div>
          )}
          {data.logo && !logo && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data.logo.split('/').pop()}</span>
              <img src={`http://localhost:3000/${data.logo}`} alt="Logo" className="mt-1 h-12 object-contain" />
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

// Implement other sections similarly...

export const HeroSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    hero_short_desc: data.hero_short_desc || '',
    hero_desc: data.hero_desc || '',
    hero_message: data.hero_message || '',
  });

  const [heroDesktopImg, setHeroDesktopImg] = useState(null);
  const [heroMobileImg, setHeroMobileImg] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (field === 'hero_desktop_img') {
      setHeroDesktopImg(file);
    } else if (field === 'hero_mobile_img') {
      setHeroMobileImg(file);
    }
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
    //   formDataObj.append('section', 'hero');
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });
      if (heroDesktopImg) formDataObj.append('hero_desktop_img', heroDesktopImg);
      if (heroMobileImg) formDataObj.append('hero_mobile_img', heroMobileImg);

      const response = await axios.put(`${BASE_URL}/landing-page`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Hero section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update hero section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      hero_short_desc: data.hero_short_desc || '',
      hero_desc: data.hero_desc || '',
      hero_message: data.hero_message || '',
    });
    setHeroDesktopImg(null);
    setHeroMobileImg(null);
  };

  return (
    <SectionManagement
      title="Hero"
      sectionKey="hero_section"
      enabled={data.hero_section}
      onToggle={() => onToggle("hero_section", !data.hero_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
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
            Hero Message
          </label>
          <textarea
            name="hero_message"
            value={formData.hero_message}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Desktop Image
          </label>
          <input
            type="file"
            name="hero_desktop_img"
            onChange={(e) => handleFileChange(e, 'hero_desktop_img')}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {heroDesktopImg && (
            <div className="mt-2">
              <img src={URL.createObjectURL(heroDesktopImg)} alt="Hero Desktop Image Preview" className="mt-1 h-12 object-contain" />
            </div>
          )}
          {data.hero_desktop_img && !heroDesktopImg && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data.hero_desktop_img.split('/').pop()}</span>
              <img src={`http://localhost:3000/${data.hero_desktop_img}`} alt="Hero Desktop Image" className="mt-1 h-12 object-contain" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Mobile Image
          </label>
          <input
            type="file"
            name="hero_mobile_img"
            onChange={(e) => handleFileChange(e, 'hero_mobile_img')}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {heroMobileImg && (
            <div className="mt-2">
              <img src={URL.createObjectURL(heroMobileImg)} alt="Hero Mobile Image Preview" className="mt-1 h-12 object-contain" />
            </div>
          )}
          {data.hero_mobile_img && !heroMobileImg && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data.hero_mobile_img.split('/').pop()}</span>
              <img src={`http://localhost:3000/${data.hero_mobile_img}`} alt="Hero Mobile Image" className="mt-1 h-12 object-contain" />
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

// Implement other sections similarly...

export const AdsSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    ad_title: data.ad_title || '',
    ad_desc: data.ad_desc || '',
  });

  const [adVideo, setAdVideo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAdVideo(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
    //   formDataObj.append('section', 'ads');
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });
      if (adVideo) formDataObj.append('ad_video', adVideo);

      const response = await axios.put(`${BASE_URL}/landing-page`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Ads section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update ads section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      ad_title: data.ad_title || '',
      ad_desc: data.ad_desc || '',
    });
    setAdVideo(null);
  };

  return (
    <SectionManagement
      title="Ads"
      sectionKey="ads_section"
      enabled={data.ads_section}
      onToggle={() => onToggle("ads_section", !data.ads_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
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
            Ad Description
          </label>
          <textarea
            name="ad_desc"
            value={formData.ad_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
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
                <source src={`http://localhost:3000/${data.ad_video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

// Implement other sections similarly...

export const LegacySection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    legacy_title: data.legacy_title || '',
    legacy_desc_1: data.legacy_desc_1 || '',
    legacy_desc_2: data.legacy_desc_2 || '',
  });


  const [legacyImage, setLegacyImage] = useState(null);
  console.log(data);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setLegacyImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
    //   formDataObj.append('section', 'legacy');
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });
      if (legacyImage) formDataObj.append('legacy_img', legacyImage);

      const response = await axios.put(`${BASE_URL}/landing-page`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Legacy section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update legacy section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
        legacy_title: data.legacy_title || '',
        legacy_desc_1: data.legacy_desc_1 || '',
        legacy_desc_2: data.legacy_desc_2 || '',
    });
    setLegacyImage(null);
  };

  return (
    <SectionManagement
      title="Legacy"
      sectionKey="legacy_section"
      enabled={data.legacy_section}
      onToggle={() => onToggle("legacy_section", !data.legacy_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Legacy Title
          </label>
          <input
            type="text"
            name="legacy_title"
            value={formData.legacy_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Legacy Description
          </label>
          <textarea
            name="legacy_desc"
            value={formData.legacy_desc_1}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Legacy Description
          </label>
          <textarea
            name="legacy_desc"
            value={formData.legacy_desc_2}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Legacy Image
          </label>
          <input
            type="file"
            name="legacy_img"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {legacyImage && (
            <div className="mt-2">
              <img src={URL.createObjectURL(legacyImage)} alt="Legacy Image Preview" className="mt-1 h-12 object-contain" />
            </div>
          )}
          {data.legacy_img && !legacyImage && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data.legacy_img.split('/').pop()}</span>
              <img src={`http://localhost:3000/${data.legacy_img}`} alt="Legacy Image" className="mt-1 h-12 object-contain" />
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

export const CuratorSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    curator_title: data.curator_title || '',
    curator_desc_1: data.curator_desc_1 || '',
    curator_desc_2: data.curator_desc_2 || '',
  });

  const [curatorImage, setCuratorImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCuratorImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
    //   formDataObj.append('section', 'curator');
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });
      if (curatorImage) formDataObj.append('curator_img', curatorImage);

      const response = await axios.put(`${BASE_URL}/landing-page`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Curator section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update curator section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
        curator_title: data.curator_title || '',
        curator_desc_1: data.curator_desc_1 || '',
        curator_desc_2: data.curator_desc_2 || '',
    });
    setCuratorImage(null);
  };

  return (
    <SectionManagement
      title="Curator"
      sectionKey="curator_section"
      enabled={data.curator_section}
      onToggle={() => onToggle("curator_section", !data.curator_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curator Title
          </label>
          <input
            type="text"
            name="curator_title"
            value={formData.curator_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curator Description 1
          </label>
          <textarea
            name="curator_desc_1"
            value={formData.curator_desc_1}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curator Description 1
          </label>
          <textarea
            name="curator_desc_2"
            value={formData.curator_desc_2}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curator Image
          </label>
          <input
            type="file"
            name="curator_img"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {curatorImage && (
            <div className="mt-2">
              <img src={URL.createObjectURL(curatorImage)} alt="Curator Image Preview" className="mt-1 h-12 object-contain" />
            </div>
          )}
          {data.curator_img && !curatorImage && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data.curator_img.split('/').pop()}</span>
              <img src={`http://localhost:3000/${data.curator_img}`} alt="Curator Image" className="mt-1 h-12 object-contain" />
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

export const TrendingSection = ({ data, setData, onToggle }) => {
  const [formData, setFormData] = useState({
    trending_title: data.trending_title || '',
    trending_desc: data.trending_desc || '',
    trending_slug_name: data.trending_slug_name || '',
    trending_slug: data.trending_slug || '',
  });


  const [trendingImage, setTrendingImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTrendingImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
    //   formDataObj.append('section', 'trending');
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });
      if (trendingImage) formDataObj.append('trending_img', trendingImage);

      const response = await axios.put(`${BASE_URL}/landing-page`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setData(response.data.data);
        toast.success('Trending section updated successfully');
      }
    } catch (err) {
      toast.error('Failed to update trending section');
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
        trending_title: data.trending_title || '',
        trending_desc: data.trending_desc || '',
        trending_slug_name: data.trending_slug_name || '',
        trending_slug: data.trending_slug || '',
    });
    setTrendingImage(null);
  };

  return (
    <SectionManagement
      title="Trending"
      sectionKey="trending_section"
      enabled={data.trending_section}
      onToggle={() => onToggle("trending_section", !data.trending_section)}
      onSave={handleSave}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trending Title
          </label>
          <input
            type="text"
            name="trending_title"
            value={formData.trending_title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trending Description
          </label>
          <textarea
            name="trending_desc"
            value={formData.trending_desc}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trending Slug Name
          </label>
          <textarea
            name="trending_slug_name"
            value={formData.trending_slug_name}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trending Slug
          </label>
          <textarea
            name="trending_slug"
            value={formData.trending_slug}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trending Image
          </label>
          <input
            type="file"
            name="trending_img"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {trendingImage && (
            <div className="mt-2">
              <img src={URL.createObjectURL(trendingImage)} alt="Trending Image Preview" className="mt-1 h-12 object-contain" />
            </div>
          )}
          {data.trending_img && !trendingImage && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Current: {data.trending_img.split('/').pop()}</span>
              <img src={`http://localhost:3000/${data.trending_img}`} alt="Trending Image" className="mt-1 h-12 object-contain" />
            </div>
          )}
        </div>
      </div>
    </SectionManagement>
  );
};

export const PromiseSection = ({ data, setData, onToggle }) => {
    const [formData, setFormData] = useState({
        promise_title: data.promise_title || '',
        promise_desc: data.promise_desc || '',
        description:data.description || ''
    });

    const [promiseImage, setPromiseImage] = useState(null);
    const [promisesList, setPromisesList] = useState(data.promises_list || []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setPromiseImage(e.target.files[0]);
    };

    const handleSave = async () => {
        try {
            const formDataObj = new FormData();
            Object.keys(formData).forEach(key => {
                formDataObj.append(key, formData[key]);
            });

            const response = await axios.put(`${BASE_URL}/landing-page`, formDataObj, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setData(response.data.data);
                toast.success('Promise section updated successfully');
            }
        } catch (err) {
            toast.error('Failed to update promise section');
            console.error(err);
        }
    };

    const handleReset = () => {
        setFormData({
            promise_title: data.promise_title || '',
            promise_desc: data.promise_desc || '',
        });
        setPromiseImage(null);
    };

    const handleAddPromise = async () => {
        try {
            const formDataObj = new FormData();
            formDataObj.append('description', formData.description);
            if (promiseImage) formDataObj.append('image', promiseImage);

           await axios.post(`${BASE_URL}/landing-page/promises`, formDataObj, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
                setPromisesList([...promisesList, { description: formData.promise_desc, image: promiseImage.name }]);
                toast.success('Promise added successfully');
        } catch (err) {
            toast.error('Failed to add promise');
            console.error(err);
        }
    };

    const handleDeletePromise = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/landing-page/promises/${id}`);

            if (response.data.message === 'Promise deleted successfully') {
                setPromisesList(promisesList.filter(promise => promise._id !== id));
                toast.success('Promise deleted successfully');
            }
        } catch (err) {
            toast.error('Failed to delete promise');
            console.error(err);
        }
    };

    return (
        <SectionManagement
            title="Promise"
            sectionKey="promise_section"
            enabled={data.promise_section}
            onToggle={() => onToggle("promise_section", !data.promise_section)}
            onSave={handleSave}
            onReset={handleReset}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promise Title
                    </label>
                    <input
                        type="text"
                        name="promise_title"
                        value={formData.promise_title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promise Description
                    </label>
                    <textarea
                        name="promise_desc"
                        value={formData.promise_desc}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <h2 className='text-green-400 '>ADD PROMISES</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promise Description
                    </label>
                    <input 
                        type='text'
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></input>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promise Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {promiseImage && (
                        <div className="mt-2">
                            <img src={URL.createObjectURL(promiseImage)} alt="Promise Image Preview" className="mt-1 h-12 object-contain" />
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleAddPromise}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Add Promise
                </button>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Existing Promises</h3>
                    <ul className="mt-2 space-y-2">
                        {promisesList.map(promise => (
                            <li key={promise._id} className="flex justify-between items-center p-2 border border-gray-300 rounded">
                                <div>
                                    <p className="text-sm font-medium">{promise.description}</p>
                                    {promise.image && (
                                        <img src={`http://localhost:3000/${promise.image}`} alt="Promise" className="mt-1 h-12 object-contain" />
                                    )}
                                </div>
                                <button 
                                    onClick={() => handleDeletePromise(promise._id)}
                                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionManagement>
    );
};
