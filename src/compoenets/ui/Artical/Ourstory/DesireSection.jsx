import React, { useState } from 'react'
import OnOffbutton from '../../Khwhishcommon/OnOffbutton';
import Button from '../../../main/Button';
import Input from '../../../main/Input';
import { FaPlus } from 'react-icons/fa';

function DesireSection() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    const [formdata, setformdata] = useState({
        title: '',
        description: '',
        img: '',
        title1: '',
        description1: '',
        title2: '',
        description2: '',
    })

    const handleform = (e) => {
        e.preventDefault();
        console.log(formdata);
        setformdata({
            title: '',
            description: '',
            img: '',
            title1: '',
            description1: '',
            title2: '',
            description2: '',
        });

    }
    return (
        <>
            <OnOffbutton isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='Khwaahish means desire Section'>
                <form action="" onSubmit={handleform}>
                    <div className=' flex gap-[80px] my-5 text-gray-700'>
                        <div className=''>
                            <label className=''>Add Image</label>
                            <label
                                className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer mt-2 ">
                                {formdata.img ?
                                    <img src={URL.createObjectURL(formdata.img)} alt="" className='w-full h-full object-cover rounded-md' />
                                    : <div>
                                        <FaPlus />
                                        <input name='img' required type='file' className='hidden'
                                            accept='image/*'
                                            onChange={(e) => setformdata({ ...formdata, img: e.target.files[0] })}
                                        />
                                    </div>}
                            </label>
                        </div>
                        <div className=' flex flex-col gap-3'>
                            <div>
                                <label>Add Tital</label>
                                <Input
                                    type="text"
                                    placeholder='Tittal'
                                    value={formdata.title}
                                    onChange={(e) => setformdata({ ...formdata, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Add description</label>
                                <textarea
                                    className=" p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC9D0C] "
                                    rows="2"
                                    placeholder="Enter description"
                                    value={formdata.description}
                                    onChange={(e) => setformdata({ ...formdata, description: e.target.value })}
                                ></textarea>
                            </div>

                        </div>
                    </div>



                    <div className=' flex gap-[100px] mt-10'>
                        <div>
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
                                    className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC9D0C] "
                                    rows="3"
                                    placeholder="Enter description"
                                    value={formdata.description1}
                                    onChange={(e) => setformdata({ ...formdata, description1: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                        <div>
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
                                    className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC9D0C] "
                                    rows="3"
                                    placeholder="Enter description"
                                    value={formdata.description2}
                                    onChange={(e) => setformdata({ ...formdata, description2: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                    </div>

                    <div className=' flex justify-end gap-[20px] mt-6 '>
                        <div className='w-[10%]'>
                            <Button
                                // onClick={handleresetdata}
                                className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                                text="Reset" />
                        </div>
                        <div className='w-[20%]'>
                            <Button text="Save Changes" type='submit' />
                        </div>
                    </div>
                </form>
            </OnOffbutton>
        </>
    )
}

export default DesireSection