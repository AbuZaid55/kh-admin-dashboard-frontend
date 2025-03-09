import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GeneralSection,
  CollectionSection,
  JewelAtGlanceSection,
  CategorySection,
  TopicsSection,
  CuratorThoughtSection,
} from './Section';

export const BASE_URL="http://localhost:4000/khwaahish/customization/homepage/collectio-homepage";
// export const BASE_URL= BASE_URL + /khwaahish/customization/homepage/collectio-homepage;     IN PRODUCTION

const allowedCollectionHomepage = ["Asai","Noor", "Bridal Edit", "Polki Edit","Pache"]

const CollectionHomepageKHManager = () => {
  const [selectedCollection, setSelectedCollection] = useState('');
  const [collectionData, setCollectionData] = useState(null);

  useEffect(() => {
    if (selectedCollection) {
      fetchCollectionData(selectedCollection);
    }
  }, [selectedCollection]);
  const fetchCollectionData = async (collection_homepage_name) => {
    try {
      const response = await axios.get(`${BASE_URL}/`, {
        params: { collection_homepage_name }
      });
      if (response.data.success) {
        setCollectionData(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch collection data');
      console.error(error);
    }
  };

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  const handleToggleSection = async (sectionKey, value) => {
    try {
        
      const response = await axios.put(`${BASE_URL}/toggle-section`, {
        collection_homepage_name: selectedCollection,
        section: sectionKey,
        value
      });
      if (response.data.success) {
        setCollectionData(prev => ({
          ...prev,
          [sectionKey]: response.data.value
        }));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to toggle section');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Collection Homepages OF KHWAAHISH</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Collection Homepage</label>
        <select
          value={selectedCollection}
          onChange={handleCollectionChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a collection</option>
          {allowedCollectionHomepage.map((collection, index) => (
            <option key={index} value={collection}>{collection}</option>
          ))}
        </select>
      </div>

      {collectionData && (
        <>
          <GeneralSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          <CollectionSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          <JewelAtGlanceSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          <CategorySection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          <TopicsSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          <CuratorThoughtSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
        </>
      )}
    </div>
  );
};

export default CollectionHomepageKHManager;