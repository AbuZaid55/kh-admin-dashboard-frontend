import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BridalEditSection, ComingSoonSection, FAQSection, GeneralSection, HallmarkSection, HighJewelSection, PolkiEditSection, PromiseSection, QOHSection, StoreFeatureSection, StoreSection } from './Sections';


export const BASE_URL="http://localhost:3000/khwaahish/customization/homepage";
// export const BASE_URL + /khwaahish/customization/homepage;     IN PRODUCTION

// Main component to manage all sections
const  KhwaahishHomepageManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load homepage data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/`);
        setData(response.data.data);
      } catch (err) {
        setError('Failed to load homepage data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Toggle section visibility
  const handleToggleSection = async (section, value) => {
    try {
      const response = await axios.put(`${BASE_URL}/toggle-section`, {
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
      <h1 className="text-2xl font-bold mb-6">KHWAAHISH Homepage Management</h1>
      
      <GeneralSection
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      />
      
      <HallmarkSection
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      />
      
      <HighJewelSection 
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      />
      
      <QOHSection
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      />
      

      <BridalEditSection
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection}
      />

     <PolkiEditSection
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection}
      />
      
      <PromiseSection 
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      />
      
      <ComingSoonSection 
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      />
      
      <StoreSection 
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      />

      <StoreFeatureSection
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      />
      
      <FAQSection 
        data={data} 
        setData={setData} 
        onToggle={handleToggleSection} 
      /> 
    </div>
  );
};


export default KhwaahishHomepageManager;