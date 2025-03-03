import React, { useState } from 'react'


import { FaPlus } from 'react-icons/fa'
import Button from '../../main/Button';
import Input from '../../main/Input';
import OnOffbutton from './OnOffbutton';


function HallmarkAndJewel() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    const [formdata, setformdata] = useState({
        description: '',
        images: [],
    })

    const [images, setImages] = useState([""]);

    const handleAddImage = () => {
        setImages([...images, ""]);

    };

    const handleform = (e) => {
        e.preventDefault();
        console.log(formdata);
        setformdata({
            description: '',
            images: [],
        })
    }

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
            headname='Hallmarks' >

                <form onSubmit={handleform} className=' mt-5 flex flex-col gap-4 '>
                    <div className=' px-1'>
                        <label className="block text-gray-700 mb-2">Add description</label>
                        <textarea
                            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C]"
                            rows="3"
                            placeholder="Enter description"
                            value={formdata.description}
                            onChange={(e) => setformdata({ ...formdata, description: e.target.value })}
                        ></textarea>
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

export default HallmarkAndJewel