import React, { useEffect, useState } from "react";
import Input from './../../main/Input';
import Button from './../../main/Button';
import api from '../../../utils/api'
import {toast} from 'react-toastify'

const TableLayout = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('')
  const [formatedData,setFormatedData]=useState([])
  const [categories,setCategories]=useState([])
  const [categoryId, setCategoryId] = useState('')
  const [selectedStyleId,setSelectedStyleId]=useState('')

  const openEditCard = (item) => {
    setEditMode(true)
    setName(item.styleName)
    setCategoryId(item.categoryId)
    setSelectedStyleId(item.styleId)
  };

  const closeEditMode = () => {
    setEditMode(false);
    setName('')
    setCategoryId('')
    setSelectedStyleId('')
  };

  const handleSubmit = async()=>{
    try {
      const res = await api.post("/store/eshop/styles/add-style",{name,categoryId})
      const data = await res.data 
      toast.success(data?.message)
      setName('')
      setCategoryId('')
      getCateogries()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const saveChanges = async() => {
    try {
      const res = await api.put(`/store/eshop/styles/update-style/${selectedStyleId}`,{name,categoryId})
      const data = await res.data 
      toast.success(data?.message)
      setName('')
      setCategoryId('')
      getCateogries()
      setSelectedStyleId('')
      setEditMode(false)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  };

  const deleteStyle = async(id)=>{
    try {
      const res = await api.delete(`/store/eshop/styles/delete-style/${id}`)
      const data = await res.data 
      toast.success(data.message)
      getCateogries()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }


  const getCateogries = async () => {
    try {
      const res = await api.get(`/store/eshop/categories/get-all-categories`);
      const data = res.data;
      let newData = []
      data.map((category)=>{
        category?.styles.map((style)=>{
          newData.push({categoryId:category._id,categoryName:category.name,styleName:style.name,styleId:style._id})
        })
      })
      setFormatedData(newData)
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getCateogries()
  },[])

  return (
    <div className="p-6 flex flex-col items-center">

      {
        !editMode  && (
          <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-4">Add Style</h2>
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Style Name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
              <select
                value={categoryId}
                onChange={(e) => { setCategoryId(e.target.value) }}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  "
              >
                <option value="">Select Category</option>
                {categories.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <Button
                onClick={handleSubmit}
                className="w-[40%] bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-2 "
                text='Add'
              />

            </div>
          </div>
        )
      }

      {editMode && (
        <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-4">Edit Style</h2>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Style Name"
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
           
              <select
                value={categoryId}
                onChange={(e) => { setCategoryId(e.target.value) }}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  "
              >
                <option value="">Select Category</option>
                {categories.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            <Button
              className="w-[40%] bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-2 "
              onClick={saveChanges}
              text='Save'
            />


            <Button
              className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333] mt-2'
              text="Cancel" onClick={() => { closeEditMode() }} />

          </div>
        </div>
      )}


      <div className="w-[100%]">

        <h1 className="text-black text-lg font-semibold mb-4 text-left">
          Existing Styles
        </h1>

        {/* Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full border border-black shadow-md text-center">
            <thead className="bg-[#A2C6F4] text-black">
              <tr>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Style</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formatedData.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2 border">{item.categoryName}</td>
                  <td className="px-4 py-2 border">{item.styleName}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-[#EC9D0C] text-white px-3 py-1 rounded-md mr-2 cursor-pointer"
                      onClick={() => {openEditCard(item)}}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#EC390C] text-white px-3 py-1 rounded-md cursor-pointer"
                      onClick={() => deleteStyle(item.styleId)}
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
  );
};

export default TableLayout;
