import React, { useState } from 'react'
import OnOffbutton from './OnOffbutton'
import { FaPlus } from 'react-icons/fa'

function Banner() {
    const [openclosebutton, setopenclosebutton] = useState(false)
        const [isOn, setIsOn] = useState(true);

    const [images, setImages] = useState([]);

    const handleAddImage = () => {
        if (images.length < 6) {
            setImages([...images, {}]);
        }
    };
    return (
        <>
            <OnOffbutton isOn={isOn} 
            setIsOn={setIsOn} 
            openclosebutton={openclosebutton} 
            setopenclosebutton={setopenclosebutton} 
            headname='Banner'>
                {/* Input Fields */}
                <div className="grid grid-cols-4 gap-4 my-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Category Name</label>
                        <input
                            type="text"
                            placeholder="Enter category name"
                            className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Collection Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter collection name"
                            className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Subtitle</label>
                        <input
                            type="text"
                            placeholder="Enter subtitle"
                            className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Explore more</label>
                        <input
                            type="text"
                            placeholder="Enter button link"
                            className="w-40 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4 flex gap-10">
                    <div>
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-90 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                            rows="3"
                            placeholder="Enter description"
                        ></textarea>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-gray-700 mb-2">Add Images</label>
                        <div className="flex items-center space-x-4">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                                >
                                    {/* Placeholder for uploaded image */}
                                </div>
                            ))}
                            {images.length < 6 && (
                                <button
                                    onClick={handleAddImage}
                                    className="w-16 h-16 border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
                                >
                                    <FaPlus />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-5">
                    <button className="bg-[#37D160] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300">
                        Add More
                    </button>
                    <button className="bg-[#333333] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300">
                        Reset
                    </button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300">
                        Save Changes
                    </button>
                </div>
            </OnOffbutton>
        </>
    )
}

export default Banner