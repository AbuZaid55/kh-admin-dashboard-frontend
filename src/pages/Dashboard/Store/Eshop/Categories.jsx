import React, { useEffect, useState } from 'react'
import AddingNewCategories from '../../../../compoenets/ui/Categories/AddingNewCategories'
import AddedCategories from '../../../../compoenets/ui/Categories/AddedCategories'
import api from '../../../../utils/api'

function Categories() {
  const [edit, setedit] = useState(false)
  const [name, setname] = useState('')
  const [Description, setDescription] = useState('')
  const [img, setimg] = useState()
  const [selectedCategory,setSelectedCategory]=useState('')

   const [formatedData, setFormatedData] = useState([])
  
    const getAllCateogries = async () => {
      try {
        const res = await api.get(`/store/eshop/categories/get-all-categories`);
        const data = res.data;
        setFormatedData(data)
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [edit]) // scroll to top when edit
  useEffect(()=>{
    getAllCateogries()
  },[])


  return (
    <>
      <div className='flex flex-col gap-8'>
        <AddingNewCategories name={name} getAllCateogries={getAllCateogries} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} Description={Description} img={img} setname={setname} setDescription={setDescription} setimg={setimg}  edit={edit} setedit={setedit} />
        <AddedCategories formatedData={formatedData} getAllCateogries={getAllCateogries} setname={setname}  setSelectedCategory={setSelectedCategory} setDescription={setDescription}  setedit={setedit} />
      </div>
    </>
  )
}

export default Categories