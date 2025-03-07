import React, { useState } from 'react'
import OnOffbutton from '../Khwhishcommon/OnOffbutton'
import Input from '../../main/Input';
import { BsFolderPlus } from 'react-icons/bs';
import Button from '../../main/Button';

function Galleria() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    const [formdata, setformdata] = useState({
        title: '',
        subTitle: '',
        description: '',
        images: '',
    })

    const handleform = (e) => {
        e.preventDefault();
        console.log(formdata);
        setformdata({
            title: '',
            subTitle: '',
            description: '',
            images: '',
        })



    }
    return (

        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='The Galleria' >

                <form action="" className='my-4 flex flex-col gap-4' onSubmit={handleform}>
                    <div className="">
                        <label className="block text-gray-700 mb-2">Add Title</label>
                        <Input
                            type="text"
                            placeholder="Enter title"
                            value={formdata.title}
                            onChange={(e) => setformdata({ ...formdata, title: e.target.value })}
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 mb-2">Add sub-Title</label>
                        <Input
                            type="text"
                            placeholder="Enter sub-title"
                            value={formdata.subTitle}
                            onChange={(e) => setformdata({ ...formdata, subTitle: e.target.value })}
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-gray-700 mb-2">
                            Add short Description
                        </label>
                        <textarea
                            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                            rows="3"
                            placeholder="Enter description"
                            value={formdata.description}
                            onChange={(e) => setformdata({ ...formdata, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-700 mb-2">Image</label>
                        <label
                            className="border border-[#e7e7e7] rounded-md min-h-[250px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50"
                        >
                            {formdata.img ?
                                <img src={URL.createObjectURL(formdata.img)} alt="" className='w-full h-full object-cover rounded-md' />
                                :
                                <div>
                                    <BsFolderPlus size={30} />
                                    <p className="mt-2">Browse to add side image</p>
                                    <span className="text-xs text-gray-300">
                                        (1200x400 pixels)
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setformdata({ ...formdata, img: e.target.files[0] })}
                                    />
                                </div>
                            }

                        </label>
                    </div>
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

            </OnOffbutton>
        </>
    )
}

export default Galleria