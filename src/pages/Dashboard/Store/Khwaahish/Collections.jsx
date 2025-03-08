import React, { useEffect, useState } from 'react'
import { FaRegFileImage } from 'react-icons/fa'
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from '../../../../compoenets/main/Button'
import Input from '../../../../compoenets/main/Input'
import { toast } from 'react-toastify'
import api from '../../../../utils/api'

function Collections() {

  const [name, setname] = useState('')
  const [description, setDescription] = useState('')
  const [tagline, settagline] = useState('')
  const [image, setimg] = useState()
  const [nav_image, setNavImage] = useState()
  const [showInNav, setShowInNav] = useState(false)
  const [showInCollection, setShowInCollection] = useState(false)
  const [hasHomePage, setHasHomePage] = useState(false)
  const [pathOfHomePage, setPathOfHomePage] = useState('')
  const [collections, setCollections] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState('')

  const resetForm = () => {
    setname('')
    setDescription('')
    settagline('')
    setimg(null)
    setSelectedCollection('')
    setShowInNav(false)
    setNavImage('')
    setIsEditMode(false)
    setShowInCollection(false)
    setHasHomePage(false)
    setPathOfHomePage('')
  }

  const handleEdit = (collection) => {
    setIsEditMode(true)
    setname(collection.name)
    setDescription(collection.description)
    settagline(collection.tagline)
    setSelectedCollection(collection._id)
    setShowInNav(collection.showInNav)
    setShowInCollection(collection.showInCollection)
    setHasHomePage(collection.hasHomePage)
    setPathOfHomePage(collection.pathOfHomePage)
  }

  const getCollections = async () => {
    try {
      const res = await api.get(`/store/khw/collections/get-all-collections`)
      const data = res.data
      setCollections(data)
    } catch (error) {
      console.log(error)
    }
  }

  const saveEdit = async () => {
    if (!selectedCollection) return;
    try {
      const formdata = new FormData()
      formdata.append("image", image)
      formdata.append("name", name)
      formdata.append("tagline", tagline)
      formdata.append("description", description)
      formdata.append("nav_image", nav_image)
      formdata.append("showInNav", showInNav)
      formdata.append("showInCollection", showInCollection)
      formdata.append("hasHomePage", hasHomePage)
      formdata.append("pathOfHomePage", pathOfHomePage)
      const res = await api.put(`/store/khw/collections/update-collection/${selectedCollection}`, formdata)
      const data = await res.data
      toast.success(data.message)
      resetForm()
      getCollections()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const deleteCollection = async (_id) => {
    if (!_id) return;
    try {
      const res = await api.delete(`/store/khw/collections/delete-collection/${_id}`)
      const data = await res.data
      toast.success(data.message)
      getCollections()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }


  // handle collection add form
  const handleformforadd = async (e) => {
    e.preventDefault();
    const formdata = new FormData()
    formdata.append("image", image)
    formdata.append("name", name)
    formdata.append("tagline", tagline)
    formdata.append("description", description)
    formdata.append("nav_image", nav_image)
    formdata.append("showInNav", showInNav)
    try {
      const res = await api.post("/store/khw/collections/add-collection", formdata)
      const data = await res.data
      toast.success(data.message)
      resetForm()
      getCollections()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  return (
    <>
      <div className='shadow-md rounded-[10px] p-4'>
        <h1 className='text-[18px]  '>Add Collection</h1>
        <small>Manage your collections with ease</small>
        <form onSubmit={handleformforadd}>
          <div className=' mt-8  flex flex-col gap-5 '>
            <div className='flex justify-between w-[100%] gap-5' >
              <div className='w-[50%] '>
                <label className=' opacity-70'>Collection Name</label>
                <div className=' px-1'>
                  <Input type='name' placeholder='Enter Collection Name'
                    value={name}
                    onChange={(e) => setname(e.target.value)} />
                </div>
              </div>
              <div className=' w-[40%] '>
                <label className=' opacity-70'>Tagline</label>
                <div className=' px-1'>
                  <Input type='name' placeholder='Enter Tagline'
                    value={tagline}
                    onChange={(e) => settagline(e.target.value)} />
                </div>
              </div>

            </div>


            <div className=' '>
              <label className=' opacity-70'>Description</label>
              <div className=' px-1'>
                <textarea placeholder='Enter Description' className='mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>


            <div className='flex gap-4'>
              <div className=' w-full'>
                <label className=' opacity-70'>Collection Images</label>
                <div className=' px-1 mt-3'>
                  <label
                    className="w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md flex items-center justify-between">
                    <input type="file" accept="image/*"
                      className="hidden"
                      onChange={(e) => setimg(e.target.files[0])} />
                    <span className=' opacity-60'>Browse</span>
                    <span className='opacity-60'><FaRegFileImage /></span>
                  </label>

                </div>
              </div>
              <div className=' w-full'>
                <label className=' opacity-70'>Nav Image</label>
                <div className=' px-1 mt-3'>
                  <label
                    className="w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-md flex items-center justify-between">
                    <input
                      type="file"
                      onChange={(e) => setNavImage(e.target.files[0])}
                      accept="image/*"
                      className="hidden" />
                    <span className=' opacity-60'>Browse</span>
                    <span className='opacity-60'><FaRegFileImage /></span>
                  </label>
                </div>
              </div>
            </div>

            <div className='flex gap-8'>
            <div>
                <label className=' cursor-pointer' htmlFor='showInNav'>Show In Nav?: <input id='showInNav' className='ml-1 w-4 h-4 cursor-pointer' type='checkbox' checked={showInNav} onChange={(e) => setShowInNav(e.target.checked)} /></label>
              </div>
              <div>
                <label className=' cursor-pointer' htmlFor='showInCollection'>Show In Collection?: <input id='showInCollection' className='ml-1 w-4 h-4 cursor-pointer' type='checkbox' checked={showInCollection} onChange={(e) => setShowInCollection(e.target.checked)} /></label>
              </div>
              <div>
                <label className=' cursor-pointer' htmlFor='hasHomePage'>Has Homge Page?: <input id='hasHomePage' className='ml-1 w-4 h-4 cursor-pointer' type='checkbox' checked={hasHomePage} onChange={(e) => setHasHomePage(e.target.checked)} /></label>
              </div>
            </div>
              <div className={hasHomePage?"":"hidden"}>
                  <Input type='name' placeholder='Enter Home Page Path like: /noor, /aasai' value={pathOfHomePage} onChange={(e) => setPathOfHomePage(e.target.value)} />
              </div>

            <div className=' flex justify-start gap-[50px] '>
              <div className='w-[20%]'>
                {
                  !isEditMode ? <Button text="Create Collection" type='submit' /> : <Button text="Save Collection" type='button' onClick={() => { saveEdit() }} />
                }
              </div>

              <div className='w-[10%]'>
                {
                  !isEditMode ? <Button
                    onClick={resetForm}
                    type='reset'
                    className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                    text="Reset" /> :
                    <Button
                      onClick={resetForm}
                      type='reset'
                      className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                      text="Cancle" />
                }
              </div>
            </div>

          </div>
        </form>

        <div className='mt-4 rounded-[10px] p-4 shadow-md'>
          <h1 className='text-[18px]'>Added Collection</h1>
          <div className=' mt-4 flex flex-col gap-5'>
            {collections?.map((data, i) => (
              <div key={i} className='bg-[#eaeaea] rounded-[10px] p-4  flex gap-10' >
                <img src={data?.image?.url} alt="" className=' w-[100px] h-[100px]' />
                <div className=' w-[90%]'>
                  <h1>{data.name}</h1>
                  <h1>{data.tagline}</h1>
                  <p className=' text-[14px] w-[90%] mt-1.5 opacity-70'>{data.description}</p>
                  <div className=' w-[100%] flex justify-end gap-3'>

                    <button onClick={() => { handleEdit(data) }}> {/* click on this to enable edit mode */}
                      <BiEditAlt className=' text-[#676767] cursor-pointer' />
                    </button>

                    <button onClick={() => { deleteCollection(data._id) }}><RiDeleteBin5Line className=' text-red-500 cursor-pointer' /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </>
  )
}

export default Collections
