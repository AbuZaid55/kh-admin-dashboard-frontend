import React, { useState } from "react";
import OnOffbutton from "./OnOffbutton";
import Button from "../../main/Button";
import Input from "../../main/Input";

function FAQ() {
  const [openclosebutton, setopenclosebutton] = useState(false);
  const [isOn, setIsOn] = useState(true);

  const [formdata, setformdata] = useState({
    tittle1: "",
    Description1: "",
    tittle2: "",
    Description2: "",
    tittle3: "",
    Description3: "",
  });

  const handleform = (e) => {
    e.preventDefault();
    console.log(formdata);

    setformdata({
      tittle1: "",
      Description1: "",
      tittle2: "",
      Description2: "",
      tittle3: "",
      Description3: "",
    });
  };

  return (
    <>
      <OnOffbutton isOn={isOn} setIsOn={setIsOn} openclosebutton={openclosebutton} setopenclosebutton={setopenclosebutton} headname="FAQ">
        <form action="" onSubmit={handleform}>
          {/* Input Fields */}
          <div>
            <div className="my-4">
              <label className="block text-gray-700 mb-2">Add Title</label>
              <Input type="text" placeholder="Enter title" value={formdata.tittle1} onChange={(e) => setformdata({ ...formdata, tittle1: e.target.value })} />
            </div>

            {/* Description Input */}
            <div className="">
              <label className="block mb-2">Add description</label>
              <textarea
                className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                rows="3"
                placeholder="Enter description"
                value={formdata.Description1}
                onChange={(e) => setformdata({ ...formdata, Description1: e.target.value })}></textarea>
            </div>
          </div>
          <div className="mt-2">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Add Title</label>
              <Input type="text" placeholder="Enter title" value={formdata.tittle2} onChange={(e) => setformdata({ ...formdata, tittle2: e.target.value })} />
            </div>

            {/* Description Input */}
            <div className="">
              <label className="block mb-2">Add description</label>
              <textarea
                className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                rows="3"
                placeholder="Enter description"
                value={formdata.Description2}
                onChange={(e) => setformdata({ ...formdata, Description2: e.target.value })}></textarea>
            </div>
          </div>
          <div className="mt-2">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Add Title</label>
              <Input type="text" placeholder="Enter title" value={formdata.tittle3} onChange={(e) => setformdata({ ...formdata, tittle3: e.target.value })} />
            </div>

            {/* Description Input */}
            <div className="">
              <label className="block mb-2">Add description</label>
              <textarea
                className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                rows="3"
                placeholder="Enter description"
                value={formdata.Description3}
                onChange={(e) => setformdata({ ...formdata, Description3: e.target.value })}></textarea>
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

export default FAQ;
