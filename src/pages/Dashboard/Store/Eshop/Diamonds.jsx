import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from './../../../../compoenets/main/Input';
import Button from './../../../../compoenets/main/Button';
import api from '../../../../utils/api'
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const page = () => {
  const [grade, setGrade] = useState("");
  const [variant, setVariant] = useState("");
  const [priceRanges, setPriceRange] = useState([{ minCts: "", maxCts: "", pricePerGram: "" }]);
  const [diamondList, setDiamondList] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [selectedDiamondId, setSelectedDiamondId] = useState('')

  const addPriceRange = () => {
    setPriceRange([...priceRanges, { minCts: "", maxCts: "", pricePerGram: "" }]);
  };

  const removePriceRange = (index) => {
    if (priceRanges.length > 1) {
      setPriceRange(priceRanges.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (diamond) => {
    setEditMode(true)
    setGrade(diamond.grade)
    setVariant(diamond.variant)
    setPriceRange(diamond.priceRanges)
    setSelectedDiamondId(diamond._id)
  }

  const handleCancle = () =>{
    setEditMode(false)
    setGrade('')
    setVariant('')
    setPriceRange([{ minCts: "", maxCts: "", pricePerGram: "" }])
    setSelectedDiamondId('')
  }

  const handleSubmit = async () => {
    try {
      const res = await api.post("/store/eshop/diamonds/add-diamond", { grade, variant, priceRanges });
      const data = await res.data;
      toast.success(data.message);
      setGrade("");
      setVariant("");
      setPriceRange([{ minCts: "", maxCts: "", pricePerGram: "" }]);
      getDiamonds();
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  };

  const handleSave = async() => {
    if(!selectedDiamondId) return;
    try {
      const res = await api.put(`/store/eshop/diamonds/update-diamond/${selectedDiamondId}`, { grade, variant, priceRanges });
      const data = await res.data;
      toast.success(data.message);
      setGrade("");
      setVariant("");
      setPriceRange([{ minCts: "", maxCts: "", pricePerGram: "" }]);
      setSelectedDiamondId('')
      setEditMode(false)
      getDiamonds();
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const deleteDiamond = async(id)=>{
    if(!id) return
    try {
      const res = await api.delete(`/store/eshop/diamonds/delete-diamond/${id}`);
      const data = await res.data;
      toast.success(data.message);
      getDiamonds()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const getDiamonds = async () => {
    try {
      const res = await api.get("/store/eshop/diamonds/get-diamonds");
      const data = await res.data;
      setDiamondList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDiamonds();
  }, []);
  return (
    <div className="p-4 bg-white h-full rounded-xl">
      <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-4">{(editMode) ? "Update Diamond" : "Add Diamond"}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input value={grade} onChange={(e) => setGrade(e.target.value)} type="text" placeholder="Diamond Grade" />
          <Input value={variant} onChange={(e) => setVariant(e.target.value)} type="text" placeholder="Variant" />
        </div>
        <div>
          {priceRanges.map((range, i) => (
            <div className="flex gap-4 items-center justify-between my-4" key={i}>
              <Input value={range.minCts} onChange={(e) => setPriceRange((prev) => prev.map((item, index) => (index === i ? { ...item, minCts: e.target.value } : item)))} type="number" placeholder="Min Range" />
              <Input value={range.maxCts} onChange={(e) => setPriceRange((prev) => prev.map((item, index) => (index === i ? { ...item, maxCts: e.target.value } : item)))} type="number" placeholder="Max Range" />
              <Input value={range.pricePerGram} onChange={(e) => setPriceRange((prev) => prev.map((item, index) => (index === i ? { ...item, pricePerGram: e.target.value } : item)))} type="number" placeholder="Price Per Gram" />

              {priceRanges.length > 1 && (
                <button onClick={() => removePriceRange(i)} className="text-red-500 m-2 cursor-pointer">
                  X
                </button>
              )}
            </div>
          ))}
        </div>
        <Button text="+Range" onClick={addPriceRange} className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333] mt-2 block' />
        <Button text="Add" onClick={handleSubmit} className={` ${editMode ? "hidden" : ""} px-10 bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-2 `} />
        <div className={`${editMode ? "" : "hidden"} flex items-center gap-4`}>
          <Button text="Save" onClick={handleSave} className={` px-10 bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-2 `} />
          <Button text="Cancle" onClick={handleCancle} className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333] mt-2 block' />
        </div>
      </div>
      <div className=' rounded-[10px] p-4 shadow-md'>
        <h1 className='text-[18px] font-semibold'>Added Diamonds</h1>
        {diamondList.map((diamond) => (
          <div className="border rounded-md my-2 p-4" key={diamond._id}>
            <div className="flex justify-between">
              <div className="flex gap-4 text-xl">
                <p>
                  <span className="font-semibold">Grade:</span> {diamond.grade}
                </p>
                <p>
                  <span className="font-semibold">Variant:</span> {diamond.variant}
                </p>
              </div>
              <div className="flex gap-2 text-xl">
                <button type="button" onClick={() => { handleEdit(diamond) }}><BiEditAlt className=' text-[#676767] cursor-pointer' /></button>
                <button type="button" onClick={()=>{deleteDiamond(diamond._id)}}><RiDeleteBin5Line className=' text-red-500 cursor-pointer' /></button>
              </div>
            </div>
            {diamond.priceRanges.map((range, i) => (
              <div key={i} className="flex justify-between mt-4 text-xl border-b border-gray-300">
                <p>
                  <span className="font-semibold">Min Range:</span> {range.minCts}cts
                </p>
                <p>
                  <span className="font-semibold">Max Range:</span> {range.maxCts}cts
                </p>
                <p>
                  <span className="font-semibold">Price/Grams:</span> ₹{range.pricePerGram}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
