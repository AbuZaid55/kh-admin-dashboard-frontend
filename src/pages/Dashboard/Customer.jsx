import React, { useState } from 'react'
import { MdArrowBackIosNew } from "react-icons/md";
import Button from './../../compoenets/main/Button';

const datas = [
    {
        name: "Priya",
        email: "prita@gmail.com",
        year: "2023",
        productname: "Diamond solitare ring",
        productquantity: "18K gold ,1.5 carat",
        productprice: "1676",
        ordernumber: "#364747",
        deliverydate: "January 21, 2025",
    },
    {
        name: "Adam",
        email: "Adam@gmail.com",
        year: "2022",
        productname: "Diamond solitare Nakless",
        productquantity: "18K gold ,1.5 carat",
        productprice: "21676",
        ordernumber: "#3641323",
        deliverydate: "Fab 24, 2025",
    },
]


function Customer() {


    const [open, setopen] = useState(Array(datas.length).fill(false)) // fill every array with false

    // this is for open and close single customer datasets
    const toggleOpen = (index) => {
        setopen(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    }


    return (
        <>
            <div className=' w-full h-full p-6 rounded-lg shadow-md'>

                <div className=' w-[50%] flex gap-10 '>
                    <div className=' px-3 py-2 shadow-md rounded-lg w-[90%] h-[87px]'>
                        <div className=' flex flex-col gap-3'>
                            <h2 className=' text-[16px]'>Existing Customer</h2>
                            <p className=' text-[20px]'>34543</p>
                        </div>
                    </div>
                    <div className=' px-3 py-2 shadow-md rounded-lg w-[90%] h-[87px]'>
                        <div className=' flex flex-col gap-3'>
                            <h2 className=' text-[16px]'>New Customer</h2>
                            <p className=' text-[20px]'>345</p>
                        </div>
                    </div>
                </div>



                <h1 className=' my-10 text-[19px] font-semibold'>Logged Request</h1>


                {/* customer data for resolving */}
                <div className=' flex flex-col gap-5'>
                    {datas.map((data, i) => (
                        <div key={i} className={` ${open[i] ? "h-[420px]" : " h-[200px]"} transition-all duration-500 ease-in-out p-4 border border-gray-300 rounded-lg shadow-lg flex flex-col gap-5 overflow-hidden`}>
                            <div className={`flex ${open[i] ? " items-start" : "items-center"}  justify-between`}>

                                <div className=' p-5 flex gap-[10px] items-center'>
                                    <div className=' w-[150px] '>
                                        <img src="/assets/profilepic.png" alt="" className=' w-[120px] ' />
                                    </div>
                                    <div className=' flex flex-col gap-1.5'>
                                        <h1 className=' text-xl font-semibold'>{data.name}</h1>
                                        <p className=' text-md font-semibold'>{data.email}</p>
                                        {open[i] && <p className=' text-sm'>Customer since {data.year}</p>}
                                    </div>
                                </div>

                                <div className='flex items-start  gap-5' >

                                    {!open[i] && <div className=' flex gap-5 items-center'>
                                        <div className=' w-[80px] '>
                                            <img src="/assets/DiamondCustomer.png" alt="" className=' w-[80px] ' />
                                        </div>
                                        <div className=' flex flex-col gap-1'>
                                            <h1 className=' text-[18px] font-semibold'>{data.productname}</h1>
                                            <p className=' text-md font-medium'>{data.productquantity}</p>
                                            <p className=' text-md'>${data.productprice}</p>
                                        </div></div>
                                    }

                                    <button
                                        onClick={() => toggleOpen(i)}
                                        className=' hover:bg-gray-300 p-1 rounded-2xl cursor-pointer '>
                                        <MdArrowBackIosNew className=' -rotate-90 text-[22px] cursor-pointer opacity-60' />
                                    </button>
                                </div>

                            </div>
                            <div>
                                <div className=' flex justify-between items-center'>
                                    <div className=' flex items-center gap-5 p-5'>
                                        <div className=' w-[80px] '>
                                            <img src="/assets/DiamondCustomer.png" alt="" className=' w-[80px] ' />
                                        </div>
                                        <div className=' flex flex-col gap-1'>
                                            <h1 className=' text-[18px] font-semibold'>{data.productname}</h1>
                                            <p className=' text-md font-medium'>{data.productquantity}</p>
                                            <p className=' text-xl text-yellow-400 ' >${data.productprice}</p>
                                        </div>
                                        <div className=' hover:bg-gray-300 p-1 rounded-2xl '>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className=' text-[20px] font-semibold'>ORD {data.ordernumber}</h1>
                                        <small>Placed on {data.deliverydate}</small>
                                    </div>
                                </div>

                                <div className=' flex justify-between p-5 '>
                                    <p>I want to know the expected date of the refund.</p>
                                    <div className=' w-[100px]'>
                                        <Button text='Resolve' />
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    ))}
                </div>



            </div>
        </>
    )
}

export default Customer