import React, { useState } from 'react'
import Input from '../../../compoenets/main/Input'
import Button from '../../../compoenets/main/Button'

function Conditions() {
  const [formdata, setformdata] = useState({
    description: '',
    title: "",
    description2: ""
  })

  const handleform = (e) => {
    e.preventDefault()
    console.log(formdata)
    setformdata({
      description: '',
      title: "",
      description2: ""
    })

  }
  return (
    <div className=''>
      <form action="" onSubmit={handleform} className=' flex flex-col gap-6 p-6 shadow-md rounded-md'>
        {/* Description Input */}
        <div className=''>
          <label className="block mb-2">Add description</label>
          <textarea
            className="w-[100%] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
            rows="4"
            placeholder="Enter description"
            value={formdata.description}
            onChange={(e) => setformdata({ ...formdata, description: e.target.value })}
          ></textarea>
        </div>

        <div className="mt-5">
          <label className="block text-gray-700 mb-2">Add Title</label>
          <Input
            type="text"
            placeholder="Enter title"
            value={formdata.title}
            onChange={(e) => setformdata({ ...formdata, title: e.target.value })}
          />
        </div>
        <div className=''>
          <label className="block mb-2">Add description</label>
          <textarea
            className="w-[100%] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
            rows="4"
            placeholder="Enter description"
            value={formdata.description2}
            onChange={(e) => setformdata({ ...formdata, description2: e.target.value })}
          ></textarea>
        </div>

        <div className=' flex justify-end gap-[30px] '>
          <div className='w-[12%]'>
            <Button
              className='bg-[#37D160] hover:bg-transparent border-[#37D160] w-full hover:text-[#37D160]'
              text="Add More"
            // onClick={handleaddcarousel}
            />
          </div>
        </div>

        <div className=' flex justify-end gap-[50px] mt-10 '>
          <div className='w-[10%]'>
            <Button
              type='reset'
              className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
              text="Reset" />

          </div>

          <div className='w-[20%]'>
            <Button text="Save Changes" type='submit' />
          </div>
        </div>

      </form>
    </div>
  )
}

export default Conditions