import React, { useState } from 'react'
import OnOffbutton from './OnOffbutton'

function FAQ() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);
    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='FAQ'
            >
                <form action="">
                    {/* Input Fields */}
                    <div>
                        <div className="my-4">
                            <label className="block text-gray-700 mb-2">Add Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
                                placeholder="Enter title"
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Add description
                            </label>
                            <textarea
                                className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
                                rows="3"
                                placeholder="Enter description"
                            ></textarea>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Add Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
                                placeholder="Enter title"
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Add description
                            </label>
                            <textarea
                                className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
                                rows="3"
                                placeholder="Enter description"
                            ></textarea>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Add Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
                                placeholder="Enter title"
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Add description
                            </label>
                            <textarea
                                className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7e7e7]"
                                rows="3"
                                placeholder="Enter description"
                            ></textarea>
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

export default FAQ