import React, { useState, useEffect } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import axios from "axios";

const API_BASE_URL =
  "http://localhost:4000/api/v1/collection-homepage/customization";

function CollapsibleSection({
  title,
  enabledKey, // e.g. "hero_section", "ad_campaign_section", etc.
  formData,
  handleInputChange,
  children,
}) {
  // If enabledKey is present in formData, we treat that as the "enable" toggle for the section.
  const hasEnableToggle = enabledKey && enabledKey in formData;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className="border p-4 mb-4 rounded bg-white">
      {/* Header row with Title, optional Enabled toggle, and Expand/Collapse button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          {hasEnableToggle && (
            // <label className="flex items-center space-x-2">
            //   <input
            //     type="checkbox"
            //     name={enabledKey}
            //     checked={!!formData[enabledKey]}
            //     onChange={handleInputChange}
            //   />
            //   <span className="text-sm">
            //     {formData[enabledKey] ? "Enabled" : "Disabled"}
            //   </span>
            // </label>
             <label className="inline-flex items-center cursor-pointer">
             <input
               type={enabledKey}
               className="sr-only peer"
               checked={!!formData[enabledKey]}
               onChange={handleInputChange}
             />
             <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
             <span className="ms-3 text-sm font-medium text-gray-900"> {formData[enabledKey] ? "Enabled" : "Disabled"}</span>
           </label>
          )}
        </div>
        <button
          type="button"
          onClick={toggleExpand}
          className="text-blue-600 cursor-pointer focus:outline-none active:scale-95 transition transform duration-75 ease-in-out"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Section content only visible if expanded */}
      {isExpanded && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function CollectionHomepageAdmin({selectedCollection}) {
  const [formData, setFormData] = useState({
    homepage_collection_name: "",
    scroll_text: "",
    brand_web_link: "",
    collection_logo: "",
    collection_logo_text: "",

    // Hero
    hero_section: false, // if you want a separate toggle for hero
    hero_mobile_banner_image: "",
    hero_desktop_banner_image: "",
    hero_title: "",
    hero_title_image: "",
    hero_desc: "",

    // JAG
    jag_section: false,
    jag_section_title: "",
    jag_section_short_desc: "",
    jag_list: [],

    // Ads
    ad_campaign_section: false,
    ad_campaign_title: "",
    ad_campaign_video: "",

    // QOH
    qoh_section: false,
    qoh_short_desc: "",
    qoh_long_desc: "",

    // Hallmark
    hallmark_section: false,
    hallmark_sec_desc: "",
    hallmark_slug_name: "",
    hallmark_slug: "",
    hallmark_list: [],

    // Legacy
    legacy_section: false,
    legacy_img: "",
    lagacy_title: "",
    legacy_desc: "",

    // Curator
    curator_section: false,
    curator_img: "",
    curator_title: "",
    curator_desc: "",

    // Promise
    promise_section: false,
    promise_title: "",
    promise_desc: "",
    promises_list: [],
    newPromiseDescription: "",

    // Store
    store_image: "",
    store_title: "",
    store_slug_name: "",
    store_slug: "",
  });

  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});
  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Mapping of section names to their field keys.
  const sectionFields = {
    general: ["scroll_text", "brand_web_link", "collection_logo_text", "collection_logo"],
    hero: [
      "hero_section",
      "hero_title",
      "hero_desc",
      "hero_title_image",
      "hero_mobile_banner_image",
      "hero_desktop_banner_image",
    ],
    ads: ["ad_campaign_section", "ad_campaign_title", "ad_campaign_video"],
    jag: ["jag_section", "jag_section_title", "jag_section_short_desc"],
    qoh: ["qoh_section", "qoh_short_desc", "qoh_long_desc"],
    hallmark: ["hallmark_section", "hallmark_sec_desc", "hallmark_slug_name", "hallmark_slug"],
    legacy: ["legacy_section", "lagacy_title", "legacy_desc", "legacy_img"],
    curator: ["curator_section", "curator_title", "curator_desc", "curator_img"],
    promise: ["promise_section", "promise_title", "promise_desc", "newPromiseDescription"],
    store: ["store_image", "store_title", "store_slug_name", "store_slug"],
  };

  useEffect(() => {
    if (selectedCollection) {
      setFormData((prev) => ({
        ...prev,
        homepage_collection_name: selectedCollection,
      }));

      const fetchHomepage = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `${API_BASE_URL}/${selectedCollection}`
          );
          if (response.data.data) {
            setHomepage(response.data.data);
            setFormData(response.data.data);
          }
        } catch (err) {
          setError("Failed to load collection homepage data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchHomepage();
    }
  }, [selectedCollection]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      setFiles((prev) => ({ ...prev, [name]: file }));

      const fileUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [name]: fileUrl }));

      const previewElement = document.getElementById(`${name}-preview`);
      if (previewElement) {
        previewElement.src = fileUrl;
        previewElement.style.display = "block";
        previewElement.dataset.tempUrl = fileUrl;
        if (file.type.startsWith("video/")) {
          previewElement.load();
          previewElement.play().catch(() => {});
        }
      }
    }
  };

  // Global submit: update all changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage("");

    try {
      const submitData = new FormData();
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          submitData.append(key, value);
        }
      });
      // Append file fields, skipping sub–section file fields (they will be handled in section updates)
      Object.entries(files).forEach(([key, file]) => {
        if (!["jagImage", "newPromiseImage", "hallmarkImage"].includes(key)) {
          submitData.append(key, file);
        }
      });

      const response = await axios.put(
        `${API_BASE_URL}/${selectedCollection}`,
        submitData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFormData(response.data.data);
      setSuccessMessage("Homepage updated successfully!");

      // Cleanup preview URLs
      Object.values(previews).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
      setFiles({});
      setPreviews({});
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update homepage");
    } finally {
      setSaving(false);
    }
  };

  // New functions for per–section saving and resetting.
  const handleSectionSave = async (fields) => {
    setSaving(true);
    setError(null);
    setSuccessMessage("");
    try {
      const submitData = new FormData();
      fields.forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });
      // Append file fields for keys in this section
      Object.entries(files).forEach(([key, file]) => {
        if (fields.includes(key)) {
          submitData.append(key, file);
        }
      });

      const response = await axios.put(
        `${API_BASE_URL}/${selectedCollection}`,
        submitData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setFormData(response.data.data);
      setSuccessMessage("Section updated successfully!");
      // Cleanup previews for these fields
      fields.forEach((key) => {
        if (previews[key] && previews[key].startsWith("blob:")) {
          URL.revokeObjectURL(previews[key]);
        }
      });
      setFiles((prev) => {
        const newFiles = { ...prev };
        fields.forEach((key) => delete newFiles[key]);
        return newFiles;
      });
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        fields.forEach((key) => delete newPreviews[key]);
        return newPreviews;
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update section");
    } finally {
      setSaving(false);
    }
  };

  const handleSectionReset = (fields) => {
    if (homepage) {
      setFormData((prev) => {
        const newData = { ...prev };
        fields.forEach((key) => {
          newData[key] = homepage[key] || "";
        });
        return newData;
      });
      setFiles((prev) => {
        const newFiles = { ...prev };
        fields.forEach((key) => delete newFiles[key]);
        return newFiles;
      });
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        fields.forEach((key) => delete newPreviews[key]);
        return newPreviews;
      });
    }
  };

  // --- JAG List Management ---
  const handleAddJagItem = async (e) => {
    e.preventDefault();
    try {
      const jagFormData = new FormData();
      jagFormData.append("hallmarkImage", files.jagImage);
      await axios.post(
        `${API_BASE_URL}/${selectedCollection}/jag`,
        jagFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const response = await axios.get(`${API_BASE_URL}/${selectedCollection}`);
      setHomepage(response.data.data);
      setSuccessMessage("JAG item added successfully!");

      setFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles.jagImage;
        return newFiles;
      });
    } catch (err) {
      setError("Failed to add JAG item");
    }
  };

  const handleDeleteJagItem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${selectedCollection}/jag/${id}`);
      const response = await axios.get(`${API_BASE_URL}/${selectedCollection}`);
      setHomepage(response.data.data);
      setSuccessMessage("JAG item deleted successfully!");
    } catch (err) {
      setError("Failed to delete JAG item");
    }
  };

  // --- Hallmark List Management ---
  const handleAddHallmark = async (e) => {
    e.preventDefault();
    try {
      const hallmarkFormData = new FormData();
      hallmarkFormData.append("hallmarkImage", files.hallmarkImage);
      await axios.post(
        `${API_BASE_URL}/${selectedCollection}/hallmark`,
        hallmarkFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const response = await axios.get(`${API_BASE_URL}/${selectedCollection}`);
      setHomepage(response.data.data);
      setSuccessMessage("Hallmark added successfully!");

      setFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles.hallmarkImage;
        return newFiles;
      });
    } catch (err) {
      setError("Failed to add hallmark");
    }
  };

  const handleDeleteHallmark = async (id) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/${selectedCollection}/hallmark/${id}`
      );
      const response = await axios.get(`${API_BASE_URL}/${selectedCollection}`);
      setHomepage(response.data.data);
      setSuccessMessage("Hallmark deleted successfully!");
    } catch (err) {
      setError("Failed to delete hallmark");
    }
  };

  // --- Promise List Management ---
  const handleAddPromise = async (e) => {
    e.preventDefault();
    try {
      const promiseData = new FormData();
      promiseData.append("description", formData.newPromiseDescription || "");
      if (files.newPromiseImage) {
        promiseData.append("image", files.newPromiseImage);
      }
      await axios.post(
        `${API_BASE_URL}/${selectedCollection}/promise`,
        promiseData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const response = await axios.get(`${API_BASE_URL}/${selectedCollection}`);
      setHomepage(response.data.data);
      setSuccessMessage("Promise added successfully!");

      setFormData((prev) => ({ ...prev, newPromiseDescription: "" }));
      setFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles.newPromiseImage;
        return newFiles;
      });
      const promiseInput = document.getElementById("newPromiseImage");
      if (promiseInput) promiseInput.value = "";
      const promisePreview = document.getElementById("newPromiseImage-preview");
      if (promisePreview) promisePreview.style.display = "none";
    } catch (err) {
      setError("Failed to add promise");
    }
  };

  const handleDeletePromise = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${selectedCollection}/promise/${id}`);
      const response = await axios.get(`${API_BASE_URL}/${selectedCollection}`);
      setHomepage(response.data.data);
      setSuccessMessage("Promise deleted successfully!");
    } catch (err) {
      setError("Failed to delete promise");
    }
  };

  // If user hasn't chosen a collection yet
  if (!selectedCollection) {
    return (
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Select Collection
        </h1>
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedCollection("fazza")}
            className="bg-blue-500 text-white px-6 py-2 rounded mx-2 cursor-pointer hover:bg-blue-600 active:scale-95 transition transform duration-75 ease-in-out"
          >
            Fazza
          </button>
          <button
            onClick={() => setSelectedCollection("festara")}
            className="bg-green-500 text-white px-6 py-2 rounded mx-2 cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
          >
            Festara
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {selectedCollection.toUpperCase()} Collection Admin
      </h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Section */}
        <CollapsibleSection
          title="General Section"
          // no enable toggle for general, so pass no enabledKey
          formData={formData}
          handleInputChange={handleInputChange}
        >
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Scroll Text
                </label>
                <input
                  name="scroll_text"
                  value={formData.scroll_text}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Brand Web Link
                </label>
                <input
                  name="brand_web_link"
                  value={formData.brand_web_link}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Logo Text
                </label>
                <input
                  name="collection_logo_text"
                  value={formData.collection_logo_text}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo</label>
                <div className="border-dashed border-2 rounded p-4">
                  <input
                    type="file"
                    name="collection_logo"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  {(previews.collection_logo || formData.collection_logo) && (
                    <img
                      id="collection_logo-preview"
                      src={previews.collection_logo || formData.collection_logo}
                      className="w-32 h-32 object-contain"
                      alt="Logo preview"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.general)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.general)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
          </>
        </CollapsibleSection>

        {/* Hero Section */}
        <CollapsibleSection
          title="Hero Section"
          enabledKey="hero_section" // This ties to formData.hero_section
          formData={formData}
          handleInputChange={handleInputChange}
        >
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hero Title
                </label>
                <input
                  name="hero_title"
                  value={formData.hero_title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hero Description
                </label>
                <textarea
                  name="hero_desc"
                  value={formData.hero_desc}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hero Title Image
                </label>
                <div className="border-dashed border-2 rounded p-4">
                  <input
                    type="file"
                    name="hero_title_image"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  {(previews.hero_title_image || formData.hero_title_image) && (
                    <img
                      id="hero_title_image-preview"
                      src={previews.hero_title_image || formData.hero_title_image}
                      className="w-32 h-32 object-contain"
                      alt="Title image preview"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile Banner
                </label>
                <div className="border-dashed border-2 rounded p-4">
                  <input
                    type="file"
                    name="hero_mobile_banner_image"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  {(previews.hero_mobile_banner_image ||
                    formData.hero_mobile_banner_image) && (
                    <img
                      id="hero_mobile_banner_image-preview"
                      src={
                        previews.hero_mobile_banner_image ||
                        formData.hero_mobile_banner_image
                      }
                      className="w-full h-32 object-cover"
                      alt="Mobile banner preview"
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Desktop Banner
              </label>
              <div className="border-dashed border-2 rounded p-4 mb-4">
                <input
                  type="file"
                  name="hero_desktop_banner_image"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                {(previews.hero_desktop_banner_image ||
                  formData.hero_desktop_banner_image) && (
                  <img
                    id="hero_desktop_banner_image-preview"
                    src={
                      previews.hero_desktop_banner_image ||
                      formData.hero_desktop_banner_image
                    }
                    className="w-full h-32 object-cover"
                    alt="Desktop banner preview"
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.hero)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.hero)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
          </>
        </CollapsibleSection>

        {/* Ads Section */}
        <CollapsibleSection
          title="Ads Section"
          enabledKey="ad_campaign_section"
          formData={formData}
          handleInputChange={handleInputChange}
        >
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Campaign Title
                  </label>
                  <input
                    name="ad_campaign_title"
                    value={formData.ad_campaign_title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Campaign Video
                  </label>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      name="ad_campaign_video"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    {formData.ad_campaign_video && (
                      <video
                        id="ad_campaign_video-preview"
                        src={formData.ad_campaign_video}
                        controls
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </div>
                </div>
              
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.ads)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.ads)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
      
        </CollapsibleSection>

        {/* JAG Section */}
        <CollapsibleSection
          title="Jewels at Glance (JAG)"
          enabledKey="jag_section"
          formData={formData}
          handleInputChange={handleInputChange}
        >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      JAG Title
                    </label>
                    <input
                      name="jag_section_title"
                      value={formData.jag_section_title}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Short Description
                    </label>
                    <input
                      name="jag_section_short_desc"
                      value={formData.jag_section_short_desc}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Add New JAG Item</h3>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      name="jagImage"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    <button
                      onClick={handleAddJagItem}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 active:scale-95 transition transform duration-75 ease-in-out"
                    >
                      Add JAG Item
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Existing JAG Items
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {homepage?.jag_list?.map((item) => (
                      <div key={item._id} className="relative group">
                        <img
                          src={item.hallmarkImage}
                          className="w-full h-32 object-cover rounded"
                          alt="JAG item"
                        />
                        <button
                          onClick={() => handleDeleteJagItem(item._id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer hover:bg-red-600 active:scale-95 transition transform duration-75 ease-in-out"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.jag)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.jag)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
        </CollapsibleSection>

        {/* QOH Section */}
        <CollapsibleSection
          title="Queen of Hearts"
          enabledKey="qoh_section"
          formData={formData}
          handleInputChange={handleInputChange}
        >
          <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Short Description
                  </label>
                  <input
                    name="qoh_short_desc"
                    value={formData.qoh_short_desc}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Long Description
                  </label>
                  <textarea
                    name="qoh_long_desc"
                    value={formData.qoh_long_desc}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.qoh)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.qoh)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
          </>
        </CollapsibleSection>

        {/* Hallmark Section */}
        <CollapsibleSection
          title="Hallmark Section"
          enabledKey="hallmark_section"
          formData={formData}
          handleInputChange={handleInputChange}
        >
          
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Hallmark Description
                    </label>
                    <textarea
                      name="hallmark_sec_desc"
                      value={formData.hallmark_sec_desc || ""}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border rounded"
                    ></textarea>
                  </div>
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Hallmark Slug Name
                      </label>
                      <input
                        type="text"
                        name="hallmark_slug_name"
                        value={formData.hallmark_slug_name || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Hallmark Slug
                      </label>
                      <input
                        type="text"
                        name="hallmark_slug"
                        value={formData.hallmark_slug || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Add New Hallmark</h3>
                  <div className="bg-white p-4 rounded-md border">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Hallmark Image *
                      </label>
                      <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                        <label className="block text-xs text-gray-500">
                          {files.hallmarkImage
                            ? files.hallmarkImage.name
                            : "Select image"}
                        </label>
                        <input
                          type="file"
                          id="hallmarkImage"
                          name="hallmarkImage"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <img
                        id="hallmarkImage-preview"
                        src={previews.hallmarkImage || "#"}
                        alt="Preview"
                        className={`mt-2 h-24 w-auto object-contain ${
                          previews.hallmarkImage ? "" : "hidden"
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddHallmark}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 cursor-pointer active:scale-95 transition transform duration-75 ease-in-out"
                    >
                      Add Hallmark
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Existing Hallmarks
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {homepage?.hallmark_list?.map((hallmark) => (
                      <div
                        key={hallmark._id}
                        className="bg-white p-3 rounded-md border relative group"
                      >
                        <img
                          src={hallmark.hallmarkImage}
                          alt="Hallmark"
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteHallmark(hallmark._id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer hover:bg-red-600 active:scale-95 transition transform duration-75 ease-in-out"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {(!homepage?.hallmark_list ||
                      homepage.hallmark_list.length === 0) && (
                      <p className="text-gray-500 italic">
                        No hallmarks added yet.
                      </p>
                    )}
                  </div>
                </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.hallmark)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.hallmark)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
          </>
        </CollapsibleSection>

        {/* Legacy Section */}
        <CollapsibleSection
          title="Legacy Section"
          enabledKey="legacy_section"
          formData={formData}
          handleInputChange={handleInputChange}
        >
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Legacy Title
                  </label>
                  <input
                    name="lagacy_title"
                    value={formData.lagacy_title || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Legacy Description
                  </label>
                  <textarea
                    name="legacy_desc"
                    value={formData.legacy_desc || ""}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Legacy Image
                  </label>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      name="legacy_img"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    {(previews.legacy_img || formData.legacy_img) && (
                      <img
                        id="legacy_img-preview"
                        src={previews.legacy_img || formData.legacy_img}
                        className="w-full h-32 object-cover"
                        alt="Legacy"
                      />
                    )}
                  </div>
                </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.legacy)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.legacy)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
          </>
        </CollapsibleSection>

        {/* Curator Section */}
        <CollapsibleSection
          title="Curator Section"
          enabledKey="curator_section"
          formData={formData}
          handleInputChange={handleInputChange}
        >
      
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Curator Title
                  </label>
                  <input
                    name="curator_title"
                    value={formData.curator_title || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Curator Description
                  </label>
                  <textarea
                    name="curator_desc"
                    value={formData.curator_desc || ""}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Curator Image
                  </label>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      name="curator_img"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    {(previews.curator_img || formData.curator_img) && (
                      <img
                        id="curator_img-preview"
                        src={previews.curator_img || formData.curator_img}
                        className="w-full h-32 object-cover"
                        alt="Curator"
                      />
                    )}
                  </div>
                </div>
        
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.curator)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.curator)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
          </>
        </CollapsibleSection>

        {/* Promise Section */}
        <CollapsibleSection
          title="Promise Section"
          enabledKey="promise_section"
          formData={formData}
          handleInputChange={handleInputChange}
        >
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Promise Title
                  </label>
                  <input
                    name="promise_title"
                    value={formData.promise_title || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Promise Description
                  </label>
                  <textarea
                    name="promise_desc"
                    value={formData.promise_desc || ""}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Add New Promise</h3>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      id="newPromiseImage"
                      name="newPromiseImage"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    <textarea
                      name="newPromiseDescription"
                      value={formData.newPromiseDescription || ""}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Promise Description"
                    />
                    <button
                      onClick={handleAddPromise}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 active:scale-95 transition transform duration-75 ease-in-out"
                    >
                      Add Promise
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Existing Promises
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {homepage?.promises_list?.map((item) => (
                      <div key={item._id} className="relative group">
                        {item.image && (
                          <img
                            src={item.image}
                            className="w-full h-32 object-cover rounded"
                            alt="Promise"
                          />
                        )}
                        <p className="text-sm mt-2">{item.description}</p>
                        <button
                          onClick={() => handleDeletePromise(item._id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer hover:bg-red-600 active:scale-95 transition transform duration-75 ease-in-out"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.promise)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.promise)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
          </>
        </CollapsibleSection>

        {/* Store Section */}
        <CollapsibleSection
          title="Store Section"
          // no enable toggle for store, so pass no enabledKey
          formData={formData}
          handleInputChange={handleInputChange}
        >
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Store Image
              </label>
              <div className="border-dashed border-2 rounded p-4">
                <input
                  type="file"
                  name="store_image"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                {(previews.store_image || formData.store_image) && (
                  <img
                    id="store_image-preview"
                    src={previews.store_image || formData.store_image}
                    className="w-full h-32 object-cover"
                    alt="Store preview"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Title
                </label>
                <input
                  name="store_title"
                  value={formData.store_title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Slug Name
                </label>
                <input
                  name="store_slug_name"
                  value={formData.store_slug_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Slug
                </label>
                <input
                  name="store_slug"
                  value={formData.store_slug}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSectionSave(sectionFields.store)}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => handleSectionReset(sectionFields.store)}
                className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition transform duration-75 ease-in-out"
              >
                Reset
              </button>
            </div>
          </>
        </CollapsibleSection>

        {/* Global Save button at the bottom */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-green-600 active:scale-95 transition transform duration-75 ease-in-out"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}