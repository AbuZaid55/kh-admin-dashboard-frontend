import React, { useEffect, useState } from 'react'
import api from '../../../../utils/api'
import Button from '../../../../compoenets/main/Button'
import Input from '../../../../compoenets/main/Input'
import { FaRegFileImage } from "react-icons/fa";
import { toast } from 'react-toastify'

function Categories() {
  const [edit, setedit] = useState(false)
  const [name, setname] = useState('')
  const [Description, setDescription] = useState('')
  const [img, setimg] = useState()
  const [nav_image, setNavImage] = useState()
  const [showInNav,setShowInNav]=useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  const [formatedData, setFormatedData] = useState([])

  const getAllCateogries = async () => {
    try {
      const res = await api.get(`/store/khw/categories/get-all-categories`);
      const data = res.data;
      setFormatedData(data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleformforadd = async (e) => {
    e.preventDefault();
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("description", Description)
    formdata.append("image", img)
    formdata.append("nav_image", nav_image)
    formdata.append("showInNav", showInNav)
    try {
      const res = await api.post("/store/khw/categories/add-category", formdata);
      const data = res.data;
      toast.success(data.message);
      setname('')
      setDescription('')
      setimg(null)
      setNavImage('')
      setShowInNav(false)
      getAllCateogries()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  // this is for handling the form for edditing category
  const handleformforEdit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) return;
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("description", Description)
    formdata.append("image", img)
    formdata.append("nav_image", nav_image)
    formdata.append("showInNav", showInNav)
    try {
      const res = await api.put(`/store/khw/categories/update-category/${selectedCategory}`, formdata);
      const data = await res.data
      toast.success(data.message)
      setname('')
      setDescription('')
      setSelectedCategory('')
      setimg(null)
      setNavImage('')
      setShowInNav(false)
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
    setShowInNav(false)
    setNavImage('')
    if (edit) {
      setedit(false)
    }
  }

  const handleEdit = (name, description, categoryId,showInNav) => {
    setname(name)
    setDescription(description)
    setSelectedCategory(categoryId)
    setShowInNav(showInNav)
    setedit(true)
  }

  const deleteCategory = async (id) => {
    if (!id) return;
    try {
      const res = await api.delete(`/store/khw/categories/delete-category/${id}`);
      const data = await res.data
      toast.success(data.message)
      getAllCateogries()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [edit]) 
  useEffect(() => {
    getAllCateogries()
  }, [])


  return (
    <>
      <div className='flex flex-col gap-8'>
        <div className='shadow-md rounded-[10px] p-4'>
          <h1 className='text-[18px]'>{edit ? "Edit" : "Add New"} Category</h1>

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


              <div className='flex gap-4'>
              <div className='w-full '>
                <label className=' opacity-70'>Category Image</label>
                <div className=' px-1 mt-3'>
                  <label
                    className="w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md flex items-center justify-between">
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
              <div className=' w-full'>
                <label className=' opacity-70'>Nav Image</label>
                <div className=' px-1 mt-3'>
                  <label
                    className="w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md flex items-center justify-between">
                    <input
                      type="file"
                      onChange={(e) => setNavImage(e.target.files[0])}
                      accept="image/*"
                      className="hidden" />
                    <span className=' opacity-60'>Browse</span>
                    <span className='opacity-60'><FaRegFileImage /></span>
                  </label>
                </div>
              </div>
              </div>

              <div>
                <label className=' cursor-pointer' htmlFor='showInNav'>Show In Nav?: <input id='showInNav' className='ml-1 w-4 h-4 cursor-pointer' type='checkbox' checked={showInNav} onChange={(e) => setShowInNav(e.target.checked)} /></label>
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
        <div className=' rounded-[10px] p-4 shadow-md'>
          <h1 className='text-[18px] mt-4 mb-1 font-semibold'>Added Categories</h1>
          <div className="overflow-x-auto">
            <table className="w-full border border-black shadow-md text-center">
              <thead className="bg-[#A2C6F4] text-black">
                <tr>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formatedData.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-100">
                    <td className="px-4 py-2 border"><span className='flex items-center justify-center'><img className='w-10 h-10 rounded-md aspect-square' src={item.image?.url} alt="Image" /></span></td>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="bg-[#EC9D0C] text-white px-3 py-1 rounded-md mr-2 cursor-pointer"
                        onClick={() => handleEdit(item.name, item.description, item._id,item.showInNav)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#EC390C] text-white px-3 py-1 rounded-md cursor-pointer"
                        onClick={() => deleteCategory(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
