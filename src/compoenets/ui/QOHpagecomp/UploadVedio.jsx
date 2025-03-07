import React, { useState } from 'react'
import Button from '../../../compoenets/main/Button'
import OnOffbutton from '../../../compoenets/ui/Khwhishcommon/OnOffbutton'
import Input from '../../../compoenets/main/Input';

function UploadVedio() {

    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);
    const [formdata,setformdata] = useState({
        Video: '',
        Title: '',
        Description: '',
    })

    const hadleform=(e) => {
        e.preventDefault();
        console.log(formdata);
        setformdata({
            Video: '',
            Title: '',
            Description: '',
        })
    }
    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='Upload Vedio'
            >
                <form action="" onSubmit={hadleform}>
                <div className="mt-2 flex gap-2 ">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Add Title</label>
                            <Input
                                type="text"
                                placeholder="Enter title"
                                value={formdata.Title}
                                onChange={(e) => setformdata({ ...formdata, Title: e.target.value })}
                            />
                        </div>

                        {/* Description Input */}
                        <div className=''>
                            <label className="block mb-2 text-gray-700">Add description</label>
                            <textarea
                                className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                rows="3"
                                placeholder="Enter description"
                                value={formdata.Description}
                                onChange={(e) => setformdata({ ...formdata, Description: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center w-full h-[300px] mt-3 rounded-md border-gray-300 py-5 border items-center  '>
                        <label className='text-gray-600 text-md'>Drag and drop video files to upload</label>
                        <label className='border border-gray-400 py-1 px-6 cursor-pointer my-2 rounded-md text-gray-400'>
                            {
                                formdata.Video ? formdata.Video.name : " Select file"
                            }
                            <input name='video' required type='file' className='hidden' accept='video/*'
                                onChange={(e) => setformdata({...formdata, Video: e.target.files[0] })}
                            />
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

export default UploadVedio