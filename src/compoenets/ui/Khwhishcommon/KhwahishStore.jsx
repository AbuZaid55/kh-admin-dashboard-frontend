import React, { useState } from 'react'
import OnOffbutton from './OnOffbutton'
import { BsFolderPlus } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';

function KhwahishStore() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);
    const [sections, setSections] = useState([{ id: 1 }]);

    const addSection = () => {
        setSections([...sections, { id: sections.length + 1 }]);
    };
    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='Khwahish Store'>

                <form action="">
                    {/* Input Fields */}
                    <div className="grid grid-cols-4 gap-6 my-4 items-start">
                        <div>
                            <label className="block text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">
                                Google map Link
                            </label>
                            <input
                                type="text"
                                className="w-50 p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>

                        {/* Browse by Category */}
                        <div className="flex flex-col">
                            {/* Title */}
                            <label className="block text-gray-700 mb-1">
                                Browse by Category
                            </label>

                            <div className="flex items-center gap-4 ">
                                {sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className="border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center w-40 h-18 cursor-pointer hover:border-gray-500 transition"
                                    >
                                        <BsFolderPlus size={25} className="text-gray-500" />
                                        <span className="text-gray-600 text-[10px] text-center">
                                            Browse to add image
                                        </span>
                                    </div>
                                ))}

                                {/* Plus Icon Button */}
                                <button
                                    onClick={addSection}
                                    className="border-2 border-gray-300 rounded-lg flex items-center justify-center w-15 h-18 text-gray-500 hover:border-gray-500 transition"
                                >
                                    <FiPlus size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="grid grid-cols-2 gap-6 items-start">
                        {/* Description */}
                        <div>
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Browse */}
                        <div>
                            <div className="flex items-center gap-4 mt-10">
                                {sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className="border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center w-40 h-18 cursor-pointer hover:border-gray-500 transition"
                                    >
                                        <BsFolderPlus size={25} className="text-gray-500" />
                                        <span className="text-gray-600 text-[10px] text-center">
                                            Browse to add image
                                        </span>
                                    </div>
                                ))}{" "}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-5">
                        <button className="bg-[#333333] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300">
                            Reset
                        </button>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-600 transition-all duration-300">
                            Save Changes
                        </button>
                    </div>
                </form>

            </OnOffbutton>
        </>
    )
}

export default KhwahishStore