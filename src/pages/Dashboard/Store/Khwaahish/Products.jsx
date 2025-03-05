/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsCloudUpload } from "react-icons/bs";

const Inventory = () => {
  const [productList, setProductList] = useState([]);

  const getProduct = async () => {
    try {
      const res = await api.post("/store/khw/products/get-products");
      const data = await res.data;
      setProductList(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!id) return;
    try {
      const res = await api.delete(`/store/khw/products/delete-product/${id}`);
      const data = await res.data;
      toast.success(data.message);
      getProduct();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="p-6 relative">
      <div className=" px-3 py-2  shadow-md rounded-lg w-fit absolute -top-11">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="file" className=" hidden w-full h-full" accept="image/*" />
          <p>Bulk upload </p>
          <span>
            <BsCloudUpload />
          </span>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className=" text-gray-600 uppercase text-sm leading-normal ">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {productList.map((product) => {
              return (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 flex items-center">
                    <img src={product.images[0]?.url} alt={product.name} width={50} height={50} className="rounded" />
                    <div className="ml-3">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-gray-500 text-xs">
                        {product.gold_weight}gm gold {product.diamond_weight} carat
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <button className="text-2xl mr-3">
                      <Link to={`/dashboard/store/khwaahish/update-product?productId=${product._id}`}>
                        <BiEditAlt className=" text-[#676767] cursor-pointer" />
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        deleteProduct(product._id);
                      }}
                      className="text-2xl">
                      <RiDeleteBin5Line className=" text-red-500 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
