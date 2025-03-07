import React, { useState } from 'react'
import OnOffbutton from '../Khwhishcommon/OnOffbutton'
import Input from '../../main/Input';
import Button from '../../main/Button';

function Description({formdata, setformdata,handleform}) {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    

    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='Description'
            >
                <form onSubmit={handleform}>
                    <div className="my-4">
                        <label className="block text-gray-700 mb-2">Add Title</label>
                        <Input
                            type="text"
                            placeholder="Enter title"
                            value={formdata.tittle}
                            onChange={(e) => setformdata({ ...formdata, tittle: e.target.value })}
                        />
                    </div>

                    {/* Description Input */}
                    <div className=''>
                        <label className="block mb-2">Add Short description</label>
                        <textarea
                            className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                            rows="3"
                            placeholder="Enter description"
                            value={formdata.Description}
                            onChange={(e) => setformdata({ ...formdata, Description: e.target.value })}
                        ></textarea>
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

export default Description