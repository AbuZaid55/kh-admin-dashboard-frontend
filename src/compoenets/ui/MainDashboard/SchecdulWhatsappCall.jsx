import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
function SchecdulWhatsappCall() {
  return (
    <>
      <div className='w-[full] h-[220px] shadow-md rounded-[8px] p-4 flex flex-col gap-3 '>
        <h1 className='font-extralight text-[14px]'>Scheduled Whatsapp Video Calls</h1>

        <div className=''>
          <div className=' gap-2 w-[100%] h-[93px] shadow-sm px-3 py-2 border border-[#EC9D0C] rounded-[10px] overflow-hidden'>
            <div className=' flex justify-between text-[14px]'>
              <div>
                <p className='text-[13px]'>20th January 2025</p>
                <p>Mr. Ram</p>
              </div>
              <div>
                <IoIosInformationCircleOutline />
                <p>12 pm</p>
              </div>
            </div>
            <button className=' bg-[#EC9D0C] text-[12px] mt-2 px-2 py-1 text-white rounded-[8px] block'>Call Now</button>

          </div>
        </div>

      </div>
    </>
  )
}

export default SchecdulWhatsappCall