
import React from 'react'
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";


function TopProduct() {

  const products = [{
    img: '/assets/topproduct1.png',
    quality: "24k Gold Nechlace",
    rupees: "35,000",
  },{
    img: '/assets/topproduct2.png',
    quality: "White Pearl Earrings",
    rupees: "55,678",
  },{
    img: '/assets/topproduct3.png',
    quality: "Butterfly Earrings",
    rupees: "36,348",
  }
]

  return (
    <>
      <div className=' w-[100%] h-[477px] shadow-md rounded-[10px] p-4'>
        <div className=' flex justify-between'>
          <p>Top Products</p>
          <MdOutlineArrowOutward className=' text-[20px]' />
        </div>
        <div className=' flex flex-col gap-3 mt-7 items-center'>
          {products.map((product, i) => (
            
              <div key={i} className=' w-[95%] h-[95px] rounded-[10px] shadow-lg p-3'>
                <div className=' flex gap-8'>
                  <div>
                    <img src={product.img} width={60} height={60} alt='topproductImg' />
                  </div>

                  <div className='text-[14px]'>
                    <p className=' text-[12px] '>{product.quality}</p>
                    <div className=' flex items-center my-1'>
                      <FaRupeeSign />
                      <p>{product.rupees}</p>
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

export default TopProduct