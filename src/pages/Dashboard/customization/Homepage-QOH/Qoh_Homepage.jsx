import React, { useState, useEffect } from "react";
import { ArrowDown, Upload, Plus, Trash2, Save, Eye } from "lucide-react";
import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:4000/api/v1/qoh-homepage/customization";

export default function QOHHomepageManager() {
  const defaultFormData = {
    homepage_name: "Queen of Hearts",
    scroll_text: "",
    brand_web_link: "",
    logo: "",
    logo_text: "",
    hero_video: "",
    hero_short_desc: "",
    hero_desc: "",
    hallmark_section: false,
    hallmark_sec_desc: "",
    hallmark_slug_name: "",
    hallmark_slug: "",
    gulz_section: false,
    gulz_section_title: "",
    gulz_section_short_desc: "",
    gulz_image: "",
    gulz_title: "",
    gulz_short_desc: "",
    gulz_slug_name: "",
    gulz_slug: "",
    faza_section: false,
    faza_section_title: "",
    faza_section_short_desc: "",
    faza_title: "",
    faza_short_desc: "",
    faza_slug_name: "",
    faza_slug: "",
    festara_section: false,
    festara_section_title: "",
    festara_section_short_desc: "",
    festara_image: "",
    festara_title: "",
    festara_short_desc: "",
    festara_slug_name: "",
    festara_slug: "",
    legacy_section: false, // NEW: Added legacy_section
    legacy_img: "",
    lagacy_title: "",
    legacy_desc: "",
    curator_section: false, // NEW: Added curator_section
    curator_img: "",
    curator_title: "",
    curator_desc: "",
    promise_section: false, // NEW: Added promise_section
    promise_title: "",
    promise_desc: "",
    promises_list: [],
    galaria_section: false,
    galaria_section_title: "",
    galaria_section_short_location: "",
    galaria_section_desc: "",
    galaria_image: "",
  };

  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState(defaultFormData);
  const [files, setFiles] = useState({});
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch homepage data
  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}`);
        if (response.data.data) {
          setHomepage(response.data.data);
          setFormData({ ...defaultFormData, ...response.data.data });
        } else {
          setHomepage(defaultFormData);
          setFormData(defaultFormData);
        }
      } catch (err) {
        setError("Failed to load homepage data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepage();
  }, []);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      setFiles((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Create temporary URL for preview
      const fileUrl = URL.createObjectURL(file);

      // Update preview without updating formData
      const preview = document.getElementById(`${name}-preview`);
      if (preview) {
        preview.src = fileUrl;
        preview.style.display = "block";
        preview.dataset.tempUrl = fileUrl; // Store temporary URL for cleanup
      }
    }
  };

  // Submit form to update homepage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage("");

    try {
      const submitData = new FormData();

      // Add all text fields
      Object.keys(formData).forEach((key) => {
        if (typeof formData[key] !== "undefined" && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      // Add all files
      Object.keys(files).forEach((key) => {
        submitData.append(key, files[key]);
      });

      // Send request
      const response = await axios.put(`${API_BASE_URL}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update formData with server response
      setFormData((prev) => ({
        ...prev,
        ...response.data.data,
      }));

      setSuccessMessage("Homepage updated successfully!");

      // Cleanup temporary URLs
      document.querySelectorAll("[data-temp-url]").forEach((preview) => {
        URL.revokeObjectURL(preview.dataset.tempUrl);
        preview.removeAttribute("data-temp-url");
      });

      // Clear file inputs
      setFiles({});
      document.querySelectorAll("input[type=file]").forEach((input) => {
        input.value = "";
      });
    } catch (err) {
      setError("Failed to update homepage. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
      window.scrollTo(0, 0);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  // Add a hallmark
  const handleAddHallmark = async (e) => {
    e.preventDefault();
    try {
      if (!files.hallmarkImage) {
        setError("Please select an image for the hallmark");
        return;
      }
      const hallmarkData = new FormData();
      hallmarkData.append("hallmarkImage", files.hallmarkImage);
      await axios.post(`${API_BASE_URL}/hallmark`, hallmarkData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Refresh homepage data
      const response = await axios.get(`${API_BASE_URL}`);
      setHomepage(response.data.data);
      // Clear form
      setFiles((prev) => ({
        ...prev,
        hallmarkImage: null,
      }));
      // Clear file input
      document.getElementById("hallmarkImage").value = "";
      document.getElementById("hallmarkImage-preview").classList.add("hidden");
      setSuccessMessage("Hallmark added successfully!");
    } catch (err) {
      setError("Failed to add hallmark. Please try again.");
      console.error(err);
    }
  };

  // Delete a hallmark
  const handleDeleteHallmark = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hallmark?"))
      return;

    try {
      await axios.delete(`${API_BASE_URL}/hallmark/${id}`);

      // Refresh homepage data
      const response = await axios.get(`${API_BASE_URL}`);
      setHomepage(response.data.data);

      setSuccessMessage("Hallmark deleted successfully!");
    } catch (err) {
      setError("Failed to delete hallmark. Please try again.");
      console.error(err);
    }
  };

  // Add a promise
  const handleAddPromise = async (e) => {
    e.preventDefault();

    try {
      const promiseData = new FormData();
      promiseData.append("description", formData.newPromiseDescription || "");

      if (files.newPromiseImage) {
        promiseData.append("image", files.newPromiseImage);
      }

      await axios.post(`${API_BASE_URL}/promise`, promiseData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh homepage data
      const response = await axios.get(`${API_BASE_URL}`);
      setHomepage(response.data.data);

      // Clear form
      setFormData((prev) => ({
        ...prev,
        newPromiseDescription: "",
      }));
      setFiles((prev) => ({
        ...prev,
        newPromiseImage: null,
      }));

      // Clear file input
      document.getElementById("newPromiseImage").value = "";
      document.getElementById("newPromiseImage-preview").style.display = "none";

      setSuccessMessage("Promise added successfully!");
    } catch (err) {
      setError("Failed to add promise. Please try again.");
      console.error(err);
    }
  };

  // Delete a promise
  const handleDeletePromise = async (id) => {
    if (!window.confirm("Are you sure you want to delete this promise?"))
      return;

    try {
      await axios.delete(`${API_BASE_URL}/promise/${id}`);

      // Refresh homepage data
      const response = await axios.get(`${API_BASE_URL}`);
      setHomepage(response.data.data);

      setSuccessMessage("Promise deleted successfully!");
    } catch (err) {
      setError("Failed to delete promise. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-blue-600 border-b-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-2">Loading homepage data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Queen of Hearts Homepage Admin
      </h1>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <span className="font-bold">Success!</span> {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span className="font-bold">Error!</span> {error}
        </div>
      )}

      {/* Preview Website Button */}
      {/* <div className="mb-6 text-center">
        <button
          className="flex items-center mx-auto bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => window.open("/preview", "_blank")}
        >
          <Eye size={18} className="mr-2" />
          Preview Website
        </button>
      </div> */}

      <div className="flex flex-wrap -mx-2 mb-6">
        {/* Navigation Sidebar */}
        <div className="px-2 w-full md:w-1/4 mb-4 md:mb-0">
          <div className="sticky top-4 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sections</h2>
            <nav>
              <ul>
                {[
                  { id: "hero", label: "Hero Section" },
                  { id: "hallmark", label: "Hallmark Section" },
                  { id: "gulz", label: "Gulz Section" },
                  { id: "faza", label: "Faza Section" },
                  { id: "festara", label: "Festara Section" },
                  { id: "legacy", label: "Legacy Section" },
                  { id: "curator", label: "Curator Section" },
                  { id: "promise", label: "Promise Section" },
                  { id: "galaria", label: "Galaria Section" },
                ].map((section) => (
                  <li key={section.id} className="mb-2">
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-2 w-full md:w-3/4">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-lg shadow"
          >
            {/* Hero Section */}
            {activeSection === "hero" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Hero Section</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Homepage Name
                    </label>
                    <input
                      type="text"
                      name="homepage_name"
                      value={formData.homepage_name || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scroll Text
                    </label>
                    <input
                      type="text"
                      name="scroll_text"
                      value={formData.scroll_text || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand Web Link
                    </label>
                    <input
                      type="text"
                      name="brand_web_link"
                      value={formData.brand_web_link || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo Text
                    </label>
                    <input
                      type="text"
                      name="logo_text"
                      value={formData.logo_text || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Short Description
                  </label>
                  <input
                    type="text"
                    name="hero_short_desc"
                    value={formData.hero_short_desc || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hero Description
                  </label>
                  <textarea
                    name="hero_desc"
                    value={formData.hero_desc || ""}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      {formData.logo && (
                        <img
                          src={formData.logo}
                          alt="Current Logo"
                          className="h-16 w-auto object-contain border rounded p-1"
                        />
                      )}
                      <div className="flex-1">
                        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                          <label className="block text-xs text-gray-500">
                            {files.logo ? files.logo.name : "Select new logo"}
                          </label>
                          <input
                            type="file"
                            name="logo"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <img
                          id="logo-preview"
                          src="#"
                          alt="Preview"
                          className="mt-2 h-16 w-auto object-contain hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hero Video Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hero Video
                    </label>
                    <div className="flex items-center space-x-4">
                      {formData.hero_video && (
                        <video
                          key={formData.hero_video} // Force re-render on source change
                          controls
                          className="h-16 w-auto border rounded p-1"
                        >
                          <source src={formData.hero_video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <div className="flex-1">
                        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                          <label className="block text-xs text-gray-500">
                            {files.hero_video
                              ? files.hero_video.name
                              : "Select new video"}
                          </label>
                          <input
                            type="file"
                            name="hero_video"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        {/* Add video preview element */}
                        <video
                          id="hero_video-preview"
                          controls
                          className="mt-2 h-16 w-auto border rounded p-1 hidden"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hallmark Section */}
            {activeSection === "hallmark" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Hallmark Section</h2>

                <div className="mb-6">
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
                        src="#"
                        alt="Preview"
                        className="mt-2 h-24 w-auto object-contain hidden"
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

                {/* Existing Hallmarks */}
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

            {/* Gulz Section */}
            {activeSection === "gulz" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Gulz Section</h2>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="gulz_section"
                      checked={formData.gulz_section || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Enable Gulz Section
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        name="gulz_section_title"
                        value={formData.gulz_section_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Short Description
                      </label>
                      <input
                        type="text"
                        name="gulz_section_short_desc"
                        value={formData.gulz_section_short_desc || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gulz Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {formData.gulz_image && (
                        <img
                          src={formData.gulz_image}
                          alt="Gulz"
                          className="h-16 w-auto object-contain border rounded p-1"
                        />
                      )}
                      <div className="flex-1">
                        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                          <label className="block text-xs text-gray-500">
                            {files.gulz_image
                              ? files.gulz_image.name
                              : "Select image"}
                          </label>
                          <input
                            type="file"
                            name="gulz_image"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <img
                          id="gulz_image-preview"
                          src="#"
                          alt="Preview"
                          className="mt-2 h-16 w-auto object-contain hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="gulz_title"
                        value={formData.gulz_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        name="gulz_short_desc"
                        value={formData.gulz_short_desc || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug Name
                      </label>
                      <input
                        type="text"
                        name="gulz_slug_name"
                        value={formData.gulz_slug_name || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug
                      </label>
                      <input
                        type="text"
                        name="gulz_slug"
                        value={formData.gulz_slug || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Faza Section */}
            {activeSection === "faza" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Faza Section</h2>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="faza_section"
                      checked={formData.faza_section || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Enable Faza Section
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        name="faza_section_title"
                        value={formData.faza_section_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Short Description
                      </label>
                      <input
                        type="text"
                        name="faza_section_short_desc"
                        value={formData.faza_section_short_desc || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Faza Image Upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Faza Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {formData.faza_image ? (
                        <img
                          src={formData.faza_image}
                          alt="Faza"
                          className="h-16 w-auto object-contain border rounded p-1"
                        />
                      ) : (
                        <div className="h-16 w-16 flex items-center justify-center border rounded">
                          No Image
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                          <label className="block text-xs text-gray-500">
                            {files.faza_image
                              ? files.faza_image.name
                              : "Select image"}
                          </label>
                          <input
                            type="file"
                            name="faza_image"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        {files.faza_image && (
                          <img
                            id="faza_image-preview"
                            src={URL.createObjectURL(files.faza_image)}
                            alt="Preview"
                            className="mt-2 h-16 w-auto object-contain"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="faza_title"
                        value={formData.faza_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        name="faza_short_desc"
                        value={formData.faza_short_desc || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug Name
                      </label>
                      <input
                        type="text"
                        name="faza_slug_name"
                        value={formData.faza_slug_name || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug
                      </label>
                      <input
                        type="text"
                        name="faza_slug"
                        value={formData.faza_slug || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Festara Section */}
            {activeSection === "festara" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Festara Section</h2>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="festara_section"
                      checked={formData.festara_section || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Enable Festara Section
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        name="festara_section_title"
                        value={formData.festara_section_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Short Description
                      </label>
                      <input
                        type="text"
                        name="festara_section_short_desc"
                        value={formData.festara_section_short_desc || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Festara Image Upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Festara Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {formData.festara_image ? (
                        <img
                          src={formData.festara_image}
                          alt="Festara"
                          className="h-16 w-auto object-contain border rounded p-1"
                        />
                      ) : (
                        <div className="h-16 w-16 flex items-center justify-center border rounded">
                          No Image
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                          <label className="block text-xs text-gray-500">
                            {files.festara_image
                              ? files.festara_image.name
                              : "Select image"}
                          </label>
                          <input
                            type="file"
                            name="festara_image"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        {files.festara_image && (
                          <img
                            id="festara_image-preview"
                            src={URL.createObjectURL(files.festara_image)}
                            alt="Preview"
                            className="mt-2 h-16 w-auto object-contain"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="festara_title"
                        value={formData.festara_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        name="festara_short_desc"
                        value={formData.festara_short_desc || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug Name
                      </label>
                      <input
                        type="text"
                        name="festara_slug_name"
                        value={formData.festara_slug_name || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug
                      </label>
                      <input
                        type="text"
                        name="festara_slug"
                        value={formData.festara_slug || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legacy Section */}
            {activeSection === "legacy" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Legacy Section</h2>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="legacy_section"
                      checked={formData.legacy_section || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Enable Legacy Section
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Legacy Title
                      </label>
                      <input
                        type="text"
                        name="lagacy_title"
                        value={formData.lagacy_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Legacy Description
                      </label>
                      <textarea
                        name="legacy_desc"
                        value={formData.legacy_desc || ""}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Legacy Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.legacy_img && (
                      <img
                        src={formData.legacy_img}
                        alt="Legacy"
                        className="h-16 w-auto object-contain border rounded p-1"
                      />
                    )}
                    <div className="flex-1">
                      <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                        <label className="block text-xs text-gray-500">
                          {files.legacy_img
                            ? files.legacy_img.name
                            : "Select image"}
                        </label>
                        <input
                          type="file"
                          name="legacy_img"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <img
                        id="legacy_img-preview"
                        src="#"
                        alt="Preview"
                        className="mt-2 h-16 w-auto object-contain hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Curator Section */}
            {activeSection === "curator" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Curator Section</h2>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="curator_section"
                      checked={formData.curator_section || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Enable Curator Section
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Curator Title
                      </label>
                      <input
                        type="text"
                        name="curator_title"
                        value={formData.curator_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Curator Description
                      </label>
                      <textarea
                        name="curator_desc"
                        value={formData.curator_desc || ""}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Curator Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.curator_img && (
                      <img
                        src={formData.curator_img}
                        alt="Curator"
                        className="h-16 w-auto object-contain border rounded p-1"
                      />
                    )}
                    <div className="flex-1">
                      <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                        <label className="block text-xs text-gray-500">
                          {files.curator_img
                            ? files.curator_img.name
                            : "Select image"}
                        </label>
                        <input
                          type="file"
                          name="curator_img"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <img
                        id="curator_img-preview"
                        src="#"
                        alt="Preview"
                        className="mt-2 h-16 w-auto object-contain hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Promise Section */}
            {activeSection === "promise" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Promise Section</h2>
                <div className="mb-6">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promise Title
                      </label>
                      <input
                        type="text"
                        name="promise_title"
                        value={formData.promise_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promise Description
                      </label>
                      <textarea
                        name="promise_desc"
                        value={formData.promise_desc || ""}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">
                    Add New Promise
                  </h3>
                  <div className="bg-white p-4 rounded-md border">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="newPromiseDescription"
                        value={formData.newPromiseDescription || ""}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                        <label className="block text-xs text-gray-500">
                          {files.newPromiseImage
                            ? files.newPromiseImage.name
                            : "Select image"}
                        </label>
                        <input
                          type="file"
                          id="newPromiseImage"
                          name="newPromiseImage"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <img
                        id="newPromiseImage-preview"
                        src="#"
                        alt="Preview"
                        className="mt-2 h-24 w-auto object-contain hidden"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddPromise}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Promise
                    </button>
                  </div>
                </div>

                {/* Existing Promises */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Existing Promises
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {homepage?.promises_list?.map((promise) => (
                      <div
                        key={promise._id}
                        className="bg-white p-4 rounded-md border relative group flex"
                      >
                        {promise.image && (
                          <img
                            src={promise.image}
                            alt="Promise"
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                        )}

                        <div className="flex-1">
                          <p className="text-gray-800">{promise.description}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeletePromise(promise._id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}

                    {(!homepage?.promises_list ||
                      homepage.promises_list.length === 0) && (
                      <p className="text-gray-500 italic">
                        No promises added yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Galaria Section */}
            {activeSection === "galaria" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Galaria Section</h2>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="galaria_section"
                      checked={formData.galaria_section || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Enable Galaria Section
                    </label>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        name="galaria_section_title"
                        value={formData.galaria_section_title || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Short Location
                      </label>
                      <input
                        type="text"
                        name="galaria_section_short_location"
                        value={formData.galaria_section_short_location || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="galaria_section_desc"
                        value={formData.galaria_section_desc || ""}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Galaria Image
                      </label>
                      <div className="flex items-center space-x-4">
                        {formData.galaria_image && (
                          <img
                            src={formData.galaria_image}
                            alt="Galaria"
                            className="h-16 w-auto object-contain border rounded p-1"
                          />
                        )}
                        <div className="flex-1">
                          <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:border-blue-500 transition">
                            <label className="block text-xs text-gray-500">
                              {files.galaria_image
                                ? files.galaria_image.name
                                : "Select image"}
                            </label>
                            <input
                              type="file"
                              name="galaria_image"
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <img
                            id="galaria_image-preview"
                            src="#"
                            alt="Preview"
                            className="mt-2 h-16 w-auto object-contain hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 border-t pt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
