import React, { useState } from 'react'

import Input from '../../main/Input';
import { FaPlus } from 'react-icons/fa';
import Button from '../../main/Button';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
import OnOffbutton from './OnOffbutton';

function AssaiAddImage() {

    const [openclosebutton, setopenclosebutton] = useState(false)
    const [isOn, setIsOn] = useState(true);
    const [slides, setslides] = useState([])
    const [editSlideIndex, seteditSlideIndex] = useState(null)

    const [formdata, setformdata] = useState({
        Style_Name: '',
        Image: '',
        Description: '',
        Explore_More: ''
    })

    const handleform = (e) => {
        e.preventDefault()
        // console.log(formdata)
        if (editSlideIndex !== null) {
            const editedSlides = slides.map((slide1, index) =>
                index === editSlideIndex ? formdata : slide1
            );
            setslides(editedSlides)
            seteditSlideIndex(null)
        }
        else {
            setslides([...slides, formdata])
        }
        setformdata({
            Style_Name: '',
            Image: '',
            Description: '',
            Explore_More: ''
        })
    }

    const handleEditData = (i) => {
        setformdata(slides[i])
        seteditSlideIndex(i)
    }

    const handleDeleteData = (i) => {
        const newSlides = slides.filter((_, index) => index !== i)
        setslides(newSlides)
    }


    return (
        <>
            <OnOffbutton
                isOn={isOn}
                setIsOn={setIsOn}
                openclosebutton={openclosebutton}
                setopenclosebutton={setopenclosebutton}
                headname='Asai Images' >

                <form className=' mt-5' onSubmit={handleform}>
                    <label>Style Name</label>
                    <Input placeholder='Enter Style Name'
                        value={formdata.Style_Name}
                        onChange={(e) => setformdata({ ...formdata, Style_Name: e.target.value })}
                    />

                    <div className=' mt-5 flex gap-[100px]'>
                        <div>
                            <label className=''>Image</label>
                            <label
                                className="w-[120px] h-[120px] border border-[#e7e7e7] rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer mt-2 ">
                                {formdata.Image ?
                                    <img src={URL.createObjectURL(formdata.Image)} alt="" className='w-full h-full object-cover rounded-md' />
                                    : <div>
                                        <FaPlus />
                                        <input name='img' required type='file' className='hidden' accept='image/*'
                                            onChange={(e) => setformdata({ ...formdata, Image: e.target.files[0] })} />
                                    </div>}
                            </label>
                        </div>

                        <div className=' flex flex-col gap-4'>
                            <div className=''>
                                <label className="block mb-2">Add description</label>
                                <textarea
                                    className="w-[950px] p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                                    rows="2"
                                    placeholder="Enter description"
                                    value={formdata.Description}
                                    onChange={(e) => setformdata({ ...formdata, Description: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label>Explore more </label>
                                <Input placeholder='Enter button link'
                                    value={formdata.Explore_More}
                                    onChange={(e) => setformdata({ ...formdata, Explore_More: e.target.value })}
                                />
                            </div>
                            <div className=' flex justify-end gap-[30px] w-full mt-6 '>
                                <div className='w-[15%]'>
                                    <Button
                                        className='bg-[#37D160] hover:bg-transparent border-[#37D160] w-full hover:text-[#37D160]'
                                        text="Add Carousel"

                                    />
                                </div>


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
                        </div>
                    </div>
                </form>


                <div className='mt-10 border border-t border-gray-300 border-opacity-50' />
                <div className='mt-6'>
                    <h1 className='text-[18px] mb-7'>Added Slides</h1>
                    <div className=' h-[500px] flex flex-col gap-10 mb-3 overflow-auto py-1 scrollbar-hide'>
                        {slides.map((slide, i) =>
                            <div key={i} className='bg-[#eaeaea] rounded-[10px] p-4  flex gap-10' >
                                <img src={URL.createObjectURL(slide.Image)} alt="" className=' w-[100px] h-[100px] rounded-md object-cover' />
                                <div className=' w-[90%]'>
                                    <div className=' flex gap-11'>
                                        <div className=' flex flex-col gap-2'>
                                            <h1 className=' text-lg'>Style Name</h1>
                                            <p className=' text-md text-gray-500'>{slide.Style_Name}</p>
                                        </div>

                                        <div className=' flex flex-col gap-2'>
                                            <h1 className=' text-lg'>Description  </h1>
                                            <p className=' text-md text-gray-500'>{slide.Description}</p>
                                        </div>
                                        <div className=' flex flex-col gap-2'>
                                            <h1 className=' text-lg'>Button </h1>
                                            <p className=' text-md text-gray-500'>{slide.Explore_More}</p>
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

        </>
    )
}

export default AssaiAddImage