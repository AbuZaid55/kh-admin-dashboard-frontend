import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronUp } from "react-icons/io5";
import { IoChevronUpOutline } from "react-icons/io5";
import imgRing from "/assets/addproduct.png";
import SideBar from "../../../../compoenets/ui/Orders/SideBar";

const orderfilter = ["Newest first", "Pending", "Completed"];

const Orders = () => {
  const [activeIndices, setActiveIndices] = useState([]);
  const [filtertab, setfiltertab] = useState(false);
  const [filterselection, setfilterselection] = useState("Newest first");

  const orderDetails = {
    orderId: "ORD #364447",
    placedOn: "January 21, 2025",
    status: "Paid",
    items: [
      {
        imgUrl: imgRing,
        name: "Diamond Solitaire Ring",
        description: "18K gold, 1.5 carat | Qty: 1",
        price: "$1676",
        statusFirst: "In Transit",
        statusSecond: "Yet To Dispatch",
      },
    ],
    orderSummary: {
      subtotal: "$1536",
      promoCode: "DIA100",
      discount: "-$100",
      shippingFee: "$40",
      standardShipping: "$30",
      subShipping: "$10",
      taxRate: "18%",
      taxAmount: "$200",
      total: "$1676",
    },
  };

  const toggleAccordion = (index) => {
    setActiveIndices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  return (
    <div className=" relative">
      <div className=" absolute w-fit -top-21 mx-5 ">
        <button className="cursor-pointer px-3 py-2 shadow-md rounded-lg flex items-center gap-[90px] hover:bg-gray-100" onClick={() => setfiltertab(!filtertab)}>
          <p>Filter By</p>
          <span className={`text-[20px] opacity-60 ${filtertab ? "rotate-0" : "rotate-180"} `}>
            <IoChevronUpOutline />
          </span>
        </button>

        {filtertab && (
          <div className=" absolute shadow-md rounded-lg px-5 py-2 top-12 z-50 bg-[#FDFDFF] flex flex-col gap-2">
            {orderfilter.map((filter, i) => (
              <button
                key={i}
                className="flex justify-between gap-12 items-center cursor-pointer"
                onClick={() => {
                  setfilterselection(filter), setfiltertab(false);
                }}>
                <p>{filter}</p>
                <p className={`w-[10px] h-[10px] rounded-[100%] ${filter == filterselection ? "bg-red-500" : "bg-gray-500"} `} />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="w-full  mx-auto mt-10 flex">
        <div className="w-[55%] mx-auto">
          {[0, 1].map((index) => (
            <div key={index} className="mb-6 rounded-[20px] shadow-lg">
              <div className="p-4 bg-white cursor-pointer  flex justify-between items-center" onClick={() => toggleAccordion(index)}>
                <div>
                  <h3 className="font-semibold text-2xl">{orderDetails.orderId}</h3>
                  <p className="text-sm text-gray-500">Placed on {orderDetails.placedOn}</p>
                </div>
                <div className="flex items-center">
                  {index === 0 ? <span className="text-[#14B45C] mx-4">&bull; {orderDetails.status}</span> : ""}
                  <span className="text-lg">{activeIndices.includes(index) ? <IoIosArrowDown className="text-gray-400" /> : <IoChevronUp className="text-gray-400" />}</span>
                </div>
              </div>

              {activeIndices.includes(index) && (
                <div className="p-4">
                  {orderDetails.items.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between w-full p-4 rounded-lg">
                      <img src={item.imgUrl} alt={item.name} className="w-30 h-30 object-cover rounded" />
                      <div className="flex-1 ml-4">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-[#00000080] mb-4">{item.description}</p>
                        <p className="text-lg text-[#EC9D0C] font-semibold">{item.price}</p>
                      </div>

                      <p className={`text-sm rounded-3xl px-4 py-2 font-semibold cursor-pointer ${index === 0 ? "bg-[#CAEEDA] text-[#14B45C]" : "bg-[#F1D39C] text-[#EC9D0C]"}`}>{index === 0 ? item.statusFirst : item.statusSecond}</p>
                    </div>
                  ))}
                  {index === 1 && (
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>{orderDetails.orderSummary.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            Promo Code <span className="bg-[#507CFF0A] text-gray-500 px-4 py-2 rounded-full text-md cursor-pointer">{orderDetails.orderSummary.promoCode}</span>
                          </span>
                          <span>{orderDetails.orderSummary.discount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping Fee</span>
                          <span>{orderDetails.orderSummary.shippingFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Standard Shipping Fee</span>
                          <span>{orderDetails.orderSummary.standardShipping}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sub Shipping Fee</span>
                          <span>{orderDetails.orderSummary.subShipping}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax Rate @{orderDetails.orderSummary.taxRate}</span>
                          <span>{orderDetails.orderSummary.taxAmount}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2">
                          <span className="text-2xl text-black">Total</span>
                          <span className="text-[#507CFF] text-2xl">{orderDetails.orderSummary.total}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <SideBar orderData={orderDetails} />
      </div>
    </div>
  );
};

export default Orders;
