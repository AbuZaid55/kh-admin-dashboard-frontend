import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
import Input from '../../../../compoenets/main/Input';
import Button from '../../../../compoenets/main/Button';
import { toast } from "react-toastify";

const page = () => {

  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [styles, setStyles] = useState([]);
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState({ collection: "", category: "", style: "", product: "" });
  const [discount_on, setDiscountOn] = useState('')
  const [percent, setPercent] = useState('')
  const [message, setMessage] = useState('')
  const [discountList, setDiscountList] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedDiscount, setSelectedDisount] = useState('')

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleEdit = (discount) => {
    setIsEditMode(true)
    setPercent(discount.percent)
    setMessage(discount.message)
    setSelectedDisount(discount._id)
  }

  const cancleEdit = () => {
    setIsEditMode(false)
    setDiscountOn('')
    setPercent('')
    setMessage('')
    setInput({ collection: "", category: "", style: "", product: "" })
  }


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
      if (!input.category) return;
      const res = await api.get(`/store/eshop/categories/${input.category}/styles`);
      const data = res.data;
      setStyles(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    if (!input.style) return;
    try {
      const res = await api.post("/store/eshop/products/get-products", input);
      const data = await res.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/store/eshop/discounts/apply-discount", { ...input, discount_on, percent, message })
      const data = await res.data
      toast.success(data.message)
      getDiscounts()
      setInput({ brand: "", collection: "", category: "", style: "", product: "" })
      setDiscountOn('')
      setPercent('')
      setMessage('')
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const handleSave = async () => {
    if(!selectedDiscount) return;
    try {
      const res = await api.put(`/store/eshop/discounts/update-discount/${selectedDiscount}`, { percent, message })
      const data = await res.data
      toast.success(data.message)
      getDiscounts()
      setPercent('')
      setMessage('')
      setSelectedDisount('')
      setIsEditMode(false)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const deleteDiscount = async(id)=>{
    if(!id) return;
    try {
      const res = await api.delete(`/store/eshop/discounts/delete-discount/${id}`)
      const data = await res.data
      toast.success(data.message)
      getDiscounts()
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  const getDiscounts = async () => {
    try {
      const res = await api.get("/store/eshop/discounts/get-all-discounts")
      const data = await res.data
      setDiscountList(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDiscounts()
  }, []);
  useEffect(() => {
    setInput({ ...input, "category": "", style: "", product: "" })
  }, [input.collection])
  useEffect(() => {
    getCateogries();
    getCollections()
    getDiscounts()
  }, []);
  useEffect(() => {
    setStyles([]);
    setProducts([]);
    getStyles();
  }, [input.category]);
  useEffect(() => {
    setProducts([]);
    getProducts();
  }, [input.style]);

  return (
    <div className="w-[100%] bg-white p-4 rounded-md shadow-md mb-4">
      <h1 className="text-lg font-semibold mb-4">{isEditMode ? "Edit Discount" : "Create Discount"}</h1>

      {
        !isEditMode ? <div>
          <div className="grid grid-cols-2 gap-6">

            <div>
              <label>Select Collection</label>
              <select name="collection" value={input.collection} onChange={handleChange} className="mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                <option value="">Select Collection</option>
                {collections.map((collection) => (
                  <option key={collection._id} value={collection._id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Select Category</label>
              <select name="category" value={input.category} onChange={handleChange} className="mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Select Style</label>
              <select name="style" value={input.style} onChange={handleChange} className="mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                <option value="">Select Style</option>
                {styles.map((style) => (
                  <option key={style._id} value={style._id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Select Product</label>
              <select name="product" value={input.product} onChange={handleChange} className="mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <div className="w-full">
              <label>Select Discount On</label>
              <select value={discount_on} onChange={(e) => { setDiscountOn(e.target.value) }} className="mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm  ">
                <option value="">Select Discount On</option>
                <option value="diamond_discount">Diamond Price</option>
                <option value="gold_discount">Gold Price</option>
                <option value="discount_on_total">Total Price</option>
              </select>
            </div>
            <div className="w-full">
              <label>Enter Percentage</label>
              <Input value={percent} onChange={(e) => { setPercent(e.target.value) }} type="number" placeholder="Enter Percetange" />
            </div>
            <div className="w-full">
              <label>Enter Message</label>
              <Input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder="Enter Message" />
            </div>
          </div>
        </div> :
          <div className="flex gap-4 mt-6">
            <div className="w-full">
              <label>Enter Percentage</label>
              <Input value={percent} onChange={(e) => { setPercent(e.target.value) }} type="number" placeholder="Enter Percetange" />
            </div>
            <div className="w-full">
              <label>Enter Message</label>
              <Input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder="Enter Message" />
            </div>
          </div>
      }

      {
        isEditMode ? <div className="flex gap-4 mt-6">
          <Button text="Save   Discount" className="w-fit px-4 bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] " onClick={handleSave} />
          <Button className='bg-[#333333] hover:bg-transparent border-[#333333] px-4 hover:text-[#333333]' text="Cancel" onClick={() => { cancleEdit() }} />
        </div> :
          <Button text="Apply Discount" className="w-fit px-4 bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] mt-6 " onClick={handleSubmit} />
      }

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border border-black shadow-md text-center">
          <thead className="bg-[#A2C6F4] text-black">
            <tr>
              <th className="px-4 py-2 border">Discount Type</th>
              <th className="px-4 py-2 border">Discount On</th>
              <th className="px-4 py-2 border">Percent %</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discountList?.map((discount, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2 border">{discount.product?._id ? "Product " + `(${discount.product.name})` : discount.style ? "Style " + `(${discount.style.name})` : discount.category ? "Category " + `(${discount.category.name})` : "Collection " + `(${discount.collection.name})`}</td>
                <td className="px-4 py-2 border">{discount.discount_on}</td>
                <td className="px-4 py-2 border">{discount.percent}%</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-[#EC9D0C] text-white px-3 py-1 rounded-md mr-2 cursor-pointer"
                    onClick={() => { handleEdit(discount) }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#EC390C] text-white px-3 py-1 rounded-md cursor-pointer"
                    onClick={() => deleteDiscount(discount._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;

