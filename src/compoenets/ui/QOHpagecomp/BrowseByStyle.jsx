import React, { useState } from 'react'
import OnOffbutton from '../Khwhishcommon/OnOffbutton';
import Button from '../../main/Button';
import { FaPlus } from 'react-icons/fa';
import Input from '../../main/Input';

function BrowseByStyle() {
  const [openclosebutton, setopenclosebutton] = useState(false)
  const [isOn, setIsOn] = useState(true);
  const [images, setImages] = useState([""]);

  const [formdata, setformdata] = useState({
    title: '',
    images: [],
  })
  const handleform = (e) => {
    e.preventDefault();
    console.log(formdata);
    setformdata({
      title: '',
      images: [],
    })
  }


  const handleAddImage = () => {
    setImages([...images, ""]);

  };

  const handleImageChange = (e, index) => {
    const newImages = [...formdata.images];
    newImages[index] = e.target.files[0];
    setformdata({ ...formdata, images: newImages });
  };

  return (
    <>
      <OnOffbutton
        isOn={isOn}
        setIsOn={setIsOn}
        openclosebutton={openclosebutton}
        setopenclosebutton={setopenclosebutton}
        headname='Browse By Styles'>

        <form onSubmit={handleform} className=' mt-5 flex flex-col gap-4 '>
          <div className=' px-1'>

            <label className="block text-gray-700 mb-2">Add Title</label>
            <Input
              type="text"
              placeholder="Enter title"
              value={formdata.title}
              onChange={(e) => setformdata({ ...formdata, title: e.target.value })}
            />
          </div>
          <div className=' flex gap-4'>
            <button className=' cursor-pointer px-4 py-2 rounded-full border-gray-300 text-gray-500 mt-2 border '>
              Add Button1
            </button>
            <button className=' cursor-pointer px-4 py-2 rounded-full border-gray-300 text-gray-500 mt-2 border '>
              Add Button1
            </button>
          </div>


          <div>
            <h1 className='text-gray-700'>Add Images</h1>
            <div className="flex items-center flex-wrap gap-2 mt-2 space-x-4">
              {images.map((_, index) => (
                <label
                  key={index}
                  className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  {formdata.images[index] ?
                    <img src={URL.createObjectURL(formdata.images[index])} className=' w-full h-full object-cover'

                    /> :
                    <Input type='file' className='hidden' onChange={(e) => handleImageChange(e, index)} />}

                </label>
              ))}
              {images.length && (
                <div
                  onClick={handleAddImage}
                  className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  <FaPlus />
                </div>
              )}
            </div>
          </div>

          <div className=' flex justify-end gap-[50px] '>
            <div className='w-[20%]'>
              <Button text="Save Changes" type='submit' />
            </div>

            <div className='w-[10%]'>
              <Button
                type='reset'
                className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                text="Reset" />
            </div>
          </div>
        </form>

      </OnOffbutton>
    </>
  )
}

export default BrowseByStyle