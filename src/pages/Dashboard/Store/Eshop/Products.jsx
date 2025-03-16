/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import api from "../../../../utils/api";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsCloudUpload } from "react-icons/bs";

const VITE_API_QOH_URL = import.meta.env.VITE_API_QOH_URL || "http://localhost:3002";

const calculateTotalPrice = (product) => {
  const prices = [];

  const pearlCost = product.pearl_cost ? product.pearl_cost : 0;
  const laborCost = product.labor ? product.labor.price * product.total_gold_weight : 0;
  const extraCost = product.extra_cost ? product.extra_cost : 0;
  const extraFee = product.extra_fee ? product.extra_fee : 0;
  const gemstonePrice = product.gemstone_price ? product.gemstone_price : 0;
  const diamond_discount = product.diamond_discount?.percent ? product.diamond_discount.percent : 0;
  const gold_discount = product.gold_discount?.percent ? product.gold_discount.percent : 0;
  const gst = product.gst_percent ? product.gst_percent : 0;
  const discount_on_total = product.discount_on_total?.percent ? product.discount_on_total.percent : 0;

  const goldList = [];

  product.golds.map((gold) => {
    const carat = gold.carat;
    const price = gold.pricePerGram * product.total_gold_weight;
    const m_charge = gold.making_charge ? gold.making_charge.percent : 0;
    const w_charge = gold.wastage_charge ? gold.wastage_charge.percent : 0;
    const makingCharge = Math.round((price * m_charge) / 100);
    const wastageCharge = Math.round((price * w_charge) / 100);
    goldList.push({ carat: carat, price: price, makingCharge: makingCharge, wastageCharge: wastageCharge });
  });

  const diamondGrade = [];
  const diamondPrice = [];
  const totalDiamondWeight = [];

  product.diamonds?.map((obj) => {
    const grade = obj.diamond?.grade;
    if (!diamondGrade.includes(grade)) {
      diamondGrade.push(grade);
    }
  });

  diamondGrade.map((grade) => {
    let _totalDiamondWeight = 0;
    let price = 0;
    product.diamonds?.map((obj) => {
      if (grade === obj.diamond?.grade) {
        obj.pcs?.map((pcs) => {
          obj.diamond?.priceRanges.map((range) => {
            if (pcs.weight / pcs.count >= range.minCts && pcs.weight / pcs.count <= range.maxCts) {
              price = price + (pcs.weight / pcs.count) * range.pricePerGram * pcs.count;
              _totalDiamondWeight = parseFloat((_totalDiamondWeight + pcs.weight).toFixed(3));
            }
          });
        });
      }
    });
    totalDiamondWeight.push(_totalDiamondWeight);
    diamondPrice.push(price);
  });

  diamondGrade.map((grade, diamondIndex) => {
    goldList.map((gold) => {
      const diamondprice = diamondPrice[diamondIndex];
      const goldprice = gold.price;
      const makingCharge = gold.makingCharge;
      const wastageCharge = gold.wastageCharge;
      const diamondPriceAfterDiscount = diamondprice - diamondprice * (diamond_discount / 100);
      const goldPriceAfterDiscount = goldprice - goldprice * (gold_discount / 100);
      const subTotal = goldPriceAfterDiscount + diamondPriceAfterDiscount + gemstonePrice + pearlCost + extraCost + extraFee + laborCost + makingCharge + wastageCharge;
      const totalAfterDiscount = subTotal - subTotal * (discount_on_total / 100);
      const gstAmount = totalAfterDiscount * (gst / 100);
      const finalTotalPrice = Math.round(totalAfterDiscount + gstAmount);
      prices.push({
        carat: gold.carat,
        grade: grade,
        totalDiamondWeight: totalDiamondWeight[diamondIndex],
        total_gold_weight: product.total_gold_weight,
        makingCharge,
        wastageCharge,
        laborCost,
        pearlCost,
        extraFee,
        extraCost,
        diamond_discount,
        gold_discount,
        discount_on_total,
        gst,
        goldprice,
        diamondprice,
        goldPriceAfterDiscount,
        diamondPriceAfterDiscount,
        subTotal,
        totalAfterDiscount,
        gstAmount,
        finalTotalPrice,
      });
    });
  });
  return prices;
};

const Inventory = () => {
  const [productList, setProductList] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const itemPerPage = 12;

  const loadingRef = useRef(loading);
  const hasMoreItem = useRef(productList.length < totalRecords ? true : false);

  const getProduct = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await api.post("/store/eshop/products/get-products", {
        page,
        limit: itemPerPage,
      });
      const data = res?.data;
      setTotalRecords(data?.totalRecords);
      if (page === 1) {
        setProductList(data?.products);
      } else {
        setProductList([...productList, ...data?.products]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (!id) return;
    try {
      const res = await api.delete(`/store/eshop/products/delete-product/${id}`);
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
      const response = await api.post("/store/eshop/products/bulk-upload", formData, {
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
      <div>
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
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className=" text-gray-600 uppercase text-sm leading-normal ">
              <th className="py-3 px-6 text-left">SKU</th>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Tax Rate</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {productList.map((product) => {
              const data = calculateTotalPrice(product);
              return (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">{product?.sku}</td>
                  <td className="py-3 px-6 ">
                    <div className="flex items-center">
                      <img src={product.images1[0]?.url} alt={product.name} width={50} height={50} className="rounded" />
                      <div className="ml-3">
                        <Link to={`${VITE_API_QOH_URL}/product/${product.name.replaceAll(" ", "-")}`}>
                          <p className="font-semibold hover:border-b">{product.name}</p>
                        </Link>
                        <p className="text-gray-500 text-xs">
                          {product.total_gold_weight}gm gold {data && data[0]?.totalDiamondWeight} carat
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-nowrap">
                    {data.map((obj, i) => {
                      return (
                        <div key={i} className="flex gap-4 text-lg">
                          <span>Carat: {obj.carat}</span> <span>Grade: {obj.grade}</span> <span>Price: ₹{obj.finalTotalPrice}</span>
                        </div>
                      );
                    })}
                  </td>
                  <td className="py-3 px-6">{product.gst_percent ? product.gst_percent : 0} %</td>
                  <td className="py-3 px-6 text-white">
                    {product.stock == 0 ? (
                      <span className="bg-red-700 w-7 flex items-center justify-center rounded-full aspect-square">{product.stock}</span>
                    ) : product.stock > 0 && product.stock < 10 ? (
                      <span className="bg-yellow-500 w-7 flex items-center justify-center rounded-full aspect-square">{product.stock}</span>
                    ) : (
                      <p className="bg-green-700 w-7 flex items-center justify-center rounded-full aspect-square">{product.stock}</p>
                    )}
                  </td>
                  <td className="py-3 px-6">
                    <button className="text-2xl mr-3">
                      <Link to={`/dashboard/store/eshop/update-product?productId=${product._id}`}>
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
