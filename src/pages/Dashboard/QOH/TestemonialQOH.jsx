import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "../../../compoenets/main/Button";
import { FaPlus } from "react-icons/fa";
import Input from "../../../compoenets/main/Input";
import axios from "axios"; // Make sure to install axios

function TestemonialQOH() {
  const [slides, setSlides] = useState([]);
  const [editSlideIndex, setEditSlideIndex] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:3000/eshop/customization";

  const [formdata, setFormdata] = useState({
    name: "",
    designation: "",
    testimonial: "",
    img: null,
  });

  // Fetch all testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/testimonial`);

      // Map the response data to match our component's expected format
      const testimonialsWithImgObjects = response.data.map((item) => ({
        ...item,
        img: item.profile_img ? { url: item.profile_img.url } : null,
      }));

      setSlides(testimonialsWithImgObjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setLoading(false);
    }
  };

  const handledata = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", formdata.name);
      formData.append("designation", formdata.designation);
      formData.append("testimonial", formdata.testimonial);

      if (formdata.img && formdata.img instanceof File) {
        formData.append("profile_img", formdata.img);
      }

      if (editSlideIndex !== null && currentId) {
        // Update existing testimonial
        await axios.put(`${API_URL}/testimonial/${currentId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new testimonial
        await axios.post(`${API_URL}/testimonial`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // Refresh the testimonials list
      await fetchTestimonials();

      // Reset form
      setFormdata({
        name: "",
        designation: "",
        testimonial: "",
        img: null,
      });
      setEditSlideIndex(null);
      setCurrentId(null);
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }

    setLoading(false);
  };

  const handleEditData = (i) => {
    const slide = slides[i];
    setFormdata({
      name: slide.name,
      designation: slide.designation,
      testimonial: slide.testimonial,
      img: slide.img, // This will be an object with url property
    });
    setEditSlideIndex(i);
    setCurrentId(slide._id);
  };

  const handleDeleteData = async (i) => {
    const slideId = slides[i]._id;
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/testimonial/${slideId}`);
      await fetchTestimonials();
      setLoading(false);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormdata({ ...formdata, img: e.target.files[0] });
    }
  };

  const handleReset = () => {
    setFormdata({
      name: "",
      designation: "",
      testimonial: "",
      img: null,
    });
    setEditSlideIndex(null);
    setCurrentId(null);
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-4">
        <h1 className="text-2xl font-semibold">Queen Of Hearts Testimonial</h1>
        <form onSubmit={handledata}>
          <div className="items-center gap-3">
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

          <div className="items-center gap-3">
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

          <div>
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

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Add Image</label>
            <label className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer mt-2">
              {formdata.img ? (
                formdata.img instanceof File ? (
                  <img
                    src={URL.createObjectURL(formdata.img)}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div>
                    <img
                      src={formdata.img.url}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div>
                      <FaPlus />
                      <input
                        name="img"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        required={!editSlideIndex}
                      />
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <FaPlus />
                  <input
                    name="img"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={!editSlideIndex}
                  />
                </div>
              )}
            </label>
          </div>

          <div className="flex justify-end gap-[22px] mt-5">
            <div className="w-[10%]">
              <Button
                type="button"
                onClick={handleReset}
                className="bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]"
                text="Reset"
              />
            </div>

            <div className="w-[20%]">
              <Button
                text={
                  loading
                    ? "Saving..."
                    : editSlideIndex !== null
                    ? "Update"
                    : "Save Changes"
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
        <h1 className="text-[18px] mb-7">Added Testimonials</h1>

        {loading && slides.length === 0 ? (
          <div className="text-center py-10">Loading testimonials...</div>
        ) : slides.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No testimonials added yet.
          </div>
        ) : (
          <div className="flex flex-col gap-10 mb-3 overflow-auto py-1 scrollbar-hide">
            {slides.map((slide, i) => (
              <div
                key={slide._id || i}
                className={`bg-[#eaeaea] rounded-[10px] p-4 flex gap-10 ${
                  editSlideIndex === i ? "border-2 border-blue-500" : ""
                }`}
              >
                {slide.img && (
                  <img
                    src={slide.img.url}
                    alt={slide.name}
                    className="w-[100px] h-[100px] rounded-md object-cover"
                  />
                )}

                <div className="w-[90%]">
                  <div className="flex gap-11">
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
                      type="button"
                      onClick={() => handleEditData(i)}
                      disabled={loading}
                    >
                      <BiEditAlt
                        width={23}
                        className="text-[#676767] cursor-pointer"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteData(i)}
                      disabled={loading}
                    >
                      <RiDeleteBin5Line
                        width={23}
                        className="text-red-500 cursor-pointer"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default TestemonialQOH;
