import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
import Input from './../../../../compoenets/main/Input';
import Button from './../../../../compoenets/main/Button';
import { toast } from "react-toastify";

const page = () => {
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");
  const [makingChargeList, setMakingChargeList] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [selectedMakingCharge, setSelectedMakingCharge] = useState('')

  const handleEdit = (m_charge) => {
    setEditMode(true)
    setName(m_charge.name)
    setPercent(m_charge.percent)
    setSelectedMakingCharge(m_charge._id)
  }
  const cancleEdit = () => {
      setEditMode(false)
      setName('')
      setPercent('')
      setSelectedMakingCharge('')
  }
  const saveEdit = async()=>{
    if(!selectedMakingCharge) return
    try {
      const res = await api.put(`/store/eshop/making-charges/update-making-charge/${selectedMakingCharge}`, { name, percent });
      const data = await res.data;
      toast.success(data.message);
      getMakingCharges();
      setName('')
      setPercent('')
      setEditMode(false)
      setSelectedMakingCharge('')
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const deleteMakingCharge = async(id)=>{
    if(!id) return;
    try {
      const res = await api.delete(`/store/eshop/making-charges/delete-making-charge/${id}`);
      const data = await res.data;
      toast.success(data.message);
      getMakingCharges();
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await api.post("/store/eshop/making-charges/add-making-charge", { name, percent });
      const data = await res.data;
      toast.success(data.message);
      getMakingCharges();
      setName('')
      setPercent('')
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  };
  const getMakingCharges = async () => {
    try {
      const res = await api.get("/store/eshop/making-charges/get-making-charges");
      const data = await res.data;
      setMakingChargeList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMakingCharges();
  }, []);
  return (
    <div className="p-4 bg-white h-full rounded-xl">
      <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-4">{editMode?"Edit Making Charge":"Add Making Charge"}</h2>
        <div className="flex items-center space-x-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
          <Input value={percent} onChange={(e) => setPercent(e.target.value)} type="number" placeholder="Percent" />
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
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Percent</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {makingChargeList.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.percent}%</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-[#EC9D0C] text-white px-3 py-1 rounded-md mr-2 cursor-pointer"
                    onClick={() => { handleEdit(item) }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#EC390C] text-white px-3 py-1 rounded-md cursor-pointer"
                    onClick={() => deleteMakingCharge(item._id)}
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

