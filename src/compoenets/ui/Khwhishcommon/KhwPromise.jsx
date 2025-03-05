import React, { useState } from "react";
import OnOffbutton from "./OnOffbutton";
import { FaPlus } from "react-icons/fa";
import Input from "../../main/Input";
import Button from "../../main/Button";

function KhwPromise({ formdata, setformdata, handleform, headname }) {
  const [openclosebutton, setopenclosebutton] = useState(false);
  const [isOn, setIsOn] = useState(true);

  return (
    <>
      <OnOffbutton isOn={isOn} setIsOn={setIsOn} openclosebutton={openclosebutton} setopenclosebutton={setopenclosebutton} headname={headname}>
        <form action="" onSubmit={handleform}>
          <div className=" flex gap-[80px] my-5 text-gray-700">
            <div className="">
              <label className="">Add Image</label>
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
            <div className=" flex flex-col gap-3">
              <div>
                <label>Add Tittal</label>
                <Input type="text" placeholder="Tittal" value={formdata.tittle} onChange={(e) => setformdata({ ...formdata, tittle: e.target.value })} />
              </div>
              <div>
                <label className="block mb-2">Add description</label>
                <textarea className=" p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] " rows="2" placeholder="Enter description" value={formdata.description} onChange={(e) => setformdata({ ...formdata, description: e.target.value })}></textarea>
              </div>
            </div>
          </div>
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

export default KhwPromise;
