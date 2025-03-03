import React from 'react'
import api from '../../../utils/api'
import { toast } from 'react-toastify'

function AddedCategories({  setedit, setname, setDescription,setSelectedCategory, formatedData ,getAllCateogries}) {

  const handleEdit = (name,description,categoryId)=>{
    setname(name)
    setDescription(description)
    setSelectedCategory(categoryId)
    setedit(true)
  }

  const deleteCategory = async(id)=>{
    if(!id) return;
    try {
      const res = await api.delete(`/store/eshop/categories/delete-category/${id}`);
      const data = await res.data 
      toast.success(data.message)
      getAllCateogries()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <>
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
                      onClick={() => handleEdit(item.name,item.description,item._id)}
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
    </>
  )
}

export default AddedCategories