import React, { useState } from 'react'
import { BsFolderPlus } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import Input from './../../../compoenets/main/Input';
import Button from './../../../compoenets/main/Button';

function Customizations() {

  const [formdata, setformdata] = useState({
    sitename: "",
    anayliticScript: "",
    product: "",
    Vendor: "",
    img: ""
  })

  const handleform = (e) => {
    e.preventDefault()
    console.log(formdata);

    setformdata({
      sitename: "",
      anayliticScript: "",
      product: "",
      Vendor: "",
      img: ""
    })
  }

  const placeholderScript = `<!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-XXXXXXXXXX');
  </script>`;




  return (
    <div className="w-[95%] mx-auto mt-3 p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">General Customizations</h2>

        </div>
      </div>

      {/* Form Section with Smooth Height Transition */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out `}
      >
        <h2 className="text-md font-medium text-gray-500 mb-2">
          Change your General Customizations
        </h2>

        <form action="" onSubmit={handleform}>
          {/* Input Fields */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Sitename for SEO</label>
            <Input
              type="text"
              placeholder="Enter Sitename for SEO"
              value={formdata.sitename}
              onChange={(e) => setformdata({ ...formdata, sitename: e.target.value })}
            />
          </div>

          {/* Analytics Settings */}
          <div className="mb-4">
            <h2 className="font-semibold">Analytics Settings</h2>
            <p className="text-gray-500 mb-2">Google Analytics Script</p>

            <textarea
              className="w-full h-[215px] p-4 border border-gray-300 rounded-md bg-white font-mono text-sm 
            outline-[#EC9D0C]
            "

              placeholder={placeholderScript}
              style={{ resize: "none", whiteSpace: "pre-wrap" }}
              value={formdata.anayliticScript}
              onChange={(e) => setformdata({ ...formdata, anayliticScript: e.target.value })}
            />

            <div className="mt-4 text-gray-500 text-sm">
              <p>
                Paste your Google Analytics tracking code here. It will be added
                to the site's header.
              </p>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center">
                  <GoDotFill className="text-green-500 mr-2" />
                  Must include Google Analytics script tag (<code>gtag.js</code>)
                </li>
                <li className="flex items-center">
                  <GoDotFill className="text-green-500 mr-2" />
                  Must include <code>dataLayer</code> initialization
                </li>
                <li className="flex items-center">
                  <GoDotFill className="text-green-500 mr-2" />
                  Must include <code>gtag</code> function definition
                </li>
                <li className="flex items-center">
                  <GoDotFill className="text-green-500 mr-2" />
                  Must include Configuration code
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Product Searchbox Placeholder
            </label>
            <Input
              type="text"
              placeholder="Search products"
              value={formdata.product}
              onChange={(e) => setformdata({ ...formdata, product: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Vendor Searchbox Placeholder
            </label>
            <Input
              type="text"
              placeholder="Search vendor name, city"
              value={formdata.Vendor}
              onChange={(e) => setformdata({ ...formdata, Vendor: e.target.value })}

            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Upload website logo
            </label>
            <label
              className="border border-[#e7e7e7] rounded-md h-[200px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50"

            >
              {formdata.img ?
                <img src={URL.createObjectURL(formdata.img)} className='w-full h-full object-cover rounded-md ' />
                :
                <div>
                  <BsFolderPlus size={30} />
                  <p className="mt-2">Browse to add side image</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setformdata({ ...formdata, img: e.target.files[0] })}
                  />
                </div>}
            </label>
          </div>



          <div className=' flex justify-end gap-[50px] mt-10 '>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 transition-all duration-300">
              Cancel
            </button>
            <div className='w-[10%]'>
              <Button
                type='reset'
                className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                text="Reset"
              // Reset script on click
              />
            </div>

            <div className='w-[20%]'>
              <Button text="Save Changes" type='submit' />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Customizations