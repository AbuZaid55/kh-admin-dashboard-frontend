import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuBellRing } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

const KhwahishpageName = ["Noor", "Asai", "Pache", "BridelEdit", "PolkiEdit", "MakeAwish"];
const NoorpageName = ["Gulz", "Fazza", "Festara"];

function Dashboarduppermenu() {
  const [edithompage, setedithompage] = useState(false);
  const [currentpageName, setcurrentpageName] = useState([]);
  const [selectedoption, setselectedoption] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // check location for component render on there require and filter data change also
  useEffect(() => {
     if (location.pathname.startsWith("/dashboard/Khwahish")) {
      setedithompage(true);
      setcurrentpageName(KhwahishpageName);
    } else if (location.pathname.startsWith("/dashboard/queen")) {
      setedithompage(true);
      setcurrentpageName(NoorpageName);
    } else {
      setedithompage(false);
    }
  }, [location.pathname]);

  // handle category option input page change
  const handeloptionchange = (e) => {
    const selectedvaluse = e.target.value;
    setselectedoption(selectedvaluse);
    if (location.pathname.startsWith("/dashboard/Khwahish")) navigate(`/dashboard/Khwahish/${selectedvaluse.toLowerCase()}`);

    if (location.pathname.startsWith("/dashboard/queen")) navigate(`/dashboard/queen/${selectedvaluse.toLowerCase()}`);
  };

  // handle on cking option change for home page and make option selected empty
  const handeloptionhomepageclick = () => {
    setselectedoption("");
    if (location.pathname.startsWith("/dashboard/Khwahish")) navigate(`/dashboard/Khwahish`);
    if (location.pathname.startsWith("/dashboard/queen")) navigate(`/dashboard/queen`);
  };

  return (
    <>
      <div className=" w-full flex gap-10 justify-between items-center  ">
        <div className=" flex gap-[100px] pl-5">
          {/* edit homepage  and edit collection list*/}
          {edithompage && (
            <div className=" flex gap-8 items-center">
              <button className={` px-3 py-2 shadow-md rounded-lg border-4 cursor-pointer  ${location.pathname === "/dashboard/Khwahish" ? "border-amber-200" : "border-transparent"}`} onClick={handeloptionhomepageclick}>
                Edit Homepage
              </button>
              <p>Edit Collection</p>

              <div className="">
                <select name="" id="" className="outline-none text-[15px] p-2 w-[140px] shadow-md rounded-lg cursor-pointer" onChange={handeloptionchange} value={selectedoption}>
                  <option value="" disabled hidden>
                    Select Category
                  </option>
                  {currentpageName.map((page, i) => (
                    <option key={i} value={page}>
                      {page}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className=" flex gap-10">
          {/* search button */}
          <div className=" rounded-xl w-[300px] bg-[#FDFDFF] flex justify-start items-center gap-4 shadow-md py-3 px-6 ">
            <span className=" w-[5%]">
              <IoSearchOutline />
            </span>
            <input type="search" className="outline-none focus:outline-none text-[14px] w-[90%]" placeholder="Search for anything" />
          </div>

          <div className="flex justify-center items-center gap-5 ml-5">
            <LuBellRing className=" text-[24px]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboarduppermenu;
