import React, { useState } from "react";
import OnOffbutton from "./OnOffbutton";
import { FaPlus } from "react-icons/fa";
import Button from "./../../main/Button";

function Spotlight({ video, setVideo, handleform }) {
  const [openclosebutton, setopenclosebutton] = useState(false);
  const [isOn, setIsOn] = useState(true);

  return (
    <>
      <OnOffbutton isOn={isOn} setIsOn={setIsOn} openclosebutton={openclosebutton} setopenclosebutton={setopenclosebutton} headname="Spot Light Vedio">
        <form onSubmit={handleform}>
          <div className="my-4 flex gap-10 ">
            {/* Image Upload Section */}
            <div>
              <label className="block text-gray-700 mb-2">Spot Light Vedio</label>
              <div className="flex items-center space-x-4">
                <label className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer mt-2 ">
                  <div>
                    <FaPlus />
                    <input name="video" required type="file" className="hidden" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className=" flex justify-end gap-[50px] ">
            <div className="w-[20%]">
              <Button text="Save Changes" type="submit" />
            </div>

            <div className="w-[10%]">
              <Button type="reset" className="bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]" text="Reset" />
            </div>
          </div>
        </form>
      </OnOffbutton>
    </>
  );
}

export default Spotlight;
