/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsCloudUpload } from "react-icons/bs";

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

  const getProduct = async () => {
    try {
      const res = await api.post("/store/eshop/products/get-products");
      const data = await res.data;
      setProductList(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!id) return;
    try {
      const res = await api.delete(`/store/eshop/products/delete-product/${id}`);
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
                  <td className="py-3 px-6 flex items-center">
                    <img src={product.images1[0]?.url} alt={product.name} width={50} height={50} className="rounded" />
                    <div className="ml-3">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-gray-500 text-xs">
                        {product.total_gold_weight}gm gold {data && data[0]?.totalDiamondWeight} carat
                      </p>
                      <p className="text-gray-500 text-xs">
                        {data && data[0]?.carat} gold {data && data[0]?.grade} grade
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-nowrap">{data ? "₹ " + data[0]?.finalTotalPrice : "Null"}</td>
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
    </div>
  );
};

export default Inventory;
