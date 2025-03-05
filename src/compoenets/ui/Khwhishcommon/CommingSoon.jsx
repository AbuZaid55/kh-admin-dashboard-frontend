import React, { useState } from "react";
import OnOffbutton from "./OnOffbutton";
import { FaPlus } from "react-icons/fa";
import Input from "../../main/Input";

function CommingSoon({ headername, images, setImages, handleform }) {
  const [openclosebutton, setopenclosebutton] = useState(false);
  const [isOn, setIsOn] = useState(true);

  const handleAddImage = () => {
    if (images) {
      setImages([...images, ""]);
    }
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };
  return (
    <>
      <OnOffbutton isOn={isOn} setIsOn={setIsOn} openclosebutton={openclosebutton} setopenclosebutton={setopenclosebutton} headname={headername}>
        <form action="" onSubmit={handleform}>
          {/* Description */}
          <div className="my-4 flex gap-10">
            {/* Image Upload Section */}
            <div>
              <label className="block text-gray-700 mb-2">Add Images</label>
              <div className="flex items-center flex-wrap gap-2 mt-2 space-x-4">
                {images.map((_, index) => (
                  <label key={index} className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    {images[index] ? <img src={URL.createObjectURL(images[index])} className=" w-full h-full object-cover" /> : <Input type="file" className="hidden" onChange={(e) => handleImageChange(e, index)} />}
                  </label>
                ))}
                {images && (
                  <div onClick={handleAddImage} className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                    <FaPlus />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-5">
            <button className="bg-[#333333] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300">Reset</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300">Save Changes</button>
          </div>
        </form>
      </OnOffbutton>
    </>
  );
}

export default CommingSoon;
