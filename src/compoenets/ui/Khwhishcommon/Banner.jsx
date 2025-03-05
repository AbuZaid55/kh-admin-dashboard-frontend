import React, { useState } from "react";
import OnOffbutton from "./OnOffbutton";
import { FaPlus } from "react-icons/fa";
import Input from "../../main/Input";
import Button from "../../main/Button";

function Banner({ formdata, setformdata, handleform }) {
  const [openclosebutton, setopenclosebutton] = useState(false);
  const [isOn, setIsOn] = useState(true);
  const [noofBanners, setnoofBanners] = useState([""]);

  const handleaddBanner = () => {
    setnoofBanners([...noofBanners, ""]);
  };

  return (
    <>
      <div className=" flex flex-col gap-2">
        {noofBanners.map((_, index) => (
          <div key={index}>
            <OnOffbutton isOn={isOn} setIsOn={setIsOn} openclosebutton={openclosebutton} setopenclosebutton={setopenclosebutton} headname="Banner">
              <form action="" onSubmit={handleform}>
                {/* Input Fields */}
                <div className="grid grid-cols-4 gap-4 my-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Category Name</label>
                    <Input type="text" placeholder="Enter category name" value={formdata.Category_Name} onChange={(e) => setformdata({ ...formdata, Category_Name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Collection Name</label>
                    <Input type="text" placeholder="Enter collection name" value={formdata.Collection_Name} onChange={(e) => setformdata({ ...formdata, Collection_Name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Subtitle</label>
                    <Input type="text" placeholder="Enter subtitle" value={formdata.Subtitle} onChange={(e) => setformdata({ ...formdata, Subtitle: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Explore more</label>
                    <Input type="text" placeholder="Enter button link" value={formdata.Explore_more} onChange={(e) => setformdata({ ...formdata, Explore_more: e.target.value })} />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4 flex gap-10">
                  <div className="">
                    <label className="block mb-2">Add description</label>
                    <textarea
                      className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                      rows="3"
                      placeholder="Enter description"
                      value={formdata.Description}
                      onChange={(e) => setformdata({ ...formdata, Description: e.target.value })}></textarea>
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer mt-2 ">
                      {formdata.img ? (
                        <img src={URL.createObjectURL(formdata.img)} alt="" className="w-full h-full object-cover rounded-md" />
                      ) : (
                        <div>
                          <FaPlus />
                          <input name="img" required type="file" className="hidden" accept="image/*" onChange={(e) => setformdata({ ...formdata, img: e.target.files[0] })} />
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className=" flex justify-end gap-[30px] mt-6 ">
                  <div className="w-[12%]">
                    <Button className="bg-[#37D160] hover:bg-transparent border-[#37D160] w-full hover:text-[#37D160]" text="Add More" onClick={handleaddBanner} />
                  </div>

                  <div className="w-[10%]">
                    <Button
                      // onClick={handleresetdata}
                      className="bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]"
                      text="Reset"
                    />
                  </div>
                  <div className="w-[20%]">
                    <Button text="Save Changes" type="submit" />
                  </div>
                </div>
              </form>
            </OnOffbutton>
          </div>
        ))}
      </div>
    </>
  );
}

export default Banner;
