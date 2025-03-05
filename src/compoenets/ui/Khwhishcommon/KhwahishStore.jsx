import React, { useState } from "react";
import OnOffbutton from "./OnOffbutton";
import { BsFolderPlus } from "react-icons/bs";
import Input from "../../main/Input";
import Button from "../../main/Button";

function KhwahishStore({ formdata, setformdata, handleform }) {
  const [openclosebutton, setopenclosebutton] = useState(false);
  const [isOn, setIsOn] = useState(true);

  return (
    <>
      <OnOffbutton isOn={isOn} setIsOn={setIsOn} openclosebutton={openclosebutton} setopenclosebutton={setopenclosebutton} headname="Khwahish Store">
        <form action="" onSubmit={handleform}>
          {/* Input Fields */}
          <div className="grid grid-cols-4 gap-6 my-4 items-start">
            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <Input type="text" placeholder="Location" value={formdata.Location} onChange={(e) => setformdata({ ...formdata, Location: e.target.value })} />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Google map Link</label>
              <Input type="text" placeholder="Google map link" value={formdata.Google_map_Link} onChange={(e) => setformdata({ ...formdata, Google_map_Link: e.target.value })} />
            </div>

            {/* Browse by Category */}
            <div className="flex flex-col">
              {/* Title */}
              <label className="block text-gray-700 mb-1">Browse by Category</label>
              <label className="border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center w-40 h-18 cursor-pointer hover:border-[#EC9D0C] transition ">
                {formdata.img ? (
                  <img src={URL.createObjectURL(formdata.img)} alt="" className="w-full h-full object-cover rounded-md" />
                ) : (
                  <div className=" flex flex-col items-center">
                    <BsFolderPlus size={25} className="text-gray-500" />
                    <span className="text-gray-600 text-[10px] text-center">Browse to add image</span>
                    <input name="img" required type="file" className="hidden" accept="image/*" onChange={(e) => setformdata({ ...formdata, img: e.target.files[0] })} />
                  </div>
                )}
              </label>
            </div>
          </div>
          {/* Description */}
          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Description */}
            <div className="">
              <label className="block mb-2">Add description</label>
              <textarea
                className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                rows="3"
                placeholder="Enter description"
                value={formdata.description}
                onChange={(e) => setformdata({ ...formdata, description: e.target.value })}></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className=" flex justify-end gap-[50px] mt-3 ">
            <div className="w-[10%]">
              <Button type="reset" className="bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]" text="Reset" />
            </div>

            <div className="w-[20%]">
              <Button text="Save Changes" type="submit" />
            </div>
          </div>
        </form>
      </OnOffbutton>
    </>
  );
}

export default KhwahishStore;
