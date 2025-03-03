import { useState } from 'react'
import { CiSquareChevDown } from "react-icons/ci";
import { BsFolderPlus } from "react-icons/bs";
function HeroSection() {

    const [openclosebutton, setopenclosebutton] = useState(false)
    // const [openclosebutton, setopenclosebutton] = useState([false,false])

    // const toggle = (i) => {
    //     setopenclosebutton((prev =>{
    //         const newarr=[...prev]
    //         newarr[i]=!newarr[i]
    //         return newarr
    //     }))
    // }



    return (
        <>
            <div className={`p-6 shadow-md rounded-md ${openclosebutton ? 'h-[520px]' : 'h-[70px]'} transition-all duration-500 ease-in-out overflow-hidden`} >
                <button
                    onClick={() => setopenclosebutton(!openclosebutton)}
                    className='flex items-center gap-2 text-[19px] cursor-pointer' >
                    <h1 >Hero Section</h1>
                    <CiSquareChevDown />
                </button>

                {/* Banner Uploads */}
                <div className={` transition-normal duration-300 ease-in-out grid grid-cols-1 md:grid-cols-2 gap-4 my-5 `}>
                    {/* Mobile Banner */}
                    <div
                        className="border border-[#e7e7e7] rounded-md p-8 min-h-[200px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50">
                        <BsFolderPlus size={30} />
                        <p className="mt-2">Browse to add mobile banner</p>
                        <span className="text-xs text-gray-300">(320x480 pixels)</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    {/* Desktop Banner */}
                    <div
                        className="border border-[#e7e7e7] rounded-md p-8 min-h-[200px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50"

                    >
                        <BsFolderPlus size={30} />
                        <p className="mt-2">Browse to add desktop banner</p>
                        <span className="text-xs text-gray-300">(1200x400 pixels)</span>
                        <input
                            type="file"

                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Add Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
                    // placeholder="Enter title"
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-gray-700 mb-2">Add description</label>
                    <textarea
                        className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
                        rows="3"
                    // placeholder="Enter description"
                    ></textarea>
                </div>
            </div>




        </>
    )
}

export default HeroSection