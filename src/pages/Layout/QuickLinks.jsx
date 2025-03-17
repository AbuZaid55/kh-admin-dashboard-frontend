import { useState } from 'react'
import Button from './../../compoenets/main/Button';
import Input from './../../compoenets/main/Input';

function QuickLinks() {
  const [links, setLinks] = useState({
    instagram: true,
    facebook: true,
    youtube: true,
    whatsapp: true,
    location: true,
    cart: false,
  });

  const handleToggle = (key) => {
    setLinks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [formdata, setformdata] = useState({
    Instagram: '',
    Facebook: '',
    YouTube: '',
    Whatsapp: '',
    Location: '',
    Cart: '',
  })

  const handleform = (e) => {
    e.preventDefault();
    console.log(formdata);
    setformdata({
      Instagram: '',
      Facebook: '',
      YouTube: '',
      Whatsapp: '',
      Location: '',
      Cart: '',
    })
  }

  return (
    <div className="max-w-6xl mx-auto mt-3 p-8 bg-white shadow-md rounded-lg">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>

      {/* Toggle Buttons */}
      <div className="grid grid-cols-6 gap-4">
        {Object.keys(links).map((key) => (
          <div
            key={key}
            className="flex items-center justify-between h-10 p-3 bg-gray-100 rounded-full text-md"
          >
            <span className="text-md font-medium capitalize">{key}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={links[key]}
                onChange={() => handleToggle(key)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 flex items-center bg-gray-300 rounded-full peer-checked:bg-black transition-all duration-300">
                <div
                  className={`w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${links[key] ? "translate-x-6" : "translate-x-1"
                    }`}
                ></div>
              </div>
            </label>
          </div>
        ))}
      </div>


      {/*  Input Fields Section */}
      <form action="" onSubmit={handleform}>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="font-medium mb-2">Instagram</label>
              <Input
                type="text"
                placeholder="Enter Instagram link"
                disabled={!links.instagram}
                className="disabled:bg-gray-100"
                value={formdata.Instagram}
                onChange={(e) => setformdata({ ...formdata, Instagram: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-2">Facebook</label>
              <Input
                type="text"
                placeholder="Enter Facebook link"
                disabled={!links.facebook}
                className="disabled:bg-gray-100"
                value={formdata.Facebook}
                onChange={(e) => setformdata({ ...formdata, Facebook: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-2">YouTube</label>
              <Input
                type="text"
                placeholder="Enter YouTube link"
                disabled={!links.youtube}
                className=" disabled:bg-gray-100"
                value={formdata.YouTube}
                onChange={(e) => setformdata({ ...formdata, YouTube: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-2">WhatsApp</label>
              <Input
                type="text"
                placeholder="Enter WhatsApp link"
                disabled={!links.whatsapp}
                className=" disabled:bg-gray-100"
                value={formdata.Whatsapp}
                onChange={(e) => setformdata({ ...formdata, Whatsapp: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-2">Location</label>
              <Input
                type="text"
                placeholder="Enter Location link"
                disabled={!links.location}
                className=" border-gray-300 p-2 rounded-md disabled:bg-gray-100"
                value={formdata.Location}
                onChange={(e) => setformdata({ ...formdata, Location: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-2">Cart</label>
              <Input
                type="text"
                placeholder="link to Eshop"
                disabled={!links.cart}
                className=" disabled:bg-gray-100"
                value={formdata.Cart}
                onChange={(e) => setformdata({ ...formdata, Cart: e.target.value })}
              />
            </div>
          </div>
        </div>


        {/* Buttons */}
        <div className=' flex justify-end gap-[20px] mt-10 '>
          <div className='w-[10%]'>
            <Button
              type='reset'
              className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
              text="Reset" />

          </div>

          <div className='w-[20%]'>
            <Button text="Save Changes" type='submit' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuickLinks