import React, { useState } from 'react'
import OnOffbutton from '../Khwhishcommon/OnOffbutton'
import Button from '../../main/Button';
import { FaPlus } from 'react-icons/fa';
import Input from '../../main/Input';

function Eshopbenifits() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    const [formdata, setformdata] = useState({
        title1: '',
        Description1: '',
        title2: '',
        Description2: '',
        title3: '',
        Description3: '',
        img1: '',
        img2: '',
        img3: '',
    })

    const handleform = (e) => {
        e.preventDefault();
        console.log(formdata);
        setformdata({
            title1: '',
            Description1: '',
            title2: '',
            Description2: '',
            title3: '',
            Description3: '',
            img1: '',
            img2: '',
            img3: '',
        })

    }
    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='E-shop benfit section'>

                <form action="" onSubmit={handleform} className='my-4'>
                    <div>
                        <div className="flex items-center justify-center mb-6">
                            <h1 className="text-3xl">E-Shop Benefits</h1>
                        </div>

                        {/* Three Sections Using Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-5">

                            <div
                                className="border border-gray-300 p-5 rounded-md"
                            >
                                {/* Circle with Plus Icon */}
                                <label className="flex justify-center">
                                    {formdata.img1 ?
                                        <img src={URL.createObjectURL(formdata.img1)} alt="" className='w-20 h-20 object-cover rounded-full' />
                                        : <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                            <FaPlus className="text-gray-600 text-2xl" />
                                            <input type="file" accept='image/*' className='hidden'
                                            onChange={(e) => setformdata({ ...formdata, img1: e.target.files[0]} )} />
                                            
                                        </div>}
                                </label>

                                {/* Title */}
                                <div className="mt-2">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Add Title</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter title"
                                            value={formdata.title1}
                                            onChange={(e) => setformdata({ ...formdata, title1: e.target.value })}
                                        />
                                    </div>

                                    {/* Description Input */}
                                    <div className=''>
                                        <label className="block mb-2">Add description</label>
                                        <textarea
                                            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                            rows="3"
                                            placeholder="Enter description"
                                            value={formdata.Description1}
                                            onChange={(e) => setformdata({ ...formdata, Description1: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border border-gray-300 p-5 rounded-md"
                            >
                                {/* Circle with Plus Icon */}
                                <label className="flex justify-center">
                                    {formdata.img2 ?
                                        <img src={URL.createObjectURL(formdata.img2)} alt="" className='w-20 h-20 object-cover rounded-full' />
                                        : <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                            <FaPlus className="text-gray-600 text-2xl" />
                                            <input type="file" accept='image/*' className='hidden' 
                                            onChange={(e) => setformdata({ ...formdata, img2: e.target.files[0] })} />
                                            
                                        </div>}
                                </label>

                                {/* Title */}
                                <div className="mt-2">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Add Title</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter title"
                                            value={formdata.title2}
                                            onChange={(e) => setformdata({ ...formdata, title2: e.target.value })}
                                        />
                                    </div>

                                    {/* Description Input */}
                                    <div className=''>
                                        <label className="block mb-2">Add description</label>
                                        <textarea
                                            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                            rows="3"
                                            placeholder="Enter description"
                                            value={formdata.Description2}
                                            onChange={(e) => setformdata({ ...formdata, Description2: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="border border-gray-300 p-5 rounded-md"
                            >
                                {/* Circle with Plus Icon */}
                                <label className="flex justify-center">
                                    {formdata.img3 ?
                                        <img src={URL.createObjectURL(formdata.img3)} alt=""    className='w-20 h-20 object-cover rounded-full' />
                                        : <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                                            <FaPlus className="text-gray-600 text-2xl" />
                                            <input type="file" accept='image/*' className='hidden' 
                                            onChange={(e) => setformdata({ ...formdata, img3: e.target.files[0]})}
                                            />
                                        </div>}
                                </label>
                                {/* Title */}
                                <div className="mt-2">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Add Title</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter title"
                                            value={formdata.title3}
                                            onChange={(e) => setformdata({ ...formdata, title3: e.target.value })}
                                        />
                                    </div>

                                    {/* Description Input */}
                                    <div className=''>
                                        <label className="block mb-2">Add description</label>
                                        <textarea
                                            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                            rows="3"
                                            placeholder="Enter description"
                                            value={formdata.Description3}
                                            onChange={(e) => setformdata({ ...formdata, Description3: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=' flex justify-end gap-[50px] '>
                        <div className='w-[20%]'>
                            <Button text="Save Changes" type='submit' />
                        </div>

                        <div className='w-[10%]'>
                            <Button
                                type='reset'
                                className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                                text="Reset" />
                        </div>
                    </div>
                </form>

            </OnOffbutton>
        </>
    )
}

export default Eshopbenifits