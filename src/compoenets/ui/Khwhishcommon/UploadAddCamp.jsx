import React, { useState } from "react";
import OnOffbutton from "./OnOffbutton";
import Button from "../../main/Button";

function UploadAddCamp({ Video, setVideo, hadleform }) {
  const [openclosebutton, setopenclosebutton] = useState(false);
  const [isOn, setIsOn] = useState(true);

  return (
    <>
      <OnOffbutton isOn={isOn} setIsOn={setIsOn} openclosebutton={openclosebutton} setopenclosebutton={setopenclosebutton} headname="Upload Add campaign">
        <form action="" onSubmit={hadleform}>
          <div className="flex flex-col justify-center w-full h-48 py-5  items-center  ">
            <label className="text-gray-600 text-md">Drag and drop video files to upload</label>
            <label className="border border-gray-400 py-1 px-6 cursor-pointer my-2 rounded-md text-gray-400">
              {Video ? Video.name : " Select file"}
              <input name="video" required type="file" className="hidden" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
            </label>
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

export default UploadAddCamp;
