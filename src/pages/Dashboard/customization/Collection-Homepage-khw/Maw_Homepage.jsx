import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:4000/api/v1/maw-homepage/customization";

const MAWHomepageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    scroll_text: "",
    brand_web_link: "",
    logo: null,

    // Hero Section
    hero_section: false,
    hero_image: null,
    hero_title: "",
    hero_desc_1: "",
    hero_desc_2: "",
    hero_desc_3: "",
    hero_desc_4: "",

    // From Sketch To Finish section
    sketch_section: false,
    sketch_title: "",
    sketch_desc: "",
    sketch_image: null,
    sketch_video: null,

    // Make a wish with Khwahish section
    maw_section: false,
    maw_title: "",
    maw_desc: "",
    maw_image: null,
  });

  const [previewImages, setPreviewImages] = useState({
    logo: "",
    hero_image: "",
    sketch_image: "",
    sketch_video: "",
    maw_image: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch current homepage data
  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_BASE_URL);
        if (res.data.success) {
          const data = res.data.data;

          setFormData({
            scroll_text: data.scroll_text || "",
            brand_web_link: data.brand_web_link || "",

            // Hero Section
            hero_section: data.hero_section || false,
            hero_title: data.hero_title || "",
            hero_desc_1: data.hero_desc_1 || "",
            hero_desc_2: data.hero_desc_2 || "",
            hero_desc_3: data.hero_desc_3 || "",
            hero_desc_4: data.hero_desc_4 || "",

            // From Sketch To Finish section
            sketch_section: data.sketch_section || false,
            sketch_title: data.sketch_title || "",
            sketch_desc: data.sketch_desc || "",

            // Make a wish with Khwahish section
            maw_section: data.maw_section || false,
            maw_title: data.maw_title || "",
            maw_desc: data.maw_desc || "",
          });

          setPreviewImages({
            logo: data.logo || "",
            hero_image: data.hero_image || "",
            sketch_image: data.sketch_image || "",
            sketch_video: data.sketch_video || "",
            maw_image: data.maw_image || "",
          });
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        toast.error("Failed to load homepage data");
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    };

    fetchHomepage();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      // Generate preview URL
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setPreviewImages((prev) => ({
          ...prev,
          [name]: event.target.result,
        }));
      };
      fileReader.readAsDataURL(files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create form data object for file uploads
      const data = new FormData();

      // Add text and boolean fields
      Object.keys(formData).forEach((key) => {
        if (
          typeof formData[key] === "string" ||
          typeof formData[key] === "boolean"
        ) {
          data.append(key, formData[key]);
        }
      });

      // Add file fields
      if (formData.logo instanceof File) data.append("logo", formData.logo);
      if (formData.hero_image instanceof File)
        data.append("hero_image", formData.hero_image);
      if (formData.sketch_image instanceof File)
        data.append("sketch_image", formData.sketch_image);
      if (formData.sketch_video instanceof File)
        data.append("sketch_video", formData.sketch_video);
      if (formData.maw_image instanceof File)
        data.append("maw_image", formData.maw_image);

      // Send update request
      const res = await axios.put(API_BASE_URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setSuccessMessage("Homepage updated successfully!");
      }
    } catch (error) {
      console.error("Error updating homepage:", error);
      setError("Failed to update homepage. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Make A Wish Homepage Management
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Common Fields */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Scroll Text</label>
              <input
                type="text"
                name="scroll_text"
                value={formData.scroll_text}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Brand Web Link</label>
              <input
                type="text"
                name="brand_web_link"
                value={formData.brand_web_link}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2">Logo</label>
            <input
              type="file"
              name="logo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border rounded"
            />
            {previewImages.logo && (
              <div className="mt-2">
                <img
                  src={previewImages.logo}
                  alt="Logo Preview"
                  className="h-20 object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="hero_section"
              checked={formData.hero_section}
              onChange={handleChange}
              className="mr-2"
            />
            <h2 className="text-xl font-semibold">Hero Section</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Hero Title</label>
              <input
                type="text"
                name="hero_title"
                value={formData.hero_title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Hero Image</label>
              <input
                type="file"
                name="hero_image"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 border rounded"
              />
              {previewImages.hero_image && (
                <div className="mt-2">
                  <img
                    src={previewImages.hero_image}
                    alt="Hero Image Preview"
                    className="h-40 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-2">Hero Description 1</label>
              <textarea
                name="hero_desc_1"
                value={formData.hero_desc_1}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            <div>
              <label className="block mb-2">Hero Description 2</label>
              <textarea
                name="hero_desc_2"
                value={formData.hero_desc_2}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            <div>
              <label className="block mb-2">Hero Description 3</label>
              <textarea
                name="hero_desc_3"
                value={formData.hero_desc_3}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            <div>
              <label className="block mb-2">Hero Description 4</label>
              <textarea
                name="hero_desc_4"
                value={formData.hero_desc_4}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* From Sketch To Finish Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="sketch_section"
              checked={formData.sketch_section}
              onChange={handleChange}
              className="mr-2"
            />
            <h2 className="text-xl font-semibold">
              From Sketch To Finish Section
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Section Title</label>
              <input
                type="text"
                name="sketch_title"
                value={formData.sketch_title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Section Description</label>
              <textarea
                name="sketch_desc"
                value={formData.sketch_desc}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            <div>
              <label className="block mb-2">Section Image</label>
              <input
                type="file"
                name="sketch_image"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 border rounded"
              />
              {previewImages.sketch_image && (
                <div className="mt-2">
                  <img
                    src={previewImages.sketch_image}
                    alt="Sketch Image Preview"
                    className="h-40 object-contain"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2">Section Video</label>
              <input
                type="file"
                name="sketch_video"
                onChange={handleFileChange}
                accept="video/mp4,video/quicktime,video/webm"
                className="w-full p-2 border rounded"
              />
              {previewImages.sketch_video && (
                <div className="mt-2">
                  <video
                    src={previewImages.sketch_video}
                    controls
                    className="h-40 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Make a wish with Khwahish Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="maw_section"
              checked={formData.maw_section}
              onChange={handleChange}
              className="mr-2"
            />
            <h2 className="text-xl font-semibold">
              Make a Wish with Khwahish Section
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Section Title</label>
              <input
                type="text"
                name="maw_title"
                value={formData.maw_title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Section Description</label>
              <textarea
                name="maw_desc"
                value={formData.maw_desc}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>

            <div>
              <label className="block mb-2">Section Image</label>
              <input
                type="file"
                name="maw_image"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full p-2 border rounded"
              />
              {previewImages.maw_image && (
                <div className="mt-2">
                  <img
                    src={previewImages.maw_image}
                    alt="MAW Image Preview"
                    className="h-40 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MAWHomepageAdmin;
