import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuBellRing } from "react-icons/lu";
import { IoChevronUpOutline } from "react-icons/io5";
import { BsCloudUpload } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { CgMenuLeftAlt } from "react-icons/cg";

const inventoryfilter = ["Price", "Stock", "Category", "Subcategory", "Tags"];
const orderfilter = ["Newest first", "Pending", "Completed"];
const KhwahishpageNamevalue = ["#Homepage", "Noor", "Asai", "Pache", "BridelEdit", "PolkiEdit", "MakeAwish", "TestemonialKhwa"];
const QOHpageNamevalue = ["#Homepage", "Gulz", "Fazza", "Festara", "TestemonialQOH"];
const Articalvalue = ["#PrivacyPolicy", "Terms&Conditions", "OurStory", "Blog"];
const Seovalue = ["#Seo", "DNS", "Customizations"];
const Layoutvalue = ["#Header", "Footer", "QuickLinks"];
const KhwahishpageName = ["Homepage", "Noor", "Asai", "Pache", "BridelEdit", "PolkiEdit", "MakeAwish", "Testemonial"];
const QOHpageName = ["Homepage", "Gulz", "Fazza", "Festara", "Testemonial"];
const Artical = ["PrivacyPolicy", "Terms&Conditions", "OurStory", "Blog"];
const Seo = ["Seo", "DNS", "Customizations"];
const Layout = ["Header", "Footer", "QuickLinks"];

function Dashboarduppermenu({ setresponsive, responsive, setClose }) {
  const [filtercompshow, setfiltercompshow] = useState(false);
  const [bulkshow, setbulkshow] = useState(false);
  const [filtertab, setfiltertab] = useState(false);
  const [edithompage, setedithompage] = useState(false);
  const [filterselection, setfilterselection] = useState("");
  const [currentfilter, setcurrentfilter] = useState([]);
  const [currentpageName, setcurrentpageName] = useState([]);
  const [currentpageNamevalue, setcurrentpageNamevalue] = useState([]);
  const [selectedoption, setselectedoption] = useState(sessionStorage.getItem("pageSelected"));

  const location = useLocation();
  const navigate = useNavigate();

  // using beacuse of state managment of active menu
  useEffect(() => {
    sessionStorage.setItem("pageSelected", selectedoption);
  }, [selectedoption]);

  // check location for component render on there require and filter data change also
  useEffect(() => {
    if (location.pathname === "/dashboard/inventory") {
      setfiltercompshow(true);
      setbulkshow(true);
      setedithompage(false);
      setcurrentfilter(inventoryfilter);
      setfilterselection("Price");
    } else if (location.pathname === "/dashboard/orders") {
      setfiltercompshow(true);
      setbulkshow(false);
      setedithompage(false);
      setcurrentfilter(orderfilter);
      setfilterselection("Newest first");
    } else if (location.pathname.startsWith("/dashboard/Khwahish")) {
      setedithompage(true);
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(KhwahishpageName);
      setcurrentpageNamevalue(KhwahishpageNamevalue);
    } else if (location.pathname.startsWith("/dashboard/queen")) {
      setedithompage(true);
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(QOHpageName);
      setcurrentpageNamevalue(QOHpageNamevalue);
    } else if (location.pathname.startsWith("/dashboard/artical")) {
      setedithompage(true);
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(Artical);
      setcurrentpageNamevalue(Articalvalue);
    } else if (location.pathname.startsWith("/dashboard/seo")) {
      setedithompage(true);
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(Seo);
      setcurrentpageNamevalue(Seovalue);
    } else if (location.pathname.startsWith("/dashboard/layout")) {
      setedithompage(true);
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(Layout);
      setcurrentpageNamevalue(Layoutvalue);
    } else {
      setfiltercompshow(false);
      setbulkshow(false);
      setedithompage(false);
    }
  }, [location.pathname]);

  // handle category option input page change
  const handeloptionchange = (e) => {
    const selectedvaluse = e.target.value;
    setselectedoption(selectedvaluse);
    if (location.pathname.startsWith("/dashboard/Khwahish")) navigate(`/dashboard/Khwahish/${selectedvaluse.toLowerCase()}`);

    if (location.pathname.startsWith("/dashboard/queen")) navigate(`/dashboard/queen/${selectedvaluse.toLowerCase()}`);
    if (location.pathname.startsWith("/dashboard/artical")) navigate(`/dashboard/artical/${selectedvaluse.toLowerCase()}`);
    if (location.pathname.startsWith("/dashboard/seo")) navigate(`/dashboard/seo/${selectedvaluse.toLowerCase()}`);
    if (location.pathname.startsWith("/dashboard/layout")) navigate(`/dashboard/layout/${selectedvaluse.toLowerCase()}`);
  };

  return (
    <>
      <div className=" w-full flex gap-2 justify-between items-center  ">
        <div className=" w-full flex md:gap-[100px] gap-2 md:pl-3 justify-between items-center">
          {/* menuhambuder */}
          <div
            className=" md:hidden block text-2xl cursor-pointer"
            onClick={() => {
              setresponsive(true), setClose(true);
            }}>
            <CgMenuLeftAlt />
          </div>

          {/* filter components only on spacific pages */}
          {filtercompshow && (
            <div className="md:flex md:flex-row flex flex-col  md:gap-[80px] gap-3 items-center">
              {filtercompshow && (
                <div className=" relative ">
                  <button className="cursor-pointer px-3 py-2 shadow-md rounded-lg flex-nowrap flex items-center md:gap-[90px] hover:bg-gray-100" onClick={() => setfiltertab(!filtertab)}>
                    <p className=" text-nowrap md:text-md text-sm">Filter By</p>
                    <span className={`md:text-[20px] text-sm opacity-60 ${filtertab ? "rotate-0" : "rotate-180"} `}>
                      <IoChevronUpOutline />
                    </span>
                  </button>

                  {filtertab && (
                    <div className=" absolute shadow-md rounded-lg px-5 py-2 top-12 z-50 bg-[#FDFDFF] flex flex-col gap-2">
                      {currentfilter.map((filter, i) => (
                        <button
                          key={i}
                          className="flex justify-between gap-12 items-center cursor-pointer"
                          onClick={() => {
                            setfilterselection(filter), setfiltertab(false);
                          }}>
                          <p>{filter}</p>
                          <p className={`w-[10px] h-[10px] rounded-[100%] ${filter == filterselection ? "bg-green-500" : "bg-gray-500"} `} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* edit homepage  and edit collection list*/}
          {edithompage && (
            <div className=" flex gap-8 items-center">
              {/* <div className='px-3 py-2 shadow-md rounded-lg border-2 cursor-pointer'>{selectedoption}</div> */}

              <p className=" text-nowrap md:block hidden ">Edit Collection</p>

              <div className="">
                <select name="" id="" className="outline-none text-[15px] p-2 w-[140px] shadow-md rounded-lg cursor-pointer" onChange={handeloptionchange} value={selectedoption}>
                  <option value="" disabled hidden>
                    {sessionStorage.getItem("pageSelected")}
                  </option>
                  {currentpageName.map((page, i) => (
                    <option key={i} value={currentpageNamevalue[i]}>
                      {page}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* search button */}
        </div>

        <div className=" rounded-xl md:w-[300px] bg-[#FDFDFF] flex justify-start items-center gap-4 shadow-md py-3 md:px-6 px-2 ">
          <span className="w-[5%]">
            <IoSearchOutline />
          </span>
          <input type="search" className="outline-none focus:outline-none text-[14px] w-[90%]" placeholder="Search for anything" />
        </div>

        <div className=" flex justify-center items-center gap-5 ml-5">
          <LuBellRing className=" md:text-[24px] text-[18px] " />
        </div>
      </div>
    </>
  );
}

export default Dashboarduppermenu;
