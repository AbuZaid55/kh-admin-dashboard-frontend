import React, { useEffect, useState } from "react";
import Input from "./../../../../compoenets/main/Input";
import Button from "./../../../../compoenets/main/Button";
import api from "../../../../utils/api";
import { toast } from "react-toastify";
import { FaRegFileImage } from "react-icons/fa";

const RecommendedFor = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [recommendedList,setRecommendedList]=useState([])
  const [selectedRecommendedId, setSelectedRecommendedId] = useState("");

  const openEditCard = (item) => {
    setEditMode(true);
    setName(item.name);
    setSelectedRecommendedId(item._id)
  };

  const closeEditMode = () => {
    setEditMode(false);
    setName("");
    setSelectedRecommendedId("");
  };

  const handleSubmit = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("image", image);
      const res = await api.post("/store/eshop/recommended/add-recommended", formdata);
      const data = await res.data;
      toast.success(data?.message);
      setName("");
      getRecommended();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const saveChanges = async () => {
    if (!selectedRecommendedId) return;
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("image", image);
      const res = await api.put(`/store/eshop/recommended/update-recommended/${selectedRecommendedId}`, formdata);
      const data = await res.data;
      toast.success(data?.message);
      setName("");
      setSelectedRecommendedId("");
      setEditMode(false);
      getRecommended();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const deleteStyle = async (id) => {
    try {
      const res = await api.delete(`/store/eshop/recommended/delete-recommended/${id}`);
      const data = await res.data;
      toast.success(data.message);
      getRecommended();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const getRecommended = async () => {
    try {
      const res = await api.get(`/store/eshop/recommended/get-all-recommended`);
      const data = res.data
      setRecommendedList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecommended();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      {!editMode && (
        <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-4">Add Recommended</h2>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className=" mt-6">
            <label className=" px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md w-[25%] flex items-center justify-between">
              <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="hidden" />
              <span className=" opacity-60">Browse</span>
              <span className="opacity-60">
                <FaRegFileImage />
              </span>
            </label>
          </div>

          <Button onClick={handleSubmit} className="w-[20%] bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-6 " text="Add" />
        </div>
      )}

      {editMode && (
        <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-4">Edit Recommended</h2>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

          </div>
          <div className=" mt-6">
            <label className=" px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md w-[25%] flex items-center justify-between">
              <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="hidden" />
              <span className=" opacity-60">Browse</span>
              <span className="opacity-60">
                <FaRegFileImage />
              </span>
            </label>
          </div>
          <div className="flex gap-4 mt-6">
            <Button className="w-[20%] bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] " onClick={saveChanges} text="Save" />

            <Button
              className="bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333]"
              text="Cancel"
              onClick={() => {
                closeEditMode();
              }}
            />
          </div>
        </div>
      )}

      <div className="w-[100%]">
        <h1 className="text-black text-lg font-semibold mb-4 text-left">Added Recommendeds</h1>

        {/* Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full border border-black shadow-md text-center">
            <thead className="bg-[#A2C6F4] text-black">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recommendedList.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2 border">
                    <span className="flex items-center justify-center">
                      <img className="w-10 h-10 rounded-md aspect-square" src={item.image?.url} alt="Image" />
                    </span>
                  </td>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-[#EC9D0C] text-white px-3 py-1 rounded-md mr-2 cursor-pointer"
                      onClick={() => {
                        openEditCard(item);
                      }}>
                      Edit
                    </button>
                    <button className="bg-[#EC390C] text-white px-3 py-1 rounded-md cursor-pointer" onClick={() => deleteStyle(item._id)}>
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

export default RecommendedFor;
