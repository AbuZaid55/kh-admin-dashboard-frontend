import React, { useState } from 'react'
import { BsFolderPlus } from 'react-icons/bs';
import Button from '../../main/Button';

function WaterMark() {
    const [isBrandOn, setIsBrandOn] = useState(false); // Toggle state
    const [image, setimage] = useState()


    const toggleWatermark = () => {
        setIsBrandOn(!isBrandOn);
    };

    const handleform = (e) => {
        e.preventDefault();
        console.log(image);
        setimage(null);
        
    };

    return (
        <div className="p-4 mt-2 bg-gray-50 rounded-md text-gray-700">
            <h3 className="font-semibold">Product Watermarking</h3>

            <h3 className="text-md font-medium mt-4">
                Enable watermark on product image
            </h3>
            <div className="flex items-center mt-2">
                <h1 className="text-lg font-semibold mr-4">
                    Enable Product Watermarking
                </h1>

                {/* Toggle Button */}
                <div
                    className="w-30 h-10 flex rounded-xl bg-[#333333] overflow-hidden cursor-pointer transition-all duration-300"
                    onClick={toggleWatermark}
                >
                    <div
                        className={`w-1/2 flex items-center justify-center font-semibold text-white rounded-xl transition-all duration-300 ${isBrandOn ? "bg-[#333333]" : "bg-yellow-600"
                            }`}
                    >
                        OFF
                    </div>
                    <div
                        className={`w-1/2 flex items-center justify-center font-semibold text-white rounded-xl transition-all duration-300 ${isBrandOn ? "bg-yellow-600" : "bg-[#333333]"
                            }`}
                    >
                        ON
                    </div>
                </div>
            </div>
            
            {/* Upload Watermark Section (Only Show When ON) */}
            {isBrandOn && (
                <form onSubmit={handleform} className="mt-4">
                    <h3 className="text-md mb-2 font-medium">Upload Watermark</h3>

                    {/* Upload Box */}
                    <label
                        className="border border-[#e7e7e7] rounded-md h-[250px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50"

                    >{image ?
                        <img src={URL.createObjectURL(image)} alt="" className='w-full h-full object-cover rounded-md' />
                        :
                        <div>
                            <BsFolderPlus size={30} />
                            <p className="mt-2">Browse to add watermark image</p>
                            <input
                                type="file"
                                accept="image/png"
                                className="hidden"
                                onChange={(e) => setimage(e.target.files[0])}
                            />
                        </div>}
                    </label>

                    <p className="text-sm text-gray-500 mt-1">
                        Only PNG files are allowed.
                    </p>

                    {/* Buttons aligned to the right */}
                    <div className=' flex justify-end gap-[50px] mt-3 '>
                        <div className='w-[10%]'>
                            <Button
                                type='reset'
                                className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                                text="Reset" />

                        </div>

                        <div className='w-[20%]'>
                            <Button text="Save Changes" type='submit' />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default WaterMark