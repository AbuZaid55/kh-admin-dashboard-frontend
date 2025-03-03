import React, { useEffect } from 'react'
import Input from './../../main/Input';
import { FaRegFileImage } from "react-icons/fa";
import Button from './../../main/Button';
import api from '../../../utils/api'
import { toast } from 'react-toastify'

function AddingNewCategories({ edit, setedit, name, Description, img, setname, setDescription, setimg, selectedCategory, setSelectedCategory, getAllCateogries }) {

    // this is for handling the form for adding new category
    const handleformforadd = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("name", name)
        formdata.append("description", Description)
        formdata.append("image", img)
        try {
            const res = await api.post("/store/eshop/categories/add-category", formdata);
            const data = res.data;
            toast.success(data.message);
            setname('')
            setDescription('')
            setimg(null)
            getAllCateogries()
        } catch (error) {
            toast.error(error?.response?.data?.error)
        }
    }

    // this is for handling the form for edditing category
    const handleformforEdit = async(e) => {
        e.preventDefault();
        if(!selectedCategory) return;
        const formdata = new FormData()
        formdata.append("name", name)
        formdata.append("description", Description)
        formdata.append("image", img)
        try {
            const res = await api.put(`/store/eshop/categories/update-category/${selectedCategory}`, formdata);
            const data = await res.data 
            toast.success(data.message)
            setname('')
            setDescription('')
            setSelectedCategory('')
            setimg(null)
            setedit(false)
            getAllCateogries()
        } catch (error) {
            toast.error(error?.response?.data?.error)
        }
    }


    const handleReset = () => {
        setname('')
        setDescription('')
        setSelectedCategory('')
        setimg('')
        if (edit) {
            setedit(false)
        }
    }

    return (
        <>
            <div className='shadow-md rounded-[10px] p-4'>
                <h1 className='text-[18px]'>{edit ? "Edit" : "Add New"}Category</h1>

                <form onSubmit={edit ? handleformforEdit : handleformforadd}> {/* to check form to edit or add new category */}
                    <div className=' mt-8  flex flex-col gap-5'>
                        <div className=' '>
                            <label className=' opacity-70'>Category Name</label>
                            <div className=' px-1'>
                                <Input type='name' placeholder='Name of Category'
                                    value={name}
                                    onChange={(e) => setname(e.target.value)} />
                            </div>
                        </div>

                        <div className=' '>
                            <label className=' opacity-70'>Description</label>
                            <div className=' px-1'>
                                <textarea
                                    value={Description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='Write here'
                                    className='mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md' />
                            </div>
                        </div>


                        <div className=' '>
                            <label className=' opacity-70'>Category Images</label>
                            <div className=' px-1 mt-3'>
                                <label
                                    className=" px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md w-[25%] flex items-center justify-between">
                                    <input
                                        type="file"
                                        onChange={(e) => setimg(e.target.files[0])}
                                        accept="image/*"
                                        className="hidden" />
                                    <span className=' opacity-60'>Browse</span>
                                    <span className='opacity-60'><FaRegFileImage /></span>
                                </label>

                            </div>
                        </div>

                        <div className=' flex  w-[35%] gap-[50px]'>
                            <div className='w-[60%]'>
                                <Button type="submit"
                                    text={edit ? "Save Changes" : "Add Category"} />

                            </div>

                            <div className='w-[40%]'>
                                <Button
                                    type={edit ? "button" : "reset"}
                                    className='bg-[#333333] hover:bg-transparent w-[100%] border-[#333333] hover:text-[#333333]'
                                    text={edit ? "Cancel" : 'Reset'}
                                    onClick={() => handleReset()}
                                />
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default AddingNewCategories