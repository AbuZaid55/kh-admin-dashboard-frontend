import api from '../../../../utils/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../../../compoenets/main/Input';
import Button from '../../../../compoenets/main/Button';

export default function ColorManagement() {
  const [Colors, setColors] = useState([]);
  const [name,setName]=useState('')
  const [color_code,setColorCode]=useState('#000000')
  const [loaded,setLoaded]=useState(false)
  const [isEditMode,setIsEditMode]=useState(false)
  const [selectedColor,setSelectedColor]=useState('')

  const handleEdit = (color)=>{
    setIsEditMode(true)
    setColorCode(color.color_code)
    setName(color.name)
    setSelectedColor(color._id)
  }

  const cancleEdit = () =>{
    setIsEditMode(false)
    setColorCode('#000000')
    setName('')
    setSelectedColor('')
  }
 
  const addColor = async()=>{
    try {
      const res = await api.post("/store/eshop/colors/add-color",{name,color_code})
      const data = res.data
      toast.success(data?.message)
      setName('')
      setColorCode("#000000")
      getColors()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const saveColor = async()=>{
    if(!selectedColor) return;
    try {
      const res = await api.put(`/store/eshop/colors/update-color/${selectedColor}`,{name,color_code})
      const data = res.data
      toast.success(data?.message)
      setName('')
      setColorCode("#000000")
      getColors()
      setSelectedColor('')
      setIsEditMode(false)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const deleteColor = async(id)=>{
    if(!id) return;
    try {
      const res = await api.delete(`/store/eshop/colors/delete-color/${id}`)
      const data = res.data
      toast.success(data?.message)
      getColors()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const getColors = async()=>{
    try {
      const res = await api.get("/store/eshop/colors/get-colors")
      const data = res.data
      setColors(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    setLoaded(true)
    getColors()
  },[])

  if(!loaded) return; 

  return (
    <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
      <h2 className="text-lg font-semibold">{isEditMode?"Edit Color":"Add Color"}</h2>
      <p className="text-lg mb-4">Manage your product Colors</p>

        <div className='flex gap-4 '>
          <div className='w-full'>
            <label htmlFor="ColorName">
              Color Name
            </label>
            <Input
              type="text"
              id="ColorName"
              name="ColorName"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="Enter Color name"
              
            />
          </div>
          <div className='w-full'>
          <label htmlFor="color" >
                Select Color
            </label>
            <div className="flex items-center gap-2">
                <Input
                type="color"
                id="color"
                name="ColorName"
                value={color_code}
                onChange={(e) => setColorCode(e.target.value)}
                className="w-25 h-10 mt-2 border rounded cursor-pointer"
                />
                <Input
                type="text"
                value={color_code}
                onChange={(e)=>{setColorCode(e.target.value)}}
                />
            </div>
          </div>
         <div className='flex flex-col'>
         <Button 
            className={` ${isEditMode?"hidden":""} w-[100px] bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-auto `}
            text="Add"
            type="submit"
            onClick={addColor}
          />
          <div className={`${isEditMode?"":"hidden"} flex gap-2 mt-auto`}>
          <Button 
            className="w-[100px] bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-auto "
            text="Save"
            type="submit"
            onClick={saveColor}
          />
          <Button
              className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333] mt-2'
              text="Cancel" onClick={() => { cancleEdit() }} />
          </div>
         </div>
        </div>

      {/* Table Layout */}
      <div className="overflow-x-auto mt-10">
          <table className="w-full border border-black shadow-md text-center">
            <thead className="bg-[#A2C6F4] text-black">
              <tr>
                <th className="px-4 py-2 border">Color</th>
                <th className="px-4 py-2 border">Color Name</th>
                <th className="px-4 py-2 border">Color Code</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Colors.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2 border"><div className='w-10 h-10 aspect-square mx-auto rounded-md' style={{backgroundColor:item.color_code}}></div></td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.color_code}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-[#EC9D0C] text-white px-3 py-1 rounded-md mr-2 cursor-pointer"
                     onClick={()=>{handleEdit(item)}}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#EC390C] text-white px-3 py-1 rounded-md cursor-pointer"
                      onClick={() => deleteColor(item._id)}
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
  );
}