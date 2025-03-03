import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronUp } from "react-icons/io5";
import imgRing from "/assets/addproduct.png";
import SideBar from '../../../../compoenets/ui/Orders/SideBar';


const Orders = () => {
  const [activeIndices, setActiveIndices] = useState([]);

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
    setActiveIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full  mx-auto mt-10 flex">

      <div className="w-[55%] mx-auto">
        {[0, 1].map((index) => (
          <div key={index} className="mb-6 rounded-[20px] shadow-lg">
            <div
              className="p-4 bg-white cursor-pointer  flex justify-between items-center"
              onClick={() => toggleAccordion(index)}
            >
              <div>
                <h3 className="font-semibold text-2xl">{orderDetails.orderId}</h3>
                <p className="text-sm text-gray-500">Placed on {orderDetails.placedOn}</p>
              </div>
              <div className="flex items-center">
                {
                  index === 0 ? <span className="text-[#14B45C] mx-4">&bull;  {orderDetails.status}</span> : ""
                }
                <span className="text-lg">
                  {activeIndices.includes(index) ? <IoIosArrowDown className="text-gray-400" /> : <IoChevronUp className="text-gray-400" />}
                </span>
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


                    <p
                      className={`text-sm rounded-3xl px-4 py-2 font-semibold cursor-pointer ${index === 0
                        ? "bg-[#CAEEDA] text-[#14B45C]"
                        : "bg-[#F1D39C] text-[#EC9D0C]"
                        }`}
                    >
                      {index === 0 ? item.statusFirst : item.statusSecond}
                    </p>
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
                        <span>Promo Code <span className="bg-[#507CFF0A] text-gray-500 px-4 py-2 rounded-full text-md cursor-pointer">{orderDetails.orderSummary.promoCode}</span></span>
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
  );
};

export default Orders
