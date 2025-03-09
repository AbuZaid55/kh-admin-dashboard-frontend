import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GeneralSection,
  HeroSection,
  AdsSection,
  LegacySection,
  CuratorSection,
  TrendingSection,
  PromiseSection,
  // Add other sections as needed
} from './Sections';



export const BASE_URL="http://localhost:4000/eshop/customization";
// export const BASE_URL +/eshop/customization;     IN PRODUCTION

const EshopHomepageManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/landing-page`);
        setData(response.data.landingPage);
        
      } catch (err) {
        setError('Failed to fetch landing page data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPageData();
  }, []);

  const handleToggleSection = async (section, value) => {
    try {
      const response = await axios.put(`${BASE_URL}/toggle-section`, {
        section,
        value
      });

      if (response.data.success) {
        setData(prevData => ({
          ...prevData,
          [section]: value
        }));

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
      <h1 className="text-2xl font-bold mb-6">Eshop Landing Page Management</h1>

      <GeneralSection
        data={data}
        setData={setData}
        onToggle={handleToggleSection}
      />

      <HeroSection
        data={data}
        setData={setData}
        onToggle={handleToggleSection}
      />

      <AdsSection
        data={data}
        setData={setData}
        onToggle={handleToggleSection}
      />
      <LegacySection
        data={data}
        setData={setData}
        onToggle={handleToggleSection}
      />
      <CuratorSection
        data={data}
        setData={setData}
        onToggle={handleToggleSection}
      />
      <TrendingSection
        data={data}
        setData={setData}
        onToggle={handleToggleSection}
      />
      <PromiseSection
        data={data}
        setData={setData}
        onToggle={handleToggleSection}
      />

      
    </div>
  );
};

export default EshopLandingPageAdmin;