import React from 'react'


function Addresess() {
    return (
        <>
            <div className=' p-6 mt-10 flex flex-col gap-5'>
                <div className=' flex justify-between'>
                    <h1 className=' text-[24px] font-semibold'>Addresses</h1>
                    <button className=' hover:border border hover:shadow-md hover:rounded-lg border-transparent py-2 px-4 hover:border-gray-300 cursor-pointer transition-all duration-300 ease-in-out'>
                        + Add New Address
                    </button>
                </div>

                <div className=' border p-4 border-gray-300 rounded-lg shadow-lg '>
                    <div className=' flex justify-between'>
                        <h1 className=' uppercase font-semibold text-[14px]'>default Address</h1>
                        <button className=' px-3 py-0.5 rounded-md bg-gray-500 text-white'>
                            Home
                        </button>
                    </div>
                    <div className=' flex flex-col gap-4 mt-2 opacity-80' >
                        <h1 className=' text-[20px] font-semibold'>Priya</h1>
                        <address> K-3, Choolaimedu High Rd, Thiruvallvarpuram, <br />
                            Athreya Puram, Choolaimedu<br />
                            Chennai-328217<br />
                            Tamil Nadu
                        </address>
                        <p>Mobile: <span>9534543464</span></p>
                    </div>
                </div>

                <div className=' border p-4 border-gray-300 rounded-lg shadow-lg '>
                    <div className=' flex justify-between'>
                        <h1 className=' text-[20px] font-semibold'>Priya</h1>
                        <button className=' px-3 py-0.5 rounded-md bg-gray-500 text-white'>
                            Office
                        </button>
                    </div>
                    <div className=' flex flex-col gap-4 mt-2 opacity-80' >

                        <address> K-3, Choolaimedu High Rd, Thiruvallvarpuram, <br />
                            Athreya Puram, Choolaimedu<br />
                            Chennai-328217<br />
                            Tamil Nadu
                        </address>
                        <p>Mobile: <span>9534543464</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addresess