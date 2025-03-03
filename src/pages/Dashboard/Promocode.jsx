/* eslint-disable no-unused-vars */
import React from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";

const promoCodes = [
    {
        code: "NEWUSER25",
        discount: "25%",
        status: "Active",
        expiration: "Sep 22, 2025",
        usage: "180/500",
    },
    {
        code: "NEWUSER25",
        discount: "25%",
        status: "Active",
        expiration: "Sep 22, 2025",
        usage: "180/500",
    },
    {
        code: "NEWUSER25",
        discount: "25%",
        status: "Expired",
        expiration: "Sep 22, 2025",
        usage: "180/500",
    },
    {
        code: "NEWUSER25",
        discount: "25%",
        status: "Active",
        expiration: "Sep 22, 2025",
        usage: "180/500",
    },
    {
        code: "NEWUSER25",
        discount: "25%",
        status: "Expired",
        expiration: "Sep 22, 2025",
        usage: "180/500",
    },
    {
        code: "NEWUSER25",
        discount: "25%",
        status: "Expired",
        expiration: "Sep 22, 2025",
        usage: "180/500",
    },
];

const Promocode = () => {
    return (
        <div className=" mt-10 p-6 bg-white shadow-md rounded-lg">
            <div className=" flex justify-between mb-5">
                <h2 className="text-2xl font-semibold ">Promo Code</h2>

                {/* Search Bar */}
                <div
                    className=' rounded-xl w-[300px] bg-[#FDFDFF] flex justify-start items-center gap-4 shadow-md py-3 px-6 '>
                    <span className=' w-[5%]'><IoSearchOutline /></span>

                    <input
                        type="search"
                        className='outline-none focus:outline-none text-[14px] w-[90%]'
                        placeholder="Search promo codes....." />
                </div>
            </div>


            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-gray-500">
                            <th className="p-4 text-left">Code</th>
                            <th className="p-4 text-left">Discount</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Expiration</th>
                            <th className="p-4 text-left">Usage</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promoCodes.map((promo, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="p-4">{promo.code}</td>
                                <td className="p-4">{promo.discount}</td>
                                <td className="p-4">
                                    <span
                                        className={`text-sm px-4 py-2 rounded-lg 
      ${promo.status === "Active" ? "bg-green-100 text-green-700" : ""} 
      ${promo.status === "Expired" ? "bg-red-100 text-red-700" : ""}`}
                                    >
                                        {promo.status}
                                    </span>
                                </td>

                                <td className="p-4">{promo.expiration}</td>
                                <td className="p-4">{promo.usage}</td>
                                <td className="p-4 flex space-x-4">
                                    <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                        <FaRegPenToSquare />
                                    </button>
                                    <button className=" hover:text-red-700 cursor-pointer">
                                        <RiDeleteBinLine />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Promocode;
