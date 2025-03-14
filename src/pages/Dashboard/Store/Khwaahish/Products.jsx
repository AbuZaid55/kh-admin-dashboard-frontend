/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import api from "../../../../utils/api";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsCloudUpload } from "react-icons/bs";

const Inventory = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const itemPerPage = 200;

  const loadingRef = useRef(loading);
  const hasMoreItem = useRef(productList.length < totalRecords ? true : false);

  const getProduct = async () => {
    if(loading) return 
    setLoading(true)
    try {
      const res = await api.post("/store/khw/products/get-products", { page: page, limit: itemPerPage });
      const data = await res.data;
      setTotalRecords(data?.totalRecords);
      if (page === 1) {
        setProductList(data?.products);
      } else {
        setProductList([...productList, ...data?.products]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("File Selected:", selectedFile.name);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post("/store/khw/products/bulk-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      if (page === 1) {
        getProduct();
      } else {
        setPage(1);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!id) return;
    try {
      const res = await api.delete(`/store/khw/products/delete-product/${id}`);
      const data = await res.data;
      toast.success(data.message);
      if (page === 1) {
        getProduct();
      } else {
        setPage(1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handleInfiniteScroll = () => {
    const container = document.getElementById("scrollable-container");
    if (!container) return;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
      if (!loadingRef.current && hasMoreItem.current) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, [page]);
  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    if (!container) return;
    container.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      container.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);
  useEffect(() => {
    loadingRef.current = loading;
    hasMoreItem.current = productList.length < totalRecords ? true : false;
  }, [loading, hasMoreItem]);


  return (
    <div className="p-6 relative">
      <div className="flex items-center justify-between gap-4 px-3 py-2  shadow-md rounded-lg w-fit absolute -top-11">
        <label className="text-nowrap flex items-center justify-center gap-2 cursor-pointer" htmlFor="bulk_upload">
          <input className="hidden" id="bulk_upload" type="file" onChange={handleFileChange} />
          {uploading ? "Uploading..." : "Select File"}
          <span>
            <BsCloudUpload />
          </span>
        </label>
        <button className={`${uploading ? "" : "cursor-pointer"} border px-4 rounded-md hover:bg-gray-100`} disabled={uploading} onClick={handleFileUpload}>
          Bulk upload
        </button>
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
      <div className="flex items-center justify-center w-full mt-5">{loading && <div className="loader"></div>}</div>
    </div>
  );
};

export default Inventory;
