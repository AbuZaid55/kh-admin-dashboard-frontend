
import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Input from "../../main/Input";
import Button from "../../main/Button";


const EdditProduct = ({ seteditcompo }) => {


    const images = [
        "/assets/addproduct.png",
        "/assets/addproduct.png",
        "/assets/addproduct.png",

    ];
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Edit Products</h2>
            <div className="grid grid-cols-4 gap-6">
                {/* Product Name */}
                <div>
                    <label className="block mb-2">Product Name:</label>
                    <Input
                        type="text"
                        placeholder="Name Of The Product"

                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-2">Category:</label>
                    <div className="relative items-center
                                mt-2 block w-full px-1 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                        <select className="appearance-none text-gray-400 pr-6 outline-none w-full">
                            <option>Select Category</option>
                        </select>
                        <IoIosArrowDropdown className=" absolute text-gray-400 right-2 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                    </div>
                </div>

                {/* Size */}
                <div>
                    <label className="block mb-2">Size:</label>
                    <div className="relative items-center
                                mt-2 block w-full px-1 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                        <select className="appearance-none text-gray-400 pr-6 outline-none w-full">
                            <option>For Ring</option>
                        </select>
                    </div>
                </div>

                {/* Collection */}
                <div>
                    <label className="block mb-2">Collection:</label>
                    <div className="relative items-center
                                mt-2 block w-full px-1 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                        <select className="appearance-none text-gray-400 pr-6 outline-none w-full">
                            <option>Select Collection</option>
                        </select>
                        <IoIosArrowDropdown className=" absolute text-gray-400 right-2 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                    </div>
                </div>

                {/* Net Weight */}
                <div>
                    <label className="block mb-2">Net Weight:</label>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Weight"

                        />
                        <span className=" absolute text-gray-400 right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                            gm <IoIosArrowDropdown className="h-5 w-5" />
                        </span>
                    </div>
                </div>

                {/* Color */}
                <div>
                    <label className="block mb-2">Color:</label>
                    <Input
                        type="text"
                        placeholder="Eg. Yellow Gold, White Gold"

                    />
                </div>

                {/* Product Code */}
                <div>
                    <label className="block mb-2">Product Code:</label>
                    <Input
                        type="text"
                        placeholder="Enter Code"

                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-2">Price:</label>
                    <div className="relative items-center
                                mt-2 block w-full px-1 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                        <select className="appearance-none text-gray-400 pr-6 w-full outline-none">
                            <option>Inc. of Taxes</option>
                        </select>
                    </div>
                </div>

                {/* Styles */}
                <div>
                    <label className="block mb-2">Collection:</label>
                    <div className="relative items-center
                                mt-2 block w-full px-1 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                        <select className="appearance-none text-gray-400 pr-6 w-full outline-none">
                            <option>Select Styles</option>
                        </select>
                        <IoIosArrowDropdown className=" absolute text-gray-400 right-2 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                    </div>
                </div>
            </div>

            <h2 className="flex items-center justify-center">Products images</h2>
            <div className="bg-gray-100 border border-dotted border-gray-400 p-4 mt-5 rounded-lg">
                {/* Images Section */}
                <div className="mt-5 flex space-x-4 mb-20">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-32 h-32">
                            {/* Image */}
                            <img
                                src={image}
                                alt="Product"
                                className="w-full h-full object-cover rounded-lg shadow-md"
                            />
                            {/* Remove Button */}
                            <button className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full p-[2px] text-xs shadow-md">
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-end space-x-4">
                <Button text='Add Product' className="w-[20%] bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C]" />

                <Button text='Reset'
                    onClick={() => seteditcompo(false)}
                    className="bg-[#333333] border border-[#333333]  text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#333333]" />
            </div>
        </div>
    );
};

export default EdditProduct
