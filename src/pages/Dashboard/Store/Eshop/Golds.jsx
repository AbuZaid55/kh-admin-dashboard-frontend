import React, { useEffect, useState } from "react";
import Input from './../../../../compoenets/main/Input';
import Button from './../../../../compoenets/main/Button';
import api from '../../../../utils/api'
import { toast } from 'react-toastify'

const page = () => {
  const [carat, setCarat] = useState("");
  const [pricePerGram, setPricePerGram] = useState("");
  const [making_charge, setMakingCharge] = useState('')
  const [wastage_charge, setWastageCharge] = useState('')
  const [goldLIst, setGoldList] = useState([]);
  const [makingChargeList, setMakingChargeList] = useState([]);
  const [wastageChargeList, setWastageChargeList] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [selectedGold, setSeletedGold] = useState('')

  const openEditMode = (item) => {
    setEditMode(true)
    setCarat(item.carat)
    setPricePerGram(item.pricePerGram)
    setSeletedGold(item._id)
    setMakingCharge(item.making_charge ? item.making_charge._id : "")
    setWastageCharge(item.wastage_charge ? item.wastage_charge._id : "")
  }
  const closeEditMode = () => {
    setEditMode(false)
    setCarat('')
    setPricePerGram('')
    setSeletedGold('')
    setMakingCharge('')
    setWastageCharge('')
  }
  const handleSubmit = async () => {
    try {
      const res = await api.post("/store/eshop/golds/add-gold", { carat, pricePerGram, making_charge, wastage_charge });
      const data = await res.data;
      toast.success(data.message);
      getGolds();
      setCarat('')
      setPricePerGram('')
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  };

  const saveChanges = async() => {
    if(!selectedGold) return;
    try {
      const res = await api.put(`/store/eshop/golds/update-gold/${selectedGold}`, { carat, pricePerGram, making_charge, wastage_charge });
      const data = await res.data;
      toast.success(data.message);
      getGolds();
      setCarat('')
      setPricePerGram('')
      setSeletedGold('')
      setEditMode(false)
      setMakingCharge('')
      setWastageCharge('')
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const deleteGold = async(id)=>{
    if(!id) return;
    try {
      const res = await api.delete(`/store/eshop/golds/delete-gold/${id}`);
      const data = await res.data;
      toast.success(data.message);
      getGolds()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const getGolds = async () => {
    try {
      const res = await api.get("/store/eshop/golds/get-golds");
      const data = await res.data;
      setGoldList(data);
    } catch (error) {
      console.log(error);
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

  const getWastageCharges = async () => {
    try {
      const res = await api.get("/store/eshop/wastage-charges/get-wastage-charges");
      const data = await res.data;
      setWastageChargeList(data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getGolds();
    getMakingCharges()
    getWastageCharges()
  }, []);
  return (
    <div className="p-4 bg-white h-full rounded-xl">
      {
        !editMode && (
          <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-4">Add Gold</h2>
            <div className="flex items-center space-x-4">
              <div className="w-full">
                <label>Enter Gold Carat</label>
                <Input
                  placeholder="Gold Carat"
                  type="text"
                  value={carat}
                  onChange={(e) => { setCarat(e.target.value) }}
                />
              </div>
              <div className="w-full">
                <label>Enter Price/Grams</label>
                <Input
                  placeholder="Gold Price/Grams"
                  type="number"
                  value={pricePerGram}
                  onChange={(e) => { setPricePerGram(e.target.value) }}
                />
              </div>

            </div>
            <div className="flex gap-4 mt-6">
              <div className="w-full">
                <label>Select Making Charge</label>
                <select name="making_charge" value={making_charge} onChange={(e) => { setMakingCharge(e.target.value) }} className="mt-2 block text-gray-500 w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                  <option value="">Select Making Charge</option>
                  {makingChargeList.map((charge) => (
                    <option key={charge._id} value={charge._id}>
                      {charge.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label>Select Wastage Charge</label>
                <select name="wastage_charge" value={wastage_charge} onChange={(e) => { setWastageCharge(e.target.value) }} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                  <option value="">Select Wastage Charge</option>
                  {wastageChargeList.map((charge) => (
                    <option key={charge._id} value={charge._id}>
                      {charge.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="w-fit px-4 bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-4 "
              text='Add'
            />
          </div>
        )
      }

      {editMode && (
        <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-4">Edit Gold</h2>
          <div className="flex items-center space-x-4">
            <div className="w-full">
              <label>Enter Gold Carat</label>
              <Input
                placeholder="Gold Carat"
                type="text"
                value={carat}
                onChange={(e) => { setCarat(e.target.value) }}
              />
            </div>
            <div className="w-full">
              <label>Enter Price/Grams</label>
              <Input
                placeholder="Gold Price/Grams"
                type="number"
                value={pricePerGram}
                onChange={(e) => { setPricePerGram(e.target.value) }}
              />
            </div>

          </div>

          <div className="flex gap-4 mt-6">
            <div className="w-full">
              <label>Select Making Charge</label>
              <select name="making_charge" value={making_charge} onChange={(e) => { setMakingCharge(e.target.value) }} className="mt-2 block text-gray-500 w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                <option value="">Select Making Charge</option>
                {makingChargeList.map((charge) => (
                  <option key={charge._id} value={charge._id}>
                    {charge.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label>Select Wastage Charge</label>
              <select name="wastage_charge" value={wastage_charge} onChange={(e) => { setWastageCharge(e.target.value) }} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                <option value="">Select Wastage Charge</option>
                {wastageChargeList.map((charge) => (
                  <option key={charge._id} value={charge._id}>
                    {charge.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
          <Button
            className="w-fit px-4 bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] "
            onClick={saveChanges}
            text='Save'
          />

          <Button
            className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333]'
            text="Cancel" onClick={() => closeEditMode()} />
          </div>
        </div>
      )}

      <table className="w-full border border-black shadow-md text-center mt-10">
        <thead className="bg-[#A2C6F4] text-black">
          <tr>
            <th className="px-4 py-2 border">Carat</th>
            <th className="px-4 py-2 border">Price/Grams</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {goldLIst.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-100">
              <td className="px-4 py-2 border">{item.carat}</td>
              <td className="px-4 py-2 border">₹{item.pricePerGram}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-[#EC9D0C] text-white px-3 py-1 rounded-md mr-2 cursor-pointer"
                  onClick={() => openEditMode(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-[#EC390C] text-white px-3 py-1 rounded-md cursor-pointer"
                  onClick={() => deleteGold(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
