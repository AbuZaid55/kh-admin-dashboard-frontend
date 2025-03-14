import React, { useState } from 'react'
import Input from './../../../compoenets/main/Input';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../compoenets/main/Button';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

function TestemonialKhwa() {


    const [slides, setslides] = useState([])
    const [editSlideIndex, seteditSlideIndex] = useState(null)

    const [formdata, setformdata] = useState({
        option: '',
        name: '',
        designation: '',
        testimonial: '',
        img: '',
    })
    


    const handledata = (e) => {
        e.preventDefault();
        console.log(formdata, "kha-homepage");
        if (editSlideIndex !== null) {
            const updatedSlides = slides.map((slide, index) =>
                index === editSlideIndex ? formdata : slide,
            );
            setslides(updatedSlides);
            seteditSlideIndex(null);
        } else {
            setslides([...slides,formdata]);
        }

        setformdata({
            option: '',
            name: '',
            designation: '',
            testimonial: '',
            img: '',
        })
    }

    const handeloptionchange = (e) => {
        const selectedvaluse = e.target.value;
        setformdata({ ...formdata, option: selectedvaluse })
    }

    const handleEditData = (i) => {
        setformdata(slides[i])
        seteditSlideIndex(i)
    }

    const handleDeleteData = (i) => {
        const deletedslides = slides.filter((_, index) => index !== i)
        setslides(deletedslides)
    }

    return (
        <>
            <div className=' flex flex-col gap-6 p-4'>

                <h1 className='text-2xl font-semibold '>Khwaahish Testimonial</h1>
                <form onSubmit={handledata} >

                    <select className=' border rounded-md border-gray-300 p-2 w-[300px]'
                        value={formdata.option}
                        onChange={handeloptionchange}>
                        <option value="noor"> Noor </option>
                        <option value="asai"> Asai </option>
                        <option value="pache"> Pache </option>
                    </select>


                    <div className=' items-center gap-3'>
                        <label className='block text-gray-700 mb-2 '>name</label>
                        <Input type='text' placeholder='name'
                            value={formdata.name}
                            onChange={(e) => setformdata({ ...formdata, name: e.target.value })}
                        />
                    </div>
                    <div className='items-center gap-3'>
                        <label className='block text-gray-700 mb-2 '>Designation</label>
                        <Input type='text' placeholder='Designation'
                            value={formdata.designation}
                            onChange={(e) => setformdata({ ...formdata, designation: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Testimonial</label>
                        <textarea
                            className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC9D0C]"
                            rows="3"
                            placeholder="Testimonial"
                            value={formdata.testimonial}
                            onChange={(e) => setformdata({ ...formdata, testimonial: e.target.value })}
                        ></textarea>
                    </div>

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

                    <div className=' flex justify-end gap-[22px] mt-3 '>
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
            </div>

            <div className='mt-10 border border-t border-gray-300 border-opacity-50' />
            <div className='mt-6'>
                <h1 className='text-[18px] mb-7'>Added Slides</h1>
                <div className=' flex flex-col gap-10 mb-3 overflow-auto py-1 scrollbar-hide'>
                    {slides.map((slide, i) =>
                        <div key={i} className='bg-[#eaeaea] rounded-[10px] p-4  flex gap-10' >
                            <img src={URL.createObjectURL(slide.img)} alt="" className=' w-[100px] h-[100px] rounded-md object-cover' />
                            <div className=' w-[90%]'>
                                <div className=' flex gap-11'>
                                    <div className=' flex flex-col gap-2'>
                                        <h1 className=' text-lg'>Option Name</h1>
                                        <p className=' text-md text-gray-500'>{slide.option}</p>
                                    </div>
                                    <div className=' flex flex-col gap-2'>
                                        <h1 className=' text-lg'> Name    </h1>
                                        <p className=' text-md text-gray-500'>{slide.name}</p>
                                    </div>
                                    <div className=' flex flex-col gap-2'>
                                        <h1 className=' text-lg'>designation </h1>
                                        <p className=' text-md text-gray-500'>{slide.designation}</p>
                                    </div>
                                    <div className=' flex flex-col gap-2'>
                                        <h1 className=' text-lg'>testimonial  </h1>
                                        <p className=' text-md text-gray-500'>{slide.testimonial}</p>
                                    </div>
                                </div>


                                <div className=' w-[100%] text-xl mt-5 flex justify-end gap-3'>
                                    <button
                                        onClick={() => handleEditData(i)}
                                    > {/* click on this to enable edit mode */}
                                        <BiEditAlt width={23} className=' text-[#676767] cursor-pointer' />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteData(i)}
                                    >
                                        <RiDeleteBin5Line width={23}
                                            className=' text-red-500 cursor-pointer' /></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TestemonialKhwa