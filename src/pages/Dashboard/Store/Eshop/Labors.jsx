import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
import Input from './../../../../compoenets/main/Input';
import Button from './../../../../compoenets/main/Button';
import { toast } from "react-toastify";

const page = () => {
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [laborList, setLaborList] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [selectedLabor, setSeletedLabor] = useState('')

  const handleEdit = (labor) => {
    setEditMode(true)
    setType(labor.type)
    setPrice(labor.price)
    setSeletedLabor(labor._id)
  }
  const cancleEdit = () => {
      setEditMode(false)
      setType('')
      setPrice('')
      setSeletedLabor('')
  }
  const saveEdit = async()=>{
    if(!selectedLabor) return;
    try {
      const res = await api.put(`/store/eshop/labors/update-labor/${selectedLabor}`, { type, price });
      const data = await res.data;
      toast.success(data.message);
      getLabors();
      setType('')
      setPrice('')
      setSeletedLabor('')
      setEditMode(false)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const deleleLabor = async(id)=>{
    if(!id) return
    try {
      const res = await api.delete(`/store/eshop/labors/delete-labor/${id}`);
      const data = await res.data;
      toast.success(data.message);
      getLabors()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await api.post("/store/eshop/labors/add-labor", { type, price });
      const data = await res.data;
      toast.success(data.message);
      getLabors();
      setType('')
      setPrice('')
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  };
  const getLabors = async () => {
    try {
      const res = await api.get("/store/eshop/labors/get-labors");
      const data = await res.data;
      setLaborList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLabors();
  }, []);
  return (
    <div className="p-4 bg-white h-full rounded-xl">
      <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-4">{editMode?"Edit Labor":"Add Labor"}</h2>
        <div className="flex items-center space-x-4">
          <Input value={type} onChange={(e) => setType(e.target.value)} type="text" placeholder="Labor Type" />
          <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Labor Type Price" />
          <Button text="Add" onClick={handleSubmit} className={`${editMode?"hidden":""} px-8 bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-2 `}/>
          <div className={`${editMode?"":"hidden"} flex gap-4`}>
            <Button text="Save" onClick={saveEdit} className="px-8 bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-2 " />
            <Button
              className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333] mt-2'
              text="Cancel" onClick={() => { cancleEdit () }} />
          </div>
        </div>
      </div>
      {/* Table Layout */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full border border-black shadow-md text-center">
          <thead className="bg-[#A2C6F4] text-black">
            <tr>
              <th className="px-4 py-2 border">Labor Type</th>
              <th className="px-4 py-2 border">Labor Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {laborList.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2 border">{item.type}</td>
                <td className="px-4 py-2 border">₹{item.price}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-[#EC9D0C] text-white px-3 py-1 rounded-md mr-2 cursor-pointer"
                    onClick={() => { handleEdit(item) }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#EC390C] text-white px-3 py-1 rounded-md cursor-pointer"
                    onClick={() =>deleleLabor(item._id)}
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
};

export default page;

