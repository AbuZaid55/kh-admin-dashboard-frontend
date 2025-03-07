import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { LiaCaretSquareDown, LiaCaretSquareUp } from 'react-icons/lia';
import Input from '../../main/Input';

function BlogJewelleryCategories({ jewelleryData, setJewelleryData, categories, setCategories, editIndex, setEditIndex, handleSave }) {



    
    // // Load data from localStorage on component mount
    // useEffect(() => {
    //     const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    //     setCategories(storedCategories);
    // }, []);

    // // Update localStorage whenever categories change
    // useEffect(() => {
    //     if (categories.length > 0) {
    //         localStorage.setItem("categories", JSON.stringify(categories));
    //     }
    // }, [categories]);


    const handleChange = (e) => {
        setJewelleryData({
            ...jewelleryData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddMore = () => {
        //replicate the jewellery accordian with details
        return;


    };

    const handleReset = () => {
        setJewelleryData({ category: "", buttonLink: "" });
        setEditIndex(null);
    };

    const handleEdit = (index) => {
        setJewelleryData(categories[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const filteredCategories = categories.filter((_, i) => i !== index);
        setCategories(filteredCategories);
    };
    return (
        <>
            <div className='bg-white w-[100%] shadow-2xl my-4 flex flex-col rounded-lg p-4 h-max'>

                <h1 className="text-lg text-gray-700">Jewellery Categories</h1>




                <div className='w-full'>
                    <div className='w-full border border-gray-300 py-4 px-4 rounded-xl my-4'>
                        <div className='flex flex-col w-full py-2 gap-4'>
                            <div className='flex flex-col gap-2 w-full'>
                                <div className='flex flex-col  gap-2'>
                                    <label className='text-sm text-gray-700'>Add Category</label>
                                    <Input type="text"
                                        // className='border border-gray-300 rounded-sm text-gray-700 focus:outline-none px-1 py-1 w-48' 
                                        name='category' value={jewelleryData.category} onChange={handleChange} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm text-gray-700'>Add Link</label>
                                    <Input type="text"
                                        // className='border border-gray-300 rounded-sm text-gray-700 focus:outline-none px-1 py-1 w-48'
                                        name='buttonLink' value={jewelleryData.buttonLink} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex gap-2 justify-end mt-4 mb-2'>
                                <button onClick={handleAddMore} className='bg-[#37D160] text-white text-md rounded-sm px-4 py-2 cursor-pointer'>Add more</button>
                                <button onClick={handleReset} className='bg-[#333333] text-white text-md rounded-sm px-4 py-2 cursor-pointer'>Reset</button>
                                <button onClick={handleSave} className='bg-[#EC9D0C] text-white text-md rounded-sm px-4 py-2 cursor-pointer'>Save Changes</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full bg-gray-200 rounded-2xl gap-4 '>
                        {categories.map((item, index) => (
                            <div key={index} className='flex justify-between border-b border-gray-300 py-4 px-2 '>
                                <div className='flex w-3/4 py-2 gap-2 justify-around'>
                                    <div className='flex flex-col py-'>
                                        <label className='text-md text-gray-800 text-left'>Category Name</label>
                                        <label className='text-gray-700 text-left'>{item.category}</label>
                                    </div>
                                    <div className='flex flex-col  py-'>
                                        <label className='text-md text-gray-800 text-left'>Link</label>
                                        <a href={item.buttonLink} target="_blank" rel="noopener noreferrer" className='text-gray-700 text-left'>{item.buttonLink}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2 items-center justify-evenly w-1/4'>

                                    <FaEdit className='text-gray-500 cursor-pointer' onClick={() => handleEdit(index)} />
                                    <FaTrash className='text-red-500 cursor-pointer' onClick={() => handleDelete(index)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default BlogJewelleryCategories