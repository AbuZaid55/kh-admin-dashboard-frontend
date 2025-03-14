import React, { useState } from 'react'
import Input from '../../../main/Input';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../main/Button';
import OnOffbutton from '../../Khwhishcommon/OnOffbutton';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

function OurPromoters() {

    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);

    const [noofcarousel, setnoofcarousel] = useState(['']);

    const [slides, setslides] = useState([])
    const [editSlideIndex, seteditSlideIndex] = useState(null)

    const [formdata, setformdata] = useState({
        Name: '',
        Position: '',
        Description: '',
        img: '',
    })

    const handleform = (e) => {
        e.preventDefault();
        console.log(formdata, "kha-homepage");
        if (editSlideIndex !== null) {
            const updatedSlides = slides.map((slide, index) =>
                index === editSlideIndex ? formdata : slide,
            );
            setslides(updatedSlides);
            seteditSlideIndex(null);
        } else {
            setslides([...slides, formdata]);
        }
        setformdata({
            Name: '',
            Position: '',
            Description: '',
            img: '',
        })
    }


    const handleresetdata = () => {
        setformdata({
            Name: '',
            Position: '',
            Description: '',
            img: '',
        })
    }

    const handleEditData = (i) => {
        setformdata(slides[i])
        seteditSlideIndex(i)
    }

    const handleDeleteData = (i) => {
        const deletedslides = slides.filter((_, index) => index !== i)
        setslides(deletedslides)
    }

    const handleaddcarousel = () => {
        setnoofcarousel([...noofcarousel, ''])
    }
    return (
        <div className=' flex flex-col gap-10'>
            {noofcarousel.map((_, index) =>
                <div key={index} >
                    <OnOffbutton
                        isOn={isOn}
                        setIsOn={setIsOn}
                        openclosebutton={openclosebutton}
                        setopenclosebutton={setopenclosebutton}
                        headname='Our Promoters Section' >

                        <form onSubmit={handleform} className=' mt-3 text-gray-700'>
                            <h1 className=' text-md font-semibold'>Slide</h1>
                            <div className='flex gap-[80px] mt-5 '>
                                <div>
                                    <label> Name </label>
                                    <Input placeholder=' Name of the Category'
                                        value={formdata.Name}
                                        onChange={(e) => setformdata({ ...formdata, Name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label>Enter Position </label>
                                    <Input placeholder='Name of the Collection'
                                        value={formdata.Position}
                                        onChange={(e) => setformdata({ ...formdata, Position: e.target.value })}
                                    />
                                </div>


                            </div>
                            <div className=' flex gap-[80px] mt-5'>
                                <div className=''>
                                    <label className="block mb-2">Add description</label>
                                    <textarea
                                        className="w-[500px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC9D0C] "
                                        rows="3"
                                        placeholder="Enter description"
                                        value={formdata.Description}
                                        onChange={(e) => setformdata({ ...formdata, Description: e.target.value })}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className=''>Image</label>
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
                            </div>
                            <div className=' flex justify-end gap-[30px] mt-6 '>
                                <div className='w-[12%]'>
                                    <Button
                                        className='bg-[#37D160] hover:bg-transparent border-[#37D160] w-full hover:text-[#37D160]'
                                        text="Add Carousel"
                                        onClick={handleaddcarousel}
                                    />
                                </div>


                                <div className='w-[10%]'>
                                    <Button
                                        onClick={handleresetdata}
                                        className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                                        text="Reset" />
                                </div>
                                <div className='w-[20%]'>
                                    <Button text="Save Changes" type='submit' />
                                </div>
                            </div>
                        </form>

                        {/* Add carousel */}
                        <div className='mt-10 border border-t border-gray-300 border-opacity-50' />
                        <div className='mt-6'>
                            <h1 className='text-[18px] mb-7'>Added Slides</h1>
                            <div className=' h-[500px] flex flex-col gap-10 mb-3 overflow-auto py-1 scrollbar-hide'>
                                {slides.map((slide, i) =>
                                    <div key={i} className='bg-[#eaeaea] rounded-[10px] p-4  flex gap-10' >
                                        <img src={URL.createObjectURL(slide.img)} alt="" className=' w-[100px] h-[100px] rounded-md object-cover' />
                                        <div className=' w-[90%]'>
                                            <div className=' flex gap-11'>
                                                <div className=' flex flex-col gap-2'>
                                                    <h1 className=' text-lg'>Category Name</h1>
                                                    <p className=' text-md text-gray-500'>{slide.Name}</p>
                                                </div>

                                                <div className=' flex flex-col gap-2'>
                                                    <h1 className=' text-lg'>Position </h1>
                                                    <p className=' text-md text-gray-500'>{slide.Position}</p>
                                                </div>
                                                <div className=' flex flex-col gap-2'>
                                                    <h1 className=' text-lg'>Description  </h1>
                                                    <p className=' text-md text-gray-500'>{slide.Description}</p>
                                                </div>
                                            </div>


                                            <div className=' w-[100%] text-xl mt-5 flex justify-end gap-3'>
                                                <button
                                                    onClick={() => handleEditData(i)}
                                                > {/* click on this to enable edit mode */}
                                                    <BiEditAlt className=' text-[#676767] cursor-pointer' />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteData(i)}
                                                >
                                                    <RiDeleteBin5Line
                                                        className=' text-red-500 cursor-pointer' /></button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </OnOffbutton>
                </div>
            )}

        </div>
    )
}
export default OurPromoters