import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Eye } from "lucide-react";
import axios from "axios";

const API_BASE_URL =
  "http://localhost:4000/api/v1/collection-homepage/customization";

export default function CollectionHomepageAdmin() {
  // State for choosing between "fazza" and "festara"
  const [selectedCollection, setSelectedCollection] = useState("");

  // Default form data – note homepage_collection_name is updated after selection.
  const [formData, setFormData] = useState({
    homepage_collection_name: "",
    scroll_text: "",
    brand_web_link: "",
    collection_logo: "",
    collection_logo_text: "",
    hero_mobile_banner_image: "",
    hero_desktop_banner_image: "",
    hero_title: "",
    hero_title_image: "",
    hero_desc: "",
    jag_section: false,
    jag_section_title: "",
    jag_section_short_desc: "",
    jag_list: [],
    ad_campaign_section: false,
    ad_campaign_title: "",
    ad_campaign_video: "",
    qoh_section: false,
    qoh_short_desc: "",
    qoh_long_desc: "",
    hallmark_section: false,
    hallmark_sec_desc: "",
    hallmark_slug_name: "",
    hallmark_slug: "",
    hallmark_list: [],
    legacy_section: false,
    legacy_img: "",
    lagacy_title: "",
    legacy_desc: "",
    curator_section: false,
    curator_img: "",
    curator_title: "",
    curator_desc: "",
    promise_section: false,
    promise_title: "",
    promise_desc: "",
    promises_list: [],
    // Store Section
    store_image: "",
    store_title: "",
    store_slug_name: "",
    store_slug: "",
    // For adding a promise
    newPromiseDescription: "",
  });

  // Files state will hold file objects for overall homepage update and sub–sections.
  const [files, setFiles] = useState({});
  // Previews state to hold temporary preview URLs
  const [previews, setPreviews] = useState({});
  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // When a collection is selected, update formData and fetch its data.
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

  // Handle text/checkbox changes.
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input changes.
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      setFiles((prev) => ({ ...prev, [name]: file }));
      const fileUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [name]: fileUrl }));
      // (For sub–sections using direct DOM preview updates, you could also update the element's src)
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

  // Submit the overall homepage update.
  // IMPORTANT: We skip file keys that belong to sub–sections (jagImage, newPromiseImage, hallmarkImage)
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
      // Append file fields, skipping sub–section file fields.
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

      // Cleanup preview URLs.
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

  // --- JAG List Management ---
  const handleAddJagItem = async (e) => {
    e.preventDefault();
    try {
      const jagFormData = new FormData();
      // Send the file as "hallmarkImage" as expected by the backend.
      jagFormData.append("hallmarkImage", files.jagImage);
      await axios.post(
        `${API_BASE_URL}/${selectedCollection}/jag`,
        jagFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const response = await axios.get(`${API_BASE_URL}/${selectedCollection}`);
      setHomepage(response.data.data);
      setSuccessMessage("JAG item added successfully!");
      // Remove "jagImage" from files so it isn't included in the overall update.
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
      // Remove hallmarkImage from files.
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
      // Use "newPromiseImage" as the field name (matching the QOH reference)
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
      // Remove the newPromiseImage file so it isn't sent on overall update.
      setFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles.newPromiseImage;
        return newFiles;
      });
      // Optionally clear the promise file input if you have its ref.
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

  // --- Collection Selector UI ---
  if (!selectedCollection) {
    return (
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Select Collection
        </h1>
        <div className="flex justify-center">
          <button
            onClick={() => setSelectedCollection("fazza")}
            className="bg-blue-500 text-white px-6 py-2 rounded mx-2"
          >
            Fazza
          </button>
          <button
            onClick={() => setSelectedCollection("festara")}
            className="bg-green-500 text-white px-6 py-2 rounded mx-2"
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
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
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

      <div className="flex flex-wrap -mx-2 mb-6">
        {/* Navigation Sidebar */}
        <div className="px-2 w-full md:w-1/4 mb-4 md:mb-0">
          <div className="sticky top-4 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sections</h2>
            <nav>
              <ul>
                {[
                  "hero",
                  "jag",
                  "ad",
                  "qoh",
                  "hallmark",
                  "legacy",
                  "curator",
                  "promise",
                  "store",
                ].map((section) => (
                  <li key={section} className="mb-2">
                    <button
                      onClick={() => setActiveSection(section)}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === section
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Form Content */}
        <div className="px-2 w-full md:w-3/4">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-lg shadow"
          >
            {/* Hero Section */}
            {activeSection === "hero" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Hero Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
                      Brand Link
                    </label>
                    <input
                      name="brand_web_link"
                      value={formData.brand_web_link}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
                      Hero Title
                    </label>
                    <input
                      name="hero_title"
                      value={formData.hero_title}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                {/* File Uploads for Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Collection Logo
                    </label>
                    <div className="border-dashed border-2 rounded p-4">
                      <input
                        type="file"
                        name="collection_logo"
                        onChange={handleFileChange}
                        className="mb-2"
                      />
                      {(previews.collection_logo ||
                        formData.collection_logo) && (
                        <img
                          id="collection_logo-preview"
                          src={
                            previews.collection_logo || formData.collection_logo
                          }
                          className="w-32 h-32 object-contain"
                          alt="Logo preview"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Hero Title Image
                    </label>
                    <div className="border-dashed border-2 rounded p-4">
                      <input
                        type="file"
                        name="hero_title_image"
                        onChange={handleFileChange}
                        className="mb-2"
                      />
                      {(previews.hero_title_image ||
                        formData.hero_title_image) && (
                        <img
                          id="hero_title_image-preview"
                          src={
                            previews.hero_title_image ||
                            formData.hero_title_image
                          }
                          className="w-32 h-32 object-contain"
                          alt="Title image preview"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Desktop Banner
                    </label>
                    <div className="border-dashed border-2 rounded p-4">
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
                </div>
              </div>
            )}

            {/* JAG Section */}
            {activeSection === "jag" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Jewels at Glance</h2>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="jag_section"
                    checked={formData.jag_section}
                    onChange={handleInputChange}
                  />
                  <label>Enable JAG Section</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label>JAG Title</label>
                    <input
                      name="jag_section_title"
                      value={formData.jag_section_title}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label>Short Description</label>
                    <input
                      name="jag_section_short_desc"
                      value={formData.jag_section_short_desc}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Add New JAG Item
                  </h3>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      name="jagImage"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    <button
                      onClick={handleAddJagItem}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
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
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Ad Campaign Section */}
            {activeSection === "ad" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Ad Campaign</h2>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="ad_campaign_section"
                    checked={formData.ad_campaign_section}
                    onChange={handleInputChange}
                  />
                  <label>Enable Ad Campaign</label>
                </div>
                <div>
                  <label>Campaign Title</label>
                  <input
                    name="ad_campaign_title"
                    value={formData.ad_campaign_title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Campaign Video</label>
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
              </div>
            )}

            {/* Queen of Hearts Section */}
            {activeSection === "qoh" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Queen of Hearts</h2>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="qoh_section"
                    checked={formData.qoh_section}
                    onChange={handleInputChange}
                  />
                  <label>Enable QOH Section</label>
                </div>
                <div>
                  <label>Short Description</label>
                  <input
                    name="qoh_short_desc"
                    value={formData.qoh_short_desc}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Long Description</label>
                  <textarea
                    name="qoh_long_desc"
                    value={formData.qoh_long_desc}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}

            {/* Hallmark Section */}
            {activeSection === "hallmark" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Hallmark Section</h2>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="hallmark_section"
                    checked={formData.hallmark_section || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Enable Hallmark Section
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hallmark Description
                    </label>
                    <textarea
                      name="hallmark_sec_desc"
                      value={formData.hallmark_sec_desc || ""}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hallmark Slug Name
                      </label>
                      <input
                        type="text"
                        name="hallmark_slug_name"
                        value={formData.hallmark_slug_name || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hallmark Slug
                      </label>
                      <input
                        type="text"
                        name="hallmark_slug"
                        value={formData.hallmark_slug || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">
                    Add New Hallmark
                  </h3>
                  <div className="bg-white p-4 rounded-md border">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
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
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
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
              </div>
            )}
            {/* Legacy Section */}
            {activeSection === "legacy" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Legacy</h2>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="legacy_section"
                    checked={formData.legacy_section}
                    onChange={handleInputChange}
                  />
                  <label>Enable Legacy Section</label>
                </div>
                <div>
                  <label>Legacy Title</label>
                  <input
                    name="lagacy_title"
                    value={formData.lagacy_title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Legacy Description</label>
                  <textarea
                    name="legacy_desc"
                    value={formData.legacy_desc}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Legacy Image</label>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      name="legacy_img"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    {formData.legacy_img && (
                      <img
                        id="legacy_img-preview"
                        src={formData.legacy_img}
                        className="w-full h-32 object-cover"
                        alt="Legacy"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Curator Section */}
            {activeSection === "curator" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Curator</h2>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="curator_section"
                    checked={formData.curator_section}
                    onChange={handleInputChange}
                  />
                  <label>Enable Curator Section</label>
                </div>
                <div>
                  <label>Curator Title</label>
                  <input
                    name="curator_title"
                    value={formData.curator_title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Curator Description</label>
                  <textarea
                    name="curator_desc"
                    value={formData.curator_desc}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Curator Image</label>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      name="curator_img"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    {formData.curator_img && (
                      <img
                        id="curator_img-preview"
                        src={formData.curator_img}
                        className="w-full h-32 object-cover"
                        alt="Curator"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Promise Section */}
            {activeSection === "promise" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Promise Section</h2>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="promise_section"
                    checked={formData.promise_section || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Enable Promise Section
                  </label>
                </div>
                <div>
                  <label>Promise Title</label>
                  <input
                    name="promise_title"
                    value={formData.promise_title || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Promise Description</label>
                  <textarea
                    name="promise_desc"
                    value={formData.promise_desc || ""}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Add New Promise
                  </h3>
                  <div className="border-dashed border-2 rounded p-4">
                    {/* Use "newPromiseImage" as the input name to match the QOH reference */}
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
                      className="bg-blue-500 text-white px-4 py-2 rounded"
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
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Store Section */}
            {activeSection === "store" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Store Section</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Store Image
                  </label>
                  <div className="border-dashed border-2 rounded p-4">
                    <input
                      type="file"
                      name="store_image"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    {formData.store_image && (
                      <img
                        id="store_image-preview"
                        src={formData.store_image}
                        className="w-full h-32 object-cover"
                        alt="Store preview"
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
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
                    <label className="block text-sm font-medium mb-2">
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
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
