import React, { useState } from 'react'
import { LiaCaretSquareDown, LiaCaretSquareUp } from 'react-icons/lia';
import Input from './../../main/Input';
import Button from '../../main/Button';

function Blogcomp() {

    const [image, setImage] = useState(null);
    const [blogData, setBlogData] = useState({
        title: "",
        subtitle: "",
        date: "",
        description: "",
        buttonText: "",
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            // console.log( reader.readAsDataURL )
            console.log(reader.result)
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        console.log("Saved Blog Data:", { ...blogData, image });
        // toast.success( "Blog saved successfully!" );
    };

    const handleReset = () => {
        setBlogData({
            title: "",
            subtitle: "",
            date: "",
            description: "",
            buttonText: "",
        });
        setImage(null);
    };

    const handleAddMore = () => {
        console.log("Adding more blog fields...");
        alert("Add more functionality can be implemented here.");
    };
    return (
        <>
            <div className='bg-white w-[100%] shadow-2xl mx-8 mt-4 flex flex-col rounded-lg p-5'>

                <h1 className="text-lg text-gray-700 text-md">Blog</h1>


                {/* Input Fields (Hidden/Visible on Toggle) */}

                <div className='w-full flex flex-col mt-4 space-y-4'>
                    <div className='flex flex-col w-full gap-2'>
                        <label className='text-sm font-medium text-gray-600'>Add Title</label>
                        <Input
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleInputChange}
                        // className='border border-gray-300 rounded-sm p-1 focus:outline-none w-[80%]'
                        />
                    </div>

                    <div className='flex w-full gap-4'>
                        <div className='w-1/2 flex items-center gap-2'>
                            <label className='text-sm font-medium text-gray-600'>Add Sub-title</label>
                            <Input
                                type="text"
                                name="subtitle"
                                value={blogData.subtitle}
                                onChange={handleInputChange}
                            // className='border border-gray-300 rounded-sm p-1 focus:outline-none w-3/4'
                            />
                        </div>
                        <div className='w-1/2 flex items-center gap-2'>
                            <label className='text-sm font-medium text-gray-600'>Date</label>
                            <Input
                                type="date"
                                name="date"
                                value={blogData.date}
                                onChange={handleInputChange}
                            // className='border border-gray-300 rounded-sm p-1 focus:outline-none w-2/3 cursor-pointer'
                            />
                        </div>
                    </div>

                    <div className='flex gap-4 mt-4'>
                        <div className='w-1/2 flex flex-col gap-1'>
                            <label className='text-sm font-medium text-gray-600 text-left'>Add Image</label>
                            <label className='border border-gray-300 h-48 rounded-sm w-full' id="imgBox">
                                {image && <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-md" />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className='w-full border cursor-pointer opacity-0 h-full'
                                    id="imgBox"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>
                        <div className='w-2/3 flex flex-col my-6'>
                            <div className='w-full flex flex-col gap-1'>
                                <label className='text-sm font-medium text-gray-600 text-left'>Add Description</label>
                                <textarea
                                    className="w-[100%] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                    rows="4"
                                    placeholder="Enter description"
                                    value={blogData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className='w-full flex flex-col gap-1 my-4'>
                                <label className='text-sm font-medium text-gray-600 text-left'>Button</label>
                                <Input
                                    type="text"
                                    name="buttonText"
                                    value={blogData.buttonText}
                                    onChange={handleInputChange}
                                // className='border border-gray-300 rounded-sm p-2 focus:outline-none w-1/3'
                                />
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}

                    <div className=' flex justify-end gap-[50px] mt-10 '>
                        <button onClick={handleAddMore} className='bg-[#37D160] text-white text-md rounded-sm px-4 py-2 cursor-pointer'>Add more</button>
                        <div className='w-[20%]'>
                            <Button
                                type='reset'
                                onClick={handleReset}
                                className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                                text="Reset" />

                        </div>

                        <div className='w-[30%]'>
                            <Button onClick={handleSave} text="Save Changes" type='submit' />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Blogcomp