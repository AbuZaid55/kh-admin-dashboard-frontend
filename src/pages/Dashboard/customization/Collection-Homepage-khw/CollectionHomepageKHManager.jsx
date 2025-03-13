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


export const BASE_URL="http://localhost:3000/khwaahish/customization/homepage/collectio-homepage";
// export const BASE_URL= BASE_URL + /khwaahish/customization/homepage/collectio-homepage;     IN PRODUCTION

const allowedCollectionHomepage = ["Aasai","Noor", "Bridal Edit", "Polki Edit","Pache"]

const CollectionHomepageKHManager = ({ selectedCollection }) => {
  const [collectionData, setCollectionData] = useState(null);
  
  useEffect(() => {
    if (selectedCollection) {
      fetchCollectionData(selectedCollection);
    }
  }, [selectedCollection]);

  const fetchCollectionData = async (collection_homepage_name) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: { collection_homepage_name }
      });
      if (response.data.success) {
        setCollectionData(response.data.data);
        toast.success(`Fetched Data For ${collection_homepage_name}`);
      }
    } catch (error) {
      toast.error('Failed to fetch collection data');
      console.error(error);
    }
  };

  const handleToggleSection = async (sectionKey, value) => {
    try {
      const response = await axios.put(`${BASE_URL}/toggle-section`, {
        collection_homepage_name: selectedCollection,
        section: sectionKey,
        value
      });
      if (response.data.success) {
        setCollectionData(response.data.data);
        toast.success(`Toggled Visibility of collection ${selectedCollection} Section ${sectionKey}`);
      }
    } catch (error) {
      toast.error('Failed to toggle section');
      console.error(error);
    }
  };
  console.log(collectionData);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Collection Homepages OF KHWAAHISH</h1>
      {collectionData && (
        (selectedCollection === "Noor" && (
          <>
            <GeneralSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <JewelAtGlanceSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          </>
        )) ||
        (selectedCollection === "Aasai" && (
          <>
            <GeneralSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <TopicsSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          </>
        ))||
        (selectedCollection === "Bridal Edit" && (
          <>
            <GeneralSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <TopicsSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          </>
        ))||
        (selectedCollection === "Polki Edit" && (
          <>
            <GeneralSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <JewelAtGlanceSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <TopicsSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <CuratorThoughtSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          </>
        ))||
        (selectedCollection === "Pache" && (
          <>
            <GeneralSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <CollectionSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <JewelAtGlanceSection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
            <CategorySection data={collectionData} setData={setCollectionData} onToggle={handleToggleSection} />
          </>
        ))
      )}
    </div>
  );
};

export default CollectionHomepageKHManager;
