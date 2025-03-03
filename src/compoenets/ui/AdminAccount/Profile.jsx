import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { GoChevronRight } from "react-icons/go";
function Profile() {
    const navigate = useNavigate()

    const handelLogout = () => {
        sessionStorage.removeItem('activeMenu'); // used for remove session for when logout then dashboard reset to profile
        navigate('/') // for logout
    }
    return (
        <>
            <div className=' p-5 flex gap-[100px] items-center'>

                {/* profile img and details */}
                <div className=' relative w-[150px] h-[150px]'>
                    <img src="/assets/profilepic.png" alt="" className=' w-[150px] h-[150px]' />
                    <IoAddCircleOutline className=' absolute top-4 right-2 text-[20px] bg-white rounded-full' />
                </div>
                <div className=' flex flex-col gap-2.5'>
                    <h1 className=' text-[20px] font-semibold'>Priya</h1>
                    <p>prita@gmail.com</p>
                    <button
                        onClick={handelLogout}
                        className=' text-[16px] border rounded-md border-amber-300 p-1.5 w-[160px] text-center mt-2 hover:text-amber-300 hover:bg-black transition-colors duration-300 ease-in-out cursor-pointer'>
                        Logout
                    </button>
                </div>
            </div>

                
            <div className='mt-5 px-10 flex gap-[80px]'>
                <button className='hover:bg-gray-100 flex items-center text-[18px] shadow-lg px-4 justify-between py-2 rounded-lg border border-gray-300 w-[170px]'>
                    Orders
                    <p><GoChevronRight /></p>
                </button>

                <button className='hover:bg-gray-100 flex items-center text-[18px] shadow-lg px-4 justify-between py-2 rounded-lg border border-gray-300 w-[170px]'>
                    Coupons
                    <p><GoChevronRight /></p>
                </button>

                <button className='hover:bg-gray-100 flex items-center text-[18px] shadow-lg px-4 justify-between py-2 rounded-lg border border-gray-300 w-[170px]'>
                    Help Center
                    <p><GoChevronRight /></p>
                </button>

                <button className='hover:bg-gray-100 flex items-center text-[18px] shadow-lg px-4 justify-between py-2 rounded-lg border border-gray-300 w-[170px]'>
                    Settings
                    <p><GoChevronRight /></p>
                </button>
            </div>
        </>
    )
}

export default Profile