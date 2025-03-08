import React, { useState } from 'react'
import OnOffbutton from '../Khwhishcommon/OnOffbutton'
import Button from '../../main/Button';
import Input from '../../main/Input';
import { BsFolderPlus } from 'react-icons/bs';

function HeaderLogo() {
    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    const [formdata, setformdata] = useState({
        addlink: '',
        Marquee: '',
        mobilebanner: '',
        desktopbanner: '',
    })
    const handleform = (e) => {
        e.preventDefault();
        console.log(formdata, "kha-homepage");
        setformdata({
            addlink: '',
            Marquee: '',
            mobilebanner: '',
            desktopbanner: '',
        })
    }
    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='Edit Header Logo'
            >
                <form onSubmit={handleform} >
                    {/* Banner Uploads */}
                    <div className={` transition-normal duration-300 ease-in-out grid grid-cols-1 md:grid-cols-2 gap-4 my-6 `}>
                        {/* Mobile Banner */}
                        <label
                            className="border border-[#e7e7e7] rounded-md h-[200px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50 shadow-md">
                            {formdata.mobilebanner ?
                                <img src={URL.createObjectURL(formdata.mobilebanner)} alt="mobile banner" className="w-full h-full object-cover" /> :
                                <div>
                                    <BsFolderPlus size={30} />
                                    <p className="mt-2">Browse to add mobile banner</p>
                                    <span className="text-xs text-gray-300">(320x480 pixels)</span>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setformdata({ ...formdata, mobilebanner: e.target.files[0] })}
                                    />
                                </div>
                            }

                        </label>

                        {/* Desktop Banner */}
                        <label
                            className="border border-[#e7e7e7] rounded-md h-[200px] flex flex-col items-center justify-center text-gray-500 text-center cursor-pointer hover:bg-gray-50 shadow-md">
                            {formdata.desktopbanner ?
                                <img src={URL.createObjectURL(formdata.desktopbanner)} alt="mobile banner" className="w-full h-full object-cover" /> :
                                <div>
                                    <BsFolderPlus size={30} />
                                    <p className="mt-2">Browse to add desktop banner</p>
                                    <span className="text-xs text-gray-300">(320x480 pixels)</span>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setformdata({ ...formdata, desktopbanner: e.target.files[0] })}
                                    />
                                </div>
                            }
                        </label>
                    </div>

                    {/* Title Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2"> Add link</label>
                        <Input
                            type="text"
                            placeholder="Write title here"
                            value={formdata.addlink}
                            onChange={(e) => setformdata({ ...formdata, addlink: e.target.value })}
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-gray-700 mb-2">Marquee</label>
                        <textarea
                            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C]"
                            rows="3"
                            placeholder="Enter description"
                            value={formdata.Marquee}
                            onChange={(e) => setformdata({ ...formdata, Marquee: e.target.value })}
                        ></textarea>
                    </div>

                    <div className=' flex justify-end gap-[50px] mt-3 '>
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

export default HeaderLogo