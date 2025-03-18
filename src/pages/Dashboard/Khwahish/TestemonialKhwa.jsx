import React, { useState, useEffect } from "react";
import Input from "./../../../compoenets/main/Input";
import { FaPlus } from "react-icons/fa";
import Button from "../../../compoenets/main/Button";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
const BASE_TESTIMONIAL_URL =
  "http://localhost:3000/khwaahish/customization/homepage/khw-testimonial";
function TestemonialKhwa() {
  const [slides, setSlides] = useState([]);
  const [collections, setCollections] = useState([]);
  //   const [selectedCollection, setSelectedCollection] = useState('');
  const [editSlideIndex, setEditSlideIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formdata, setFormdata] = useState({
    collection_id: "",
    name: "",
    designation: "",
    testimonial: "",
    profile_img: null,
  });

  // Fetch collections and testimonials on component mount
  useEffect(() => {
    fetchCollections();
    fetchTestimonials();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/store/khw/collections/get-all-collections"
      );

      const collectionsData = response.data.collections
        ? response.data.collections
        : response.data;
      setCollections(collectionsData);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError("Failed to load collections");
    }
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_TESTIMONIAL_URL}`);
      const testimonialsData = response.data.testimonials
        ? response.data.testimonials
        : response.data;
      setSlides(testimonialsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials");
      setLoading(false);
    }
  };

  const handledata = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for multipart/form-data (for image upload)
      const formData = new FormData();
      formData.append("name", formdata.name);
      formData.append("designation", formdata.designation);
      formData.append("testimonial", formdata.testimonial);
      formData.append("collection_id", formdata.collection_id);
      console.log(formdata.collection_id);
      if (formdata.profile_img) {
        formData.append("profile_img", formdata.profile_img);
      }

      if (editId) {
        // Update existing testimonial
        await axios.put(`${BASE_TESTIMONIAL_URL}/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create new testimonial
        console.log("formdata:", formdata);
        await axios.post(`${BASE_TESTIMONIAL_URL}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Refresh testimonials list
      fetchTestimonials();

      // Reset form
      resetForm();
    } catch (err) {
      console.error("Error saving testimonial:", err);
      setError("Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormdata({
      collection_id: "",
      name: "",
      designation: "",
      testimonial: "",
      profile_img: null,
    });
    setEditSlideIndex(null);
    setEditId(null);
  };

  const handelOptionChange = (e) => {
    const selectedValue = e.target.value;
    setFormdata({ ...formdata, collection_id: selectedValue });
  };

  const handleEditData = (slide, index) => {
    setFormdata({
      collection_id: slide.collection_id,
      name: slide.name,
      designation: slide.designation,
      testimonial: slide.testimonial,
      profile_img: null,
    });
    setEditSlideIndex(index);
    setEditId(slide._id);
  };

  const handleDeleteData = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    try {
      setLoading(true);
      await axios.delete(`${BASE_TESTIMONIAL_URL}/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      setError("Failed to delete testimonial");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get collection name from its ID
  const getCollectionName = (collectionId) => {
    const collection = collections.find((c) => c._id === collectionId);
    console.log(collection, collectionId);
    return collection ? collection.name : "Unknown";
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-4">
        <h1 className="text-2xl font-semibold">Khwaahish Testimonial</h1>

        {error && (
          <div className="bg-red-100 p-3 text-red-700 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handledata}>
          <select
            className="border rounded-md border-gray-300 p-2 w-[300px]"
            value={formdata.collection_id}
            onChange={handelOptionChange}
            required
          >
            <option value="">Select Collection</option>
            {Array.isArray(collections) &&
              collections.map((collection) => (
                <option key={collection._id} value={collection._id}>
                  {collection.name}
                </option>
              ))}
          </select>

          <div className="items-center gap-3 mt-3">
            <label className="block text-gray-700 mb-2">Name</label>
            <Input
              type="text"
              placeholder="Name"
              value={formdata.name}
              onChange={(e) =>
                setFormdata({ ...formdata, name: e.target.value })
              }
              required
            />
          </div>

          <div className="items-center gap-3 mt-3">
            <label className="block text-gray-700 mb-2">Designation</label>
            <Input
              type="text"
              placeholder="Designation"
              value={formdata.designation}
              onChange={(e) =>
                setFormdata({ ...formdata, designation: e.target.value })
              }
              required
            />
          </div>

          <div className="mt-3">
            <label className="block text-gray-700 mb-2">Testimonial</label>
            <textarea
              className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC9D0C]"
              rows="3"
              placeholder="Testimonial"
              value={formdata.testimonial}
              onChange={(e) =>
                setFormdata({ ...formdata, testimonial: e.target.value })
              }
              required
            ></textarea>
          </div>

          <div className="mt-3">
            <label className="block text-gray-700 mb-2">Add Image</label>
            <label className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer mt-2">
              {formdata.profile_img ? (
                <img
                  src={URL.createObjectURL(formdata.profile_img)}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              ) : editId &&
                slides.find((s) => s._id === editId)?.profile_img?.url ? (
                <div>
                  <img
                    src={slides.find((s) => s._id === editId).profile_img.url}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div>
                    <FaPlus />
                    <input
                      name="profile_img"
                      type="file"
                      className="hidden z-10"
                      accept="image/*"
                      onChange={(e) =>
                        setFormdata({
                          ...formdata,
                          profile_img: e.target.files[0],
                        })
                      }
                      required={!editId}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <FaPlus />
                  <input
                    name="profile_img"
                    type="file"
                    className="hidden z-10"
                    accept="image/*"
                    onChange={(e) =>
                      setFormdata({
                        ...formdata,
                        profile_img: e.target.files[0],
                      })
                    }
                    required={!editId}
                  />
                </div>
              )}
            </label>
          </div>

          <div className="flex justify-end gap-[22px] mt-6">
            <div className="w-[10%]">
              <Button
                type="button"
                onClick={resetForm}
                className="bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]"
                text="Reset"
              />
            </div>

            <div className="w-[20%]">
              <Button
                text={
                  loading ? "Saving..." : editId ? "Update" : "Save Changes"
                }
                type="submit"
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="mt-10 border border-t border-gray-300 border-opacity-50" />

      <div className="mt-6">
        <h1 className="text-[18px] mb-7">Added Slides</h1>

        {loading && <p>Loading testimonials...</p>}

        <div className="flex flex-col gap-10 mb-3 overflow-auto py-1 scrollbar-hide">
          {Array.isArray(slides) &&
            slides.map((slide, i) => (
              <div
                key={slide._id || i}
                className={`bg-[#eaeaea] rounded-[10px] p-4 flex gap-10 ${
                  editSlideIndex === i ? "border-2 border-blue-500" : ""
                }`}
              >
                {slide.profile_img?.url && (
                  <img
                    src={slide.profile_img.url}
                    alt=""
                    className="w-[100px] h-[100px] rounded-md object-cover"
                  />
                )}

                <div className="w-[90%]">
                  <div className="flex gap-11 flex-wrap">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg">Collection</h1>
                      <p className="text-md text-gray-500">
                        {getCollectionName(slide.collection_id)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg">Name</h1>
                      <p className="text-md text-gray-500">{slide.name}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg">Designation</h1>
                      <p className="text-md text-gray-500">
                        {slide.designation}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg">Testimonial</h1>
                      <p className="text-md text-gray-500">
                        {slide.testimonial}
                      </p>
                    </div>
                  </div>

                  <div className="w-[100%] text-xl mt-5 flex justify-end gap-3">
                    <button
                      onClick={() => handleEditData(slide, i)}
                      type="button"
                    >
                      <BiEditAlt className="text-[#676767] cursor-pointer" />
                    </button>
                    <button
                      onClick={() => handleDeleteData(slide._id)}
                      type="button"
                    >
                      <RiDeleteBin5Line className="text-red-500 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {Array.isArray(slides) && slides.length === 0 && (
            <p className="text-gray-500 text-center">No testimonials found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default TestemonialKhwa;
