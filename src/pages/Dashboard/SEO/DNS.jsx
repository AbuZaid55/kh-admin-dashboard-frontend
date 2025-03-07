import React from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri'

function DNS() {
  return (
    <div className='bg-white w-full shadow-2xl mx-8 my-4 flex flex-col rounded-lg p-4 h-max'>
      {/* Header Section */}
      <div className="flex gap-1 px-4 cursor-pointer items-center">
        <h1 className="text-lg text-gray-700">DNS Management</h1>

      </div>


      <div className='w-full mx-2 px-2'>
        <div className='w-full flex flex-col text-left my-4'>
          <h1 className='text-gray-800 text-lg'>DNS Management</h1>
          <p className='text-md text-gray-500'>Manage your domain and DNS records</p>
        </div>

        <div className='border border-gray-300 rounded-md my-6 flex flex-col w-full text-left py-4 px-3'>
          <label className='text-gray-500 text-md'>Your Unique Domain</label>
          <input type="text" placeholder='https://khwaahish.co' className='text-gray-300 border border-gray-100 rounded-md py-1 px-2 placeholder:text-gray-400 placeholder:text-sm text-sm w-1/4' />
        </div>

        <div className='border border-gray-300 rounded-md my-8 flex w-full text-left py-4 px-3 justify-between items-center'>
          <div className='flex flex-col'>
            <label className='text-gray-500 text-md'>Add Custom Domain Name</label>
            <input type="text" placeholder='abc.com' className='text-gray-300 border border-gray-100 rounded-md py-1 px-2 placeholder:text-gray-400 placeholder:text-sm text-sm w-full' />
          </div>
          <button className='py-2 px-6 rounded-md h-max bg-[#3768D1] text-white text-sm cursor-pointer font-light'>Edit</button>
        </div>

        {/* Table Records */}
        <div className='w-full h-max flex flex-col my-2 border border-gray-300 rounded-sm py-2'>
          <h1 className='text-black text-lg text-left px-3'>DNS Records</h1>
          <table className='w-full my-2'>
            <thead className=''>
              <tr className='bg-[#F5FDF6] border-b border-gray-300 '>
                <th className='text-lg font-light text-gray-500  px-4 py-2'>TYPE</th>
                <th className='text-lg font-light text-gray-500  px-4 py-2'>NAME</th>
                <th className='text-lg font-light text-gray-500  px-4 py-2'>CONTENT</th>
                <th className='text-lg font-light text-gray-500  px-4 py-2'>TTL</th>
                <th className='text-lg font-light text-gray-500  px-4 py-2'>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-gray-200 text-gray-500'>
                <td className='px-4 py-4'>A</td>
                <td className='px-4 py-4'>www</td>
                <td className='px-4 py-4'>91107229.154</td>
                <td className='px-4 py-4'>3600</td>
                <td className=' py-4 flex gap-6 justify-center     px-4'>
                  <RiEdit2Line className='text-lg text-gray-400 cursor-pointer' />
                  <RiDeleteBin6Line className='text-red-400 text-lg cursor-pointer' />
                </td>
              </tr>
              <tr className='border-b border-gray-200 text-gray-500'>
                <td className='px-4 py-4'>CNAME</td>
                <td className='px-4 py-4'>www</td>
                <td className='px-4 py-4'>91107229.154</td>
                <td className='px-4 py-4'>3600</td>
                <td className='py-4 flex gap-6 justify-center    px-4'>
                  <RiEdit2Line className='text-lg text-gray-400 cursor-pointer' />
                  <RiDeleteBin6Line className='text-red-400 text-lg cursor-pointer' />
                </td>
              </tr>
            </tbody>
          </table>
          <button className='bg-[#3768D1] text-white text-sm rounded-md cursor-pointer py-2 px-6 w-48 my-2 mx-4 font-light'>Add DNS Records</button>
        </div>


        {/* buttons */}
        <div className='w-full py-4 px-4 flex justify-end gap-2'>
          <button className='py-2 px-6 rounded-md text-md cursor-pointer font-light bg-[#DB3B3B] text-white'>Cancel</button>
          <button className='py-2 px-6 rounded-md text-md cursor-pointer font-light bg-[#333333] text-white'>Reset</button>
          <button className='py-2 px-6 rounded-md text-md cursor-pointer font-light bg-[#EC9D0C] text-white'>Save Changes</button>
        </div>
      </div>

    </div>
  )
}

export default DNS