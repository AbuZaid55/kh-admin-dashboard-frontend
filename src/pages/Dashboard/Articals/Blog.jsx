import { useState } from "react";
import Blogcomp from "../../../compoenets/ui/Artical/Blogcomp"
import BlogJewelleryCategories from "../../../compoenets/ui/Artical/BlogJewelleryCategories"



function Blog() {

  const [jewelleryData, setJewelleryData] = useState({ category: "", buttonLink: "" });
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const handleSave = () => {
    if (!jewelleryData.category || !jewelleryData.buttonLink) {

      // toast.error( "Both fields are required!" )
      return;
    }

    let updatedCategories;
    if (editIndex !== null) {
      updatedCategories = [...categories];
      updatedCategories[editIndex] = jewelleryData;
      // toast.success( "Update category data " )
      setEditIndex(null);
    } else {
      updatedCategories = [...categories, jewelleryData];
    }
    setCategories(updatedCategories);
    setJewelleryData({ category: "", buttonLink: "" });
  };

  // second pass
  const [jewelleryData1, setJewelleryData1] = useState({ category: "", buttonLink: "" });
  const [categories1, setCategories1] = useState([]);
  const [editIndex1, setEditIndex1] = useState(null);


  const handleSavechange = () => {
    if (!jewelleryData.category || !jewelleryData.buttonLink) {

      // toast.error( "Both fields are required!" )
      return;
    }

    let updatedCategories;
    if (editIndex1 !== null) {
      updatedCategories = [...categories1];
      updatedCategories[editIndex1] = jewelleryData1;
      // toast.success( "Update category data " )
      setEditIndex1(null);
    } else {
      updatedCategories = [...categories1, jewelleryData1];
    }
    setCategories1(updatedCategories);
    setJewelleryData1({ category: "", buttonLink: "" });
  };

  return (
    <>
      <div className="w-[100%] flex gap-[70px]">
        <div className="w-[60%]">
          <Blogcomp />
        </div>

        <div className="w-[60%]">
          
          <BlogJewelleryCategories jewelleryData={jewelleryData} setJewelleryData={setJewelleryData} categories={categories} setCategories={setCategories} editIndex={editIndex} setEditIndex={setEditIndex} handleSave={handleSave} />

          <BlogJewelleryCategories jewelleryData={jewelleryData1} setJewelleryData={setJewelleryData1} categories={categories1} setCategories={setCategories1} editIndex={editIndex1} setEditIndex={setEditIndex1} handleSave={handleSavechange} />
        </div>
      </div>
    </>
  )
}

export default Blog