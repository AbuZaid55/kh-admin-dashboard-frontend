import React, { useState } from 'react'
import OnOffbutton from '../../Khwhishcommon/OnOffbutton';
import Button from '../../../main/Button';
import Input from '../../../main/Input';

function OurValues() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    const [formdata, setformdata] = useState({
        title1: '',
        Description1: '',
        title2: '',
        Description2: '',
        title3: '',
        Description3: '',
        title4: '',
        Description4: '',
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
            title4: '',
            Description4: '',
        })
    }


    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='Our Values Section'>

                <form action="" onSubmit={handleform}>
                    <div className=' flex w-[100%] gap-[80px]'>
                        <div className=' flex flex-col gap-5 w-[48%]'>
                            <div>
                                <div className="my-4">
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
                            <div>
                                <div className="my-4">
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

                        <div className=' flex flex-col gap-5 w-[48%]'>
                            <div>
                                <div className="my-4">
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
                            <div>
                                <div className="my-4">
                                    <label className="block text-gray-700 mb-2">Add Title</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter title"
                                        value={formdata.title4}
                                        onChange={(e) => setformdata({ ...formdata, title4: e.target.value })}
                                    />
                                </div>

                                {/* Description Input */}
                                <div className=''>
                                    <label className="block mb-2">Add description</label>
                                    <textarea
                                        className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                        rows="3"
                                        placeholder="Enter description"
                                        value={formdata.Description4}
                                        onChange={(e) => setformdata({ ...formdata, Description4: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Buttons */}
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

export default OurValues