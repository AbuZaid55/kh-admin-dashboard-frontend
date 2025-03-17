import React, { useState } from 'react'
import Input from './../../compoenets/main/Input';
import { FaPlus } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import FooterList from '../../compoenets/ui/Layout/FooterList';
import Button from '../../compoenets/main/Button';

function Footer() {
  const [formData, setFormData] = useState({
    domain: "",
    address: "",
    copyright: "",
    phone: "",
    email: "",
    socialLinks: {
      Instagram: "",
      Facebook: "",
      Youtube: "",
      Whatsapp: "",
    },
    styling: {
      bgColor: "#000000",
      textColor: "#FFFFFF",
    },
    quickLinks: {
      Blogs: false,
      "Our Story": false,
      "Privacy Policy": false,
      "Terms and Conditions": false,
    },
    paymentLogos: [],
  });


  // Handle input changes
  const handleInputChange = (e, section = null, key = null) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (!section) {
        // Update top-level fields
        return { ...prev, [name]: value };
      } else {
        // Update nested fields
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [key || name]: value,
          },
        };
      }
    });
  };

  // Handle checkbox/toggle changes
  const handleToggleChange = (key) => {
    setFormData((prev) => ({
      ...prev,
      quickLinks: {
        ...prev.quickLinks,
        [key]: !prev.quickLinks[key],
      },
    }));
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        paymentLogos: [...prev.paymentLogos, ...files],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Footer Data:", formData);
  };

  return (
    <div className="flex flex-col w-[95%] mx-auto">
      <div className="shadow-lg py-8 px-6 flex mt-8 rounded-md flex-col">
        <h1 className="text-md text-gray-700 font-light my-3 text-left">
          Create New Footer
        </h1>
        <div className="flex w-full gap-1 justify-between">
          <Input
            text="Domain"
            placeholder="Add domain name"
            name="domain"
            value={formData.domain}
            onChange={handleInputChange}
          />
          <Input
            text="Address"
            placeholder="Add address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <Input
            text="Copyright Text"
            placeholder="2025 All Rights Reserved"
            name="copyright"
            value={formData.copyright}
            onChange={handleInputChange}
          />
        </div>

        <h1 className="text-md text-gray-700 font-light my-3 mt-9 text-left">
          Add Contact Details
        </h1>
        <div className="flex w-2/3 gap-4 justify-between">
          <Input
            text="Phone"
            placeholder="+91 98349489"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Input
            text="Email"
            placeholder="xyz@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-8 w-full">
          <h1 className="text-md text-gray-700 font-light my-3 mt-9 text-left">
            Social Media Links
          </h1>
          <div className="flex w-full gap-1">
            {Object.keys(formData.socialLinks).map((platform) => (
              <Input
                key={platform}
                text={platform}
                placeholder={`https://${platform.toLowerCase()}.com`}
                name={platform}
                value={formData.socialLinks[platform]}
                onChange={(e) => handleInputChange(e, "socialLinks", platform)}
              />
            ))}
          </div>
        </div>

        <h1 className="text-md text-gray-700 font-light my-3 mt-9 text-left">
          Footer Styling
        </h1>
        <div className="flex w-full gap-1 flex-wrap">
          <Input
            text="Background Colour"
            placeholder="#000000"
            name="bgColor"
            value={formData.styling.bgColor}
            onChange={(e) => handleInputChange(e, "styling", "bgColor")}
          />
          <Input
            text="Text Colour"
            placeholder="#FFFFFF"
            name="textColor"
            value={formData.styling.textColor}
            onChange={(e) => handleInputChange(e, "styling", "textColor")}
          />
        </div>

        <h1 className="text-md text-gray-700 font-light my-3 mt-9 text-left">
          Quick Links
        </h1>
        <div className="flex w-[90%] gap-5">
          {Object.keys(formData.quickLinks).map((label) => (
            <div key={label} className="bg-[#F8F8F8] rounded-full w-1/5 py-3 flex justify-center gap-2 items-center">
              <label className="text-sm text-gray-700 font-extralight">{label}</label>
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${formData.quickLinks[label] ? "bg-green-500" : "bg-gray-300"}`}
                onClick={() => handleToggleChange(label)}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${formData.quickLinks[label] ? "translate-x-6" : ""}`}
                ></div>
              </div>
            </div>

          ))}
        </div>



        <h1 className="text-md text-gray-700 font-light my-3 mt-9 text-left">
          Payment Methods Logo
        </h1>
        <div className="w-full flex gap-4">
          <label className="w-3/4 rounded-md border border-gray-300 py-4 px-8 h-48 flex items-center justify-center cursor-pointer">
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400 font-extralight">Browse to add Logo</span>
              <span className="text-sm text-gray-400 font-extralight">(upload svg or png)</span>
            </div>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <div className="w-1/4 border border-gray-300 rounded-md h-48 flex items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center justify-center gap-1">
              <FaPlus className="text-lg text-gray-400" />
              <label className="text-sm text-gray-400 font-extralight">
                Add More
              </label>
              <input type="file" className="hidden" />
            </div>
          </div>
        </div>

        <h1 className="text-md text-gray-700 font-light my-3 mt-9 text-left">
          Recently Added
        </h1>
        <div className="w-full flex gap-4">
          {formData.paymentLogos.map((file, index) => (
            <div key={index} className="w-38 h-28 rounded-md border border-gray-300 relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Logo"
                className="w-full h-full object-cover rounded-md"
              />
              <RxCross2
                className="text-lg text-white cursor-pointer absolute -right-2 -top-2 bg-gray-500 rounded-md"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentLogos: prev.paymentLogos.filter((_, i) => i !== index),
                  }))
                }
              />
            </div>
          ))}
        </div>

        <div className=' flex justify-end gap-[20px] mt-3 '>
                <div className='w-[10%]'>
                  <Button
                    type='reset'
                    className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                    text="Canel" />

                </div>

                <div className='w-[20%]'>
                  <Button text="Create folder" type='submit' />
                </div>
              </div>
      </div>

      {/* FooterList  */}
      {/* Footer Table */}
      <FooterList
        formData={formData}
        handleInputChange={handleInputChange}
        handleToggleChange={handleToggleChange}
      />

    </div>
  );
};


export default Footer