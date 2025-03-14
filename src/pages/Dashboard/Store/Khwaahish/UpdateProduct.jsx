import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../utils/api"
import Button from "../../../../compoenets/main/Button"
import Input from "../../../../compoenets/main/Input";
import { FaRegFileImage } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

const productFields = {
    name: "",
    sku: "",
    description: "",

    category: "",
    collection: "",
    style: "",

    images: [],
    youtube_link:"",

    product_weight: "",
    gold_weight: "",
    diamond_weight: "",
    diamond_quality: "",


    gemstone_name: "",
    gemstone_weight: "",
    gemstone_type: "",

    height: "",
    width: "",

};


export default function AddProduct() {
    const [product, setProduct] = useState(productFields);
    const [collections, setCollections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [styles, setStyles] = useState([]);
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("productId");
    const navigate = useNavigate()

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }


    const getCollections = async () => {
        try {
            const res = await api.get(`/store/khw/collections/get-all-collections`);
            const data = res.data;
            setCollections(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCateogries = async () => {
        try {
            const res = await api.get(`/store/khw/categories/get-all-categories`);
            const data = res.data;
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getStyles = async () => {
        try {
            const res = await api.get(`/store/khw/styles/get-all-styles`);
            const data = res.data;
            setStyles(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProduct = async () => {
        if (!productId) return;
        try {
            const res = await api.get(`/store/khw/products/get-product-for-update/${productId}`)
            const data = res.data
            data.images = []
            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if(!productId) return;
        const formData = new FormData();
        Array.from(product.images).forEach((img) => formData.append("images", img));
        formData.append("productData", JSON.stringify(product));
        try {
            const res = await api.put(`/store/khw/products/update-product/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const data = res.data;
            toast.success(data.message);
            setProduct(productFields);
            e.target.reset();
            navigate(-1)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.error || "Error submitting product.");
        }
    };

    useEffect(() => {
        getCollections()
        getCateogries()
        getStyles()
    }, []);
    useEffect(() => {
        if (productId) {
            getProduct()
        } else {
            navigate("/")
        }
    }, [productId])

    return (
        <div className=" p-4 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleSave}>
                {/* Product Name */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label>Product Name</label>
                        <Input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" />
                    </div>

                    <div>
                        <label>Product Sku</label>
                        <Input type="text" name="sku" value={product.sku} onChange={handleChange} placeholder="Product Sku" />
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <div className=' w-full'>
                        <label className=''>Select Images</label>
                        <div className=' px-1 mt-2'>
                            <label
                                className="w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm flex items-center justify-between">
                                <input
                                    type="file"
                                    onChange={(e) => setProduct({ ...product, "images": e.target.files })}
                                    accept="image/*"
                                    multiple
                                    className="hidden" />
                                <span className=' opacity-60'>Browse</span>
                                <span className='opacity-60'><FaRegFileImage /></span>
                            </label>
                        </div>
                    </div>
                    <div className="w-full">
                        <label>Diamond Quality</label>
                        <Input type="text" name="diamond_quality" value={product.diamond_quality} onChange={handleChange} placeholder="Diamond Quality" />
                    </div>
                </div>

                <div className="mt-6">
                    <label>YouTube Link</label>
                    <Input type="text" name="youtube_link" value={product.youtube_link} onChange={handleChange} placeholder="YouTube Link" />
                </div>


                <div className="flex w-full gap-4 my-4">

                    <div className="w-full">
                        <label>Select Collection</label>
                        <select name="collection" value={product.collection} onChange={handleChange} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                            <option value="">Select Collection</option>
                            {collections.map((collection) => (
                                <option key={collection._id} value={collection._id}>
                                    {collection.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full">
                        <label>Select Category</label>
                        <select name="category" value={product.category} onChange={handleChange} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full">
                        <label>Select Style</label>
                        <select name="style" value={product.style} onChange={handleChange} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                            <option value="">Select Style</option>
                            {styles.map((style) => (
                                <option key={style._id} value={style._id}>
                                    {style.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <div className="w-full">
                        <label>Product Weight</label>
                        <Input type="number" name="product_weight" value={product.product_weight || ''} onChange={handleChange} placeholder="Product Weight" />
                    </div>
                    <div className="w-full">
                        <label>Diamond Weight</label>
                        <Input type="number" name="diamond_weight" value={product.diamond_weight || ''} onChange={handleChange} placeholder="Diamond Weight" />
                    </div>
                    <div className="w-full">
                        <label>Gold Weight</label>
                        <Input type="number" name="gold_weight" value={product.gold_weight || ''} onChange={handleChange} placeholder="Gold Weight" />
                    </div>
                </div>


                <div className="border border-gray-300 shadow-sm p-4 rounded-md mt-6">
                    <h1 className="text-lg">Gemstone Details:</h1>
                    <div className="flex gap-2 justify-between mt-1">
                        <Input type="text" name="gemstone_name" value={product.gemstone_name || ''} onChange={handleChange} placeholder="Gemstone Name" />

                        <Input type="number" name="gemstone_weight" value={product.gemstone_weight || ''} onChange={handleChange} placeholder="Gemstone Weight" />

                        <Input type="text" name="gemstone_type" value={product.gemstone_type || ''} onChange={handleChange} placeholder="Gemstone Type" />
                    </div>
                </div>


                <div className="flex gap-2 justify-between mt-6">
                    <div className="w-full">
                        <label>Height</label>
                        <Input type="text" name="height" value={product.height || ''} onChange={handleChange} placeholder="Height" />
                    </div>

                    <div className="w-full">
                        <label>Width</label>
                        <Input type="text" name="width" value={product.width || ''} onChange={handleChange} placeholder="Width" />
                    </div>
                </div>

                <textarea name="description" value={product.description || ''} onChange={handleChange} placeholder="Description" className="my-6 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm " rows="3"></textarea>

                <Button text="Save" type="submit" />
            </form>
        </div>
    );
}
