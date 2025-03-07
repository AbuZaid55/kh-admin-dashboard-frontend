import React, { useState } from 'react'
import OnOffbutton from '../Khwhishcommon/OnOffbutton'
import { BsFolderPlus } from 'react-icons/bs';
import Button from '../../main/Button';
import Input from '../../main/Input';

function BrandImages() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    const [formdata, setformdata] = useState({
        title: '',
        description: '',
        img: '',
        title2: '',
        Button_Link: '',
        description2: '',
    })

    const handleform = (e) => {
        e.preventDefault();
        console.log(formdata);

        setformdata({
            title: '',
            description: '',
            img: '',
            title2: '',
            Button_Link: '',
            description2: '',
        })

    }
    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='Brand Images'>

                <form action="" onSubmit={handleform}>
                    <div>
                        <div className="my-4">
                            <label className="block text-gray-700 mb-2">Add Title</label>
                            <Input
                                type="text"
                                placeholder="Enter title"
                                value={formdata.title}
                                onChange={(e) => setformdata({ ...formdata, title: e.target.value })}
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Add description
                            </label>
                            <textarea
                                className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                rows="3"
                                placeholder="Enter description"
                                value={formdata.description}
                                onChange={(e) => setformdata({ ...formdata, description: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Banner Uploads (50% Image Upload - 50% New Title) */}
                        <div className="flex flex-col md:flex-row gap-6 mt-4">
                            {/* Left Side - Image Upload */}
                            <div className="w-full md:w-1/2">
                                <label className="block text-gray-700 mb-2">Image</label>
                                <label
                                    className="border border-[#e7e7e7] rounded-md min-h-[250px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50"
                                >
                                    {formdata.img ?
                                        <img src={URL.createObjectURL(formdata.img)} alt="" className='w-full h-full object-cover rounded-md' />
                                        :
                                        <div>
                                            <BsFolderPlus size={30} />
                                            <p className="mt-2">Browse to add side image</p>
                                            <span className="text-xs text-gray-300">
                                                (1200x400 pixels)
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setformdata({ ...formdata, img: e.target.files[0] })}
                                            />
                                        </div>
                                    }

                                </label>
                            </div>

                            {/* New Title  */}
                            <div className="w-full md:w-1/2 mb-5">

                                <div>
                                    <label className="block text-gray-700 mb-2">New Title</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter new title"
                                        value={formdata.title2}
                                        onChange={(e) => setformdata({ ...formdata, title2: e.target.value })}
                                    />
                                </div>
                                {/* Description */}
                                <div>
                                    <label className="block text-gray-700 mt-2">
                                        Add description
                                    </label>
                                    <textarea
                                        className="w-full p-2 mt-1 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                        rows="3"
                                        placeholder="Enter description"
                                        value={formdata.description2}
                                        onChange={(e) => setformdata({ ...formdata, description2: e.target.value })}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mt-2">
                                        Button Link
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Upload Link"
                                        value={formdata.Button_Link}
                                        onChange={(e) => setformdata({ ...formdata, Button_Link: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=' flex justify-end gap-[50px] mt-3 '>
                            <div className='w-[12%]'>
                                <Button
                                    className='bg-[#37D160] hover:bg-transparent border-[#37D160] w-full hover:text-[#37D160]'
                                    text="Add More"
                                // onClick={handleaddBanner}
                                />
                            </div>
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
                    </div>
                </form>

            </OnOffbutton>
        </>
    )
}

export default BrandImages