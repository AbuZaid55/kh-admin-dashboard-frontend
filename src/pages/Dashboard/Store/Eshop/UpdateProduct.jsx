import api from "../../../../utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../../compoenets/main/Input"
import Button from "../../../../compoenets/main/Button"
import { useNavigate, useSearchParams } from 'react-router-dom'

const productFields = {
    name: "",
    sku: "",
    description: "",
    stock: "",

    category: "",
    collection: "",
    style: "",

    color1: "",
    color2: "",
    color3: "",

    images1: [],
    images2: [],
    images3: [],

    product_weight: "",
    total_gold_weight: "",

    golds: [],
    diamonds: [],

    gemstone_name: "",
    gemstone_price: "",
    gemstone_weight: "",
    gemstone_type: "",

    labor: "",

    pearl_cost: "",
    extra_cost: "",
    extra_fee: "",

    gst_percent: "",
    isItRing: false,

    height: "",
    weight: "",

    recommendedFor: [],
};


export default function UpdateProduct() {
    const [product, setProduct] = useState(productFields);
    const [collections, setCollections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [styles, setStyles] = useState([]);
    const [colors, setColors] = useState([]);
    const [golds, setGolds] = useState([]);
    const [diamonds, setDiamonds] = useState([]);
    const [labors, setLabors] = useState([]);
    const [selectedDiamond, setSelectedDiamond] = useState("");
    const [diamnodAddingErrorMessage, setDiamondAddingErrorMessage] = useState("");
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("productId");
    const navigate = useNavigate()

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.files });
    };

    const handleCheckbox = (event) => {
        const { value, checked, name } = event.target;
        setProduct((prevProduct) => {
            if (checked) {
                return { ...prevProduct, [name]: [...prevProduct[name], value] };
            } else {
                return {
                    ...prevProduct,
                    [name]: prevProduct[name].filter((item) => item !== value),
                };
            }
        });
    };

    const handleDiamond = () => {
        if (!selectedDiamond) {
            setDiamondAddingErrorMessage("Select Grade - Variant");
        } else {
            let message = "";
            product.diamonds.map((diamond) => {
                if (diamond.diamond === selectedDiamond) {
                    message = "Already Added";
                }
            });
            if (!message) {
                diamonds.map((diamond) => {
                    if (diamond._id === selectedDiamond) {
                        const obj = { diamond: selectedDiamond, grade: diamond.grade, variant: diamond.variant, same_pcs: "", pcs: [{ count: "", weight: "" }] };
                        setProduct({ ...product, diamonds: [...product.diamonds, obj] });
                    }
                });
                setDiamondAddingErrorMessage("");
                setSelectedDiamond("");
            } else {
                setDiamondAddingErrorMessage(message);
            }
        }
    };

    const remvoeDiamond = (index) => {
        setProduct((prev) => {
            let updatedDiamonds = [...prev.diamonds]
            updatedDiamonds = updatedDiamonds.filter((_, i) => i !== index)
            return { ...prev, diamonds: updatedDiamonds };
        })
    }

    const handlePcsChange = (diamondIndex, pcsIndex, field, value) => {
        setProduct((prev) => {
            const updatedDiamonds = [...prev.diamonds];
            updatedDiamonds[diamondIndex].pcs[pcsIndex][field] = value;
            return { ...prev, diamonds: updatedDiamonds };
        });
    };

    const addPcsEntry = (index) => {
        setProduct((prev) => {
            return {
                ...prev,
                diamonds: prev.diamonds.map((diamond, i) => (i === index ? { ...diamond, pcs: [...diamond.pcs, { count: "", weight: "" }] } : diamond)),
            };
        });
    };

    const removeDiamondPcs = (diamondIndex, pcsIndex) => {
        if (pcsIndex == 0) return;
        setProduct(prev => {
            const updatedDiamonds = prev.diamonds.map((diamond, i) =>
                i === diamondIndex
                    ? { ...diamond, pcs: diamond.pcs.filter((_, i) => i !== pcsIndex) }
                    : diamond
            );
            return { ...prev, diamonds: updatedDiamonds };
        });
    };

    const getCollections = async () => {
        try {
            const res = await api.get(`/store/eshop/collections/get-all-collections`);
            const data = res.data;
            setCollections(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCateogries = async () => {
        try {
            const res = await api.get(`/store/eshop/categories/get-all-categories`);
            const data = res.data;
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getStyles = async () => {
        try {
            if (!product.category) return;
            const res = await api.get(`/store/eshop/categories/${product.category}/styles`);
            const data = res.data;
            setStyles(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getColors = async () => {
        try {
            const res = await api.get("/store/eshop/colors/get-colors");
            const data = res.data;
            setColors(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getGolds = async () => {
        try {
            const res = await api.get("/store/eshop/golds/get-golds");
            const data = await res.data;
            setGolds(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getDiamonds = async () => {
        try {
            const res = await api.get("/store/eshop/diamonds/get-diamonds");
            const data = await res.data;
            setDiamonds(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getLabors = async () => {
        try {
            const res = await api.get("/store/eshop/labors/get-labors");
            const data = await res.data;
            setLabors(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProduct = async () => {
        if (!productId) return;
        try {
            const res = await api.get(`/store/eshop/products/get-product-for-update/${productId}`)
            const data = res.data
            data.images1 = []
            data.images2 = []
            data.images3 = []
            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (!productId) return;
        const formData = new FormData();

        // Append images correctly
        Array.from(product.images1).forEach((img) => formData.append("images1", img));
        Array.from(product.images2).forEach((img) => formData.append("images2", img));
        Array.from(product.images3).forEach((img) => formData.append("images3", img));

        // Append product data as a JSON string
        formData.append("productData", JSON.stringify(product));

        try {
            const res = await api.put(`/store/eshop/products/update-product/${productId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const data = res.data;
            toast.success(data.message);
            setProduct(productFields);
            setDiamondAddingErrorMessage('')
            e.target.reset();
            navigate(-1)
        } catch (error) {
            toast.error(error.response?.data?.error || "Error submitting product.");
        }
    };



    useEffect(() => {
        getColors();
        getGolds();
        getDiamonds();
        getLabors();
        getCollections()
        getCateogries()
    }, []);
    useEffect(() => {
        setStyles([]);
        getCateogries();
        setCategories([]);
    }, [product.collection]);
    useEffect(() => {
        setStyles([]);
        getStyles();
    }, [product.category]);
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

                    <div>
                        <label>Product Stock</label>
                        <Input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Product Stock" />
                    </div>

                    <div>
                        <label>Product Weight</label>
                        <Input type="number" name="product_weight" value={product.product_weight || ''} onChange={handleChange} placeholder="Product Weight" />
                    </div>
                </div>

                <div className="flex w-full gap-4 my-4">

                    <div className="w-full">
                        <label>Select Collection</label>
                        <select name="collection" value={product.collection || ''} onChange={handleChange} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
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
                        <select name="category" value={product.category || ''} onChange={handleChange} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
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
                        <select name="style" value={product.style || ''} onChange={handleChange} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                            <option value="">Select Style</option>
                            {styles.map((style) => (
                                <option key={style._id} value={style._id}>
                                    {style.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={`flex gap-4 justify-between mt-6`}>
                    <div className="w-full">
                        <label>Select Color & Images</label>
                        <div className="w-full flex flex-col border p-2 my-2 border-gray-300 shadow-sm rounded-md gap-2">
                            <select name="color1" value={product.color1 || ''} onChange={handleChange} className="mt-2 block text-gray-500 w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                                <option value="">Select Color 1</option>
                                {colors.map((color) => (
                                    <option key={color._id} value={color._id}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            <Input type="file" multiple name="images1" onChange={handleImageUpload} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label>Select Color & Images</label>
                        <div className="w-full flex flex-col border p-2 my-2 border-gray-300 shadow-sm rounded-md gap-2">
                            <select name="color2" value={product.color2 || ''} onChange={handleChange} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                                <option value="">Select Color 2</option>
                                {colors.map((color) => (
                                    <option key={color._id} value={color._id}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            <Input type="file" multiple name="images2" onChange={handleImageUpload} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label>Select Color & Images</label>
                        <div className="w-full flex flex-col border p-2 my-2 border-gray-300 shadow-sm rounded-md gap-2">
                            <select name="color3" value={product.color3 || ''} onChange={handleChange} className="mt-2 text-gray-500 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                                <option value="">Select Color 3</option>
                                {colors.map((color) => (
                                    <option key={color._id} value={color._id}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            <Input type="file" multiple name="images3" onChange={handleImageUpload} />
                        </div>
                    </div>
                </div>

                <div className="border border-gray-300 shadow-sm my-4 p-4 rounded-md mb-4">
                    <h1 className="text-lg">Golds Details:</h1>
                    <Input type="number" name="total_gold_weight" value={product.total_gold_weight || ''} onChange={handleChange} placeholder="Total Gold Weight" />
                    <div className="flex items-center gap-2 border border-gray-300 shadow-sm px-4 py-2 rounded-md mt-2">
                        <div>
                            {golds.map((gold) => (
                                <div className="flex items-center gap-4" key={gold._id}>
                                    <label  >
                                        <Input className=" cursor-pointer" checked={product.golds.includes(gold._id)} type="checkbox" name="golds" value={gold._id} onChange={handleCheckbox} /> {gold.carat}
                                    </label>
                                    <Input value={product.total_gold_weight && gold.pricePerGram * product.total_gold_weight} disabled className="border bg-gray-100 my-1 border-gray-300 px-4 py-1 rounded-md" type="text" placeholder={`Price for ${gold.carat} gold`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border border-gray-300 shadow-sm p-4 rounded-md mt-6">
                    <h1 className="text-lg">Diamonds Details:</h1>
                    <div>
                        {product.diamonds.map((diamond, index) => {
                            const data = diamonds.find((obj)=>obj._id===diamond.diamond)
                            return <div className="border border-gray-300 shadow-sm p-4 my-2 rounded-md" key={diamond.diamond}>
                                <div className="flex gap-4 items-center justify-between">
                                    <h1 className="font-semibold">
                                        {data?.grade} - {data?.variant}
                                    </h1>
                                    <div className="flex items-center gap-4">
                                        <h4 className="text-sm font-medium text-nowrap">Same Pcs:</h4>
                                        <Input

                                            type="number"
                                            placeholder="Enter same pcs"
                                            value={diamond.same_pcs}
                                            onChange={(e) => {
                                                const updatedDiamonds = [...product.diamonds];
                                                updatedDiamonds[index].same_pcs = e.target.value;
                                                setProduct({ ...product, diamonds: updatedDiamonds });
                                            }}
                                        />
                                    </div>
                                </div>

                                <h4 className="text-sm font-medium">PCS:</h4>
                                {diamond.pcs.map((pcs, i) => (
                                    <div className="flex w-full" key={i}>
                                        <div className="grid grid-cols-2 gap-4 my-2 w-full" key={i}>
                                            <Input type="number" placeholder="Enter Count" value={pcs.count} onChange={(e) => handlePcsChange(index, i, "count", e.target.value)} />
                                            <Input type="number" placeholder="Enter Weight" value={pcs.weight} onChange={(e) => handlePcsChange(index, i, "weight", e.target.value)} />
                                        </div>
                                        {i !== 0 && (
                                            <button type="button" onClick={() => removeDiamondPcs(index, i)} className=" cursor-pointer text-xl font-semibold pl-2 text-red-500 hover:text-red-700">
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <div className="flex items-center justify-between">
                                    <Button text="Add PCS" type="button" className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333] mt-2' onClick={() => addPcsEntry(index)} />
                                    <Button text="Remvoe" onClick={() => { remvoeDiamond(index) }} className='bg-red-700 hover:bg-transparent border-red-700 px-4 hover:text-red-700 mt-2' />
                                </div>
                            </div>
                        })}
                    </div>

                    <span className="text-red-500">{diamnodAddingErrorMessage}</span>
                    <div className="flex gap-2">
                        <select
                            value={selectedDiamond}
                            onChange={(e) => {
                                setSelectedDiamond(e.target.value);
                            }}
                            className="mt-2 block w-full px-3 text-gray-500 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                            <option value="">Select Grade - Variant</option>
                            {diamonds.map((diamond) => (
                                <option key={diamond._id} value={diamond._id}>
                                    {diamond.grade} - {diamond.variant}
                                </option>
                            ))}
                        </select>
                        <Button text="ADD" type="button" onClick={handleDiamond} className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333] mt-2' />
                    </div>
                </div>

                <div className="border border-gray-300 shadow-sm p-4 rounded-md mt-6">
                    <h1 className="text-lg">Gemstone Details:</h1>
                    <div className="flex gap-2 justify-between mt-1">
                        <Input type="text" name="gemstone_name" value={product.gemstone_name} onChange={handleChange} placeholder="Gemstone Name" />

                        <Input type="number" name="gemstone_price" value={product.gemstone_price || ''} onChange={handleChange} placeholder="Gemstone Price" />

                        <Input type="number" name="gemstone_weight" value={product.gemstone_weight || ''} onChange={handleChange} placeholder="Gemstone Weight" />

                        <Input type="text" name="gemstone_type" value={product.gemstone_type} onChange={handleChange} placeholder="Gemstone Type" />
                    </div>
                </div>

                <div className="flex gap-2 justify-between mt-6">
                    <div className="w-full">
                        <label>Select Labor Type</label>
                        <select name="labor" value={product.labor} onChange={handleChange} className="mt-2 block w-full text-gray-500 px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm">
                            <option value="">Select Labor Type</option>
                            {labors.map((labor) => (
                                <option key={labor._id} value={labor._id}>
                                    {labor.type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex gap-2 justify-between mt-6">
                    <div className="w-full">
                        <label>Extra Cost</label>
                        <Input type="number" name="extra_cost" value={product.extra_cost || ''} onChange={handleChange} placeholder="Extra Cost" />
                    </div>

                    <div className="w-full">
                        <label>Extra Fee</label>
                        <Input type="number" name="extra_fee" value={product.extra_fee || ''} onChange={handleChange} placeholder="Extra Fee" />
                    </div>

                    <div className="w-full">
                        <label>GST %</label>
                        <Input type="number" name="gst_percent" value={product.gst_percent || ''} onChange={handleChange} placeholder="GST %" />
                    </div>
                </div>

                <div className="flex gap-2 justify-between mt-6">
                    <div className="w-full">
                        <label>Pearl Cost</label>
                        <Input type="number" name="pearl_cost" value={product.pearl_cost || ''} onChange={handleChange} placeholder="Pearl Cost" />
                    </div>

                    <div className="w-full">
                        <label>Height</label>
                        <Input type="text" name="height" value={product.height || ''} onChange={handleChange} placeholder="Height" />
                    </div>

                    <div className="w-full">
                        <label>Weight</label>
                        <Input type="text" name="weight" value={product.weight || ''} onChange={handleChange} placeholder="Weight" />
                    </div>
                </div>

                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="mt-6 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm " rows="3"></textarea>

                <div className="flex gap-2 border border-gray-300 shadow-sm px-4 py-2 rounded-md my-6">
                    <label className="block font-medium">IsItRing?:</label>
                    <Input className=" cursor-pointer" value={product.isItRing} type="checkbox" name="isItRing" onChange={(e) => { setProduct({ ...product, isItRing: e.target.value }) }} />
                </div>

                <div className="flex gap-2 border border-gray-300 shadow-sm px-4 py-2 rounded-md my-6">
                    <label className="block font-medium">Recommended For:</label>
                    <div className="flex gap-4">
                        <label>
                            <Input className=" cursor-pointer" checked={product.recommendedFor.includes("Casual Outing")} type="checkbox" name="recommendedFor" value="Casual Outing" onChange={handleCheckbox} /> Casual Outing
                        </label>
                        <label>
                            <Input className=" cursor-pointer" checked={product.recommendedFor.includes("Engagement")} type="checkbox" name="recommendedFor" value="Engagement" onChange={handleCheckbox} /> Engagement
                        </label>
                        <label>
                            <Input className=" cursor-pointer" checked={product.recommendedFor.includes("Contemporary")} type="checkbox" name="recommendedFor" value="Contemporary" onChange={handleCheckbox} /> Contemporary
                        </label>
                    </div>
                </div>

                <Button text="Save" type="submit" />
            </form>
        </div>
    );
}

