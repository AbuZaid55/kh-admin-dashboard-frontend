/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { CiSquareChevDown } from "react-icons/ci";
import { BsFolderPlus } from "react-icons/bs";
import { FaPlus} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const HeroSection = () => {
  const mobileInputRef = useRef(null);
  const desktopInputRef = useRef(null);

  const handleFileUpload = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const [images, setImages] = useState(["", ""]);

  const handleAddImage = () => {
    if (images.length < 5) {
      setImages([...images, ""]);
    }
  };

  const [sections, setSections] = useState([{ id: 1 }]);

  const addSection = () => {
    setSections([...sections, { id: sections.length + 1 }]);
  };

  return (
    <div className="mb-10">
      {/* Section 1 */}
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold">Hero Section</h2>
          <span className="text-xl font-bold text-gray-500 cursor-pointer">
            <CiSquareChevDown />
          </span>
        </div>

        {/* Banner Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Mobile Banner */}
          <div
            className="border border-[#e7e7e7] rounded-md p-8 min-h-[200px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50"
            onClick={() => handleFileUpload(mobileInputRef)}
          >
            <BsFolderPlus size={30} />
            <p className="mt-2">Browse to add mobile banner</p>
            <span className="text-xs text-gray-300">(320x480 pixels)</span>
            <input
              type="file"
              ref={mobileInputRef}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Desktop Banner */}
          <div
            className="border border-[#e7e7e7] rounded-md p-8 min-h-[200px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50"
            onClick={() => handleFileUpload(desktopInputRef)}
          >
            <BsFolderPlus size={30} />
            <p className="mt-2">Browse to add desktop banner</p>
            <span className="text-xs text-gray-300">(1200x400 pixels)</span>
            <input
              type="file"
              ref={desktopInputRef}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Add Title</label>
          <input
            type="text"
            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
            // placeholder="Enter title"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-gray-700 mb-2">Add description</label>
          <textarea
            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
            rows="3"
            // placeholder="Enter description"
          ></textarea>
        </div>
      </div>

      {/* Section 2 */}
      <div className="max-w-6xl mx-auto mt-3 p-6 bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold">Hallmarks</h2>
          <span className="text-xl font-bold text-gray-500 cursor-pointer">
            <CiSquareChevDown />
          </span>
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Add Short Description
          </label>
          <input
            type="text"
            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            // placeholder="Enter description"
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-gray-700 mb-2">Add Images</label>
          <div className="flex items-center space-x-4">
            {images.map((_, index) => (
              <div
                key={index}
                className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                {/* Placeholder for uploaded image */}
              </div>
            ))}
            {images.length < 6 && (
              <button
                onClick={handleAddImage}
                className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <FaPlus />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="max-w-6xl mx-auto mt-3 p-6 bg-white shadow-md rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold">Carousel</h2>
          <span className="text-xl font-bold text-gray-500 cursor-pointer">
            <CiSquareChevDown />
          </span>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1">Category Name</label>
            <input
              type="text"
              // placeholder="Enter category name"
              className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Collection Name</label>
            <input
              type="text"
              // placeholder="Enter collection name"
              className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              // placeholder="Enter subtitle"
              className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Button Link</label>
            <input
              type="text"
              // placeholder="Enter button link"
              className="w-40 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 flex gap-10">
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              className="w-90 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              rows="3"
              // placeholder="Enter description"
            ></textarea>
          </div>
          <div>
            {/* Image Upload Section */}
            <div>
              <label className="block text-gray-700 mb-2">Add Images</label>
              <div className="flex items-center space-x-4">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    {/* Placeholder for uploaded image */}
                  </div>
                ))}
                {images.length < 6 && (
                  <button
                    onClick={handleAddImage}
                    className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add More Button */}
        <div className="flex justify-end">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600">
            Add More
          </button>
        </div>
      </div>

      {/* Section 4 */}
      <div className="max-w-6xl mx-auto mt-3 p-6 bg-white shadow-md rounded-lg">
        {/* Image Upload Section */}
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">
            Spotlight Video
          </label>
          <div className="flex items-center space-x-4">
            {images.map((_, index) => (
              <div
                key={index}
                className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                {/* Placeholder for uploaded image */}
              </div>
            ))}
            {images.length < 6 && (
              <button
                onClick={handleAddImage}
                className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
              >
                <FaPlus />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section 5 */}
      <div className="max-w-6xl mx-auto mt-3 p-6 bg-white shadow-md rounded-lg">
        <div className="flex items-start gap-10">
          {/* Image Upload Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-gray-700 font-semibold">
                Add Images
              </label>
              <span className="text-xl font-bold text-gray-500 cursor-pointer">
                <CiSquareChevDown />
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {images.map((_, index) => (
                <div
                  key={index}
                  className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  {/* Placeholder for uploaded image */}
                </div>
              ))}
              {images.length < 6 && (
                <button
                  onClick={handleAddImage}
                  className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  <FaPlus />
                </button>
              )}
            </div>
          </div>

          {/* Category Name Input */}
          <div className="">
            <label className="block text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Section 6 */}
      <div className="max-w-6xl mx-auto mt-3 p-6 bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold">The Khwaahish Store</h2>
          <span className="text-xl font-bold text-gray-500 cursor-pointer">
            <CiSquareChevDown />
          </span>
        </div>

        {/* Input Fields & Browse by Category  */}
        <div className="grid grid-cols-4 gap-6 mb-4 items-start">
          <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              type="text"
              className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Google map Link</label>
            <input
              type="text"
              className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Browse by Category */}
          <div className="flex flex-col">
            {/* Title */}
            <label className="block text-gray-700 mb-1">
              Browse by Category
            </label>

            <div className="flex items-center gap-4 ">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center w-40 h-18 cursor-pointer hover:border-gray-500 transition"
                >
                  <BsFolderPlus size={25} className="text-gray-500" />
                  <span className="text-gray-600 text-[10px] text-center">
                    Browse to add image
                  </span>
                </div>
              ))}

              {/* Plus Icon Button */}
              <button
                onClick={addSection}
                className="border-2 border-gray-300 rounded-lg flex items-center justify-center w-15 h-18 text-gray-500 hover:border-gray-500 transition"
              >
                <FiPlus size={30} />
              </button>
            </div>
          </div>
        </div>

        {/* Description & Browse by Category  */}
        <div className="grid grid-cols-2 gap-6 items-start">
          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              rows="3"
            ></textarea>
          </div>

          {/* Browse */}
          <div>
            <div className="flex items-center gap-4 mt-10">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center w-40 h-18 cursor-pointer hover:border-gray-500 transition"
                >
                  <BsFolderPlus size={25} className="text-gray-500" />
                  <span className="text-gray-600 text-[10px] text-center">
                    Browse to add image
                  </span>
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex max-w-6xl mx-auto mt-5 justify-end">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
