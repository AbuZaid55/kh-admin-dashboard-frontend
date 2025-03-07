import React, { useState } from 'react'
import Input from '../../../compoenets/main/Input';
import Button from '../../../compoenets/main/Button';

function SeoDetails() {
    const [formData, setFormData] = useState({
        slug: "",
        metaTitle: "",
        metaDescription: "",
        metaTags: "",
        customLinkUrl: "",
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSave = () => {
        console.log("Form Data:", formData);
    };


    const handleReset = () => {
        setFormData({
            slug: "",
            metaTitle: "",
            metaDescription: "",
            metaTags: "",
            customLinkUrl: "",
        });
    };


    const handleCancel = () => {
        console.clear();
    };
    return (
        <>
            <div className="w-full px-7 rounded-md shadow-md py-4">
                {/* Header Section */}
                <div className="flex justify-between pt-5">
                    <div
                        className="flex items-center gap-4 cursor-pointer"

                    >
                        <span className="pb-1">SEO Details</span>


                    </div>
                </div>


                <div className="mt-5 transition-all duration-300">

                    <div className="flex items-center gap-2">
                        <h2 className="pb-1">Slug</h2>
                        <img src="/assets/Vector (1).png" alt="SEO1" className="w-4 h-4 rounded-full object-cover" />
                    </div>
                    <Input
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}

                    />


                    <div className="flex items-center gap-2 mt-5">
                        <h2 className="pb-1">Meta Title</h2>
                        <img src="/assets/Vector (1).png" alt="SEO1" className="w-4 h-4 rounded-full object-cover" />
                    </div>
                    <Input
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}

                        placeholder="Enter Meta title"
                    />


                    <div className="flex items-center gap-2 mt-5">
                        <h2 className="pb-1">Meta Description</h2>
                        <img src="/assets/Vector (1).png" alt="SEO1" className="w-4 h-4 rounded-full object-cover" />
                    </div>


                    <textarea
                        className="w-full p-2 border border-[#e7e7e7] rounded-md focus:outline-none focus:ring-2 shadow-md focus:ring-[#EC9D0C] "
                        rows="3"
                        placeholder="Enter description"
                        value={formData.metaDescription}
                        onChange={handleChange}
                    ></textarea>


                    <div className="flex items-center gap-2 mt-5">
                        <h2 className="pb-1">Meta Tags</h2>
                        <img src="/assets/Vector (1).png" alt="SEO1" className="w-4 h-4 rounded-full object-cover" />
                    </div>
                    <Input
                        name="metaTags"
                        value={formData.metaTags}
                        onChange={handleChange}

                        placeholder="Enter Meta tags"
                    />


                    <div className="flex gap-2 mt-5">
                        <h2>Custom Link URL</h2>
                        <p className="text-[#999999]">(Global URL set in preference)</p>
                    </div>
                    <Input
                        name="customLinkUrl"
                        value={formData.customLinkUrl}
                        onChange={handleChange}

                        placeholder="Enter custom link URL"
                    />


                    <div className=' flex justify-end gap-[50px] mt-10 '>
                        <button
                            className="bg-[#DB3B3B] text-white px-8 py-3 rounded-lg"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <div className='w-[10%]'>
                            <Button
                                type='reset'
                                className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                                text="Reset"
                                onClick={handleReset}
                            />
                        </div>

                        <div className='w-[20%]'>
                            <Button text="Save Changes" type='submit' onClick={handleSave} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SeoDetails