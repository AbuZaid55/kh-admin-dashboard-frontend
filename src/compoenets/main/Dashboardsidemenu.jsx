import { useEffect, useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { GrValidate } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { ImMagicWand } from "react-icons/im";
import { GrDocumentText } from "react-icons/gr";
import { TbLayoutDistributeHorizontalFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

function Dashboardsidemenu() {
  const [close, setClose] = useState(false);
  const [activeStore, setActiveStore] = useState("khwaahish");
  const [activeCustomize, setActiveCustomize] = useState("khwaahish");

  const [active, setactive] = useState(sessionStorage.getItem("activeMenu") || "Admin Profile");

  // using beacuse of state managment of active menu
  useEffect(() => {
    sessionStorage.setItem("activeMenu", active);
  }, [active]);

  const menus = [
    {
      icon: <GrValidate />,
      label: "Promocode",
      href: "promocode",
    },
    {
      icon: <ImMagicWand />,
      label: "Khawahish",
      href: "Khwahish",
    },
    {
      icon: <GrDocumentText />,
      label: 'Article',
      href: 'artical'
  },
  {
      icon: <IoSearchOutline />,
      label: 'SEO',
      href: 'seo'
  },
  {
    icon: <TbLayoutDistributeHorizontalFilled />,
    label: 'Layout',
    href: 'layout'
},
    {
      icon: <IoIosInformationCircleOutline />,
      label: "Customer",
      href: "customers",
    },
    {
      icon: <IoSettingsOutline />,
      label: "Settings",
      href: "settings",
    },
  ];

  const store = {
    khwaahish: [
      {
        label: "Collections",
        href: "store/khwaahish/collections",
      },
      {
        label: "Categories",
        href: "store/khwaahish/categories",
      },
      {
        label: "Styles",
        href: "store/khwaahish/styles",
      },
      {
        label: "Add Product",
        href: "store/khwaahish/add-product",
      },
      {
        label: "Products",
        href: "store/khwaahish/products",
      },
    ],
    eshop: [
      {
        label: "Collections",
        href: "store/eshop/collections",
      },
      {
        label: "Categories",
        href: "store/eshop/categories",
      },
      {
        label: "Styles",
        href: "store/eshop/styles",
      },
      {
        label: "Colors",
        href: "store/eshop/colors",
      },
      {
        label: "Golds",
        href: "store/eshop/golds",
      },
      {
        label: "Diamonds",
        href: "store/eshop/diamonds",
      },
      {
        label: "Labors",
        href: "store/eshop/labors",
      },
      {
        label: "Making Charges",
        href: "store/eshop/making-charges",
      },
      {
        label: "Wastage Charges",
        href: "store/eshop/wastage-charges",
      },
      {
        label: "Recommended",
        href: "store/eshop/recommended",
      },
      {
        label: "Add Product",
        href: "store/eshop/add-product",
      },
      {
        label: "Discount",
        href: "store/eshop/discount",
      },
      {
        label: "Products",
        href: "store/eshop/products",
      },
      {
        lable: "Discounts",
        href: "store/eshop/discounts",
      },
      {
        label: "Orders",
        href: "store/eshop/orders",
      },
    ],
  };

  return (
    <>
      <aside className="  text-white h-screen ">
        <div className={`bg-black overflow-hidden ${close ? "w-[300px]" : "w-[100px] items-center"} transition-all  duration-300 ease-in-out px-10 pt-8 w-[100%] min-h-screen flex flex-col gap-5 h-full overflow-y-scroll scrollbar-hide`}>
          <div className=" flex flex-col justify-start items-start">
            <button className="flex gap-5 justify-start items-start cursor-pointer" onClick={() => {setClose((prev) => !prev)}}>
              <CgMenuLeftAlt className={`text-[24px] ${close ? "rotate-180 duration-500 " : "rotate-0 duration-500"}`} />
              {close && <span className=" text-[16px] ">Menu</span>}
            </button>

            {/* for first 0 to 9 appearance beacuse of space between */}
            <div className=" flex flex-col pt-[50px] gap-3">
              <div>
                <Link to="/dashboard">
                  <button
                    onClick={() => {
                      setactive("dashboard");
                    }}
                    className={`${active == "dashboard" ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                    <span className=" text-[24px]">
                      <CgProfile />
                    </span>
                    {close && <span className="text-[16px] text-nowrap">Admin Profile</span>}
                  </button>
                </Link>
              </div>
              <div>
                <Link to="dashprofile">
                  <button
                    onClick={() => {
                      setactive("dashprofile");
                    }}
                    className={`${active == "dashprofile" ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                    <span className=" text-[24px]">
                      <RxDashboard />
                    </span>
                    {close && <span className="text-[16px] text-nowrap">Dashboard</span>}
                  </button>
                </Link>
              </div>

              <div>
                <div
                  onClick={() => {
                    setactive("store_manegement");
                    setClose(true);
                  }}
                  className={`${active == "store_manegement" ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                  <span className=" text-[24px]">
                    <IoStorefrontSharp />
                  </span>
                  {close && <span className="text-[16px] text-nowrap">Store Manegement</span>}
                </div>
                <div className={`${close && active === "store_manegement" ? "" : "hidden"}  flex flex-col items-end mt-2 ml-8`}>
                  <div className={`grid grid-cols-2 gap-2 justify-end bg-gray-500 rounded-md`}>
                    <button
                      className={`${activeStore === "khwaahish" ? "bg-white text-black" : ""} px-2 py-1 rounded-md transition-all ease-in-out duration-200 cursor-pointer`}
                      onClick={() => {
                        setActiveStore("khwaahish");
                      }}>
                      Khwaahish
                    </button>
                    <button
                      className={`${activeStore === "eshop" ? "bg-white text-black" : ""} px-2 py-1 rounded-md transition-all ease-in-out duration-200 cursor-pointer`}
                      onClick={() => {
                        setActiveStore("eshop");
                      }}>
                      Eshop
                    </button>
                  </div>
                  <div className="w-full flex flex-col gap-1 p-4 border mt-4 rounded-xl border-gray-500">
                    {activeStore &&
                      store[activeStore].map((item, i) => (
                        <Link to={item.href} className=" cursor-pointer hover:text-[#EC9D0C]" key={i}>
                          {item.label}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>

              {menus.slice(0, 1).map((menu, i) => (
                <div key={i}>
                  <Link to={menu.href}>
                    <button
                      onClick={() => {
                        setactive(menu.label);
                      }}
                      className={`${active == menu.label ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                      <span className=" text-[24px]">{menu.icon}</span>
                      {close && <span className="text-[16px] text-nowrap">{menu.label}</span>}
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            <div>
              <Link
                to={menus[1].href}
                onClick={() => {
                  setactive(menus[1].label);
                  setClose(true);
                  setActiveCustomize("khwaahish")
                }}
                className={`${active == menus[1].label ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer mt-2`}>
                <span className=" text-[24px]">{menus[1].icon}</span>
                {close && <span className="text-[16px] text-nowrap">Customization</span>}
              </Link>
              <div className={`${close && active === menus[1].label ? "" : "hidden"}  flex flex-col items-end mt-2 ml-8`}>
                <div className={`grid grid-cols-2 gap-2 justify-end bg-gray-500 rounded-md text-center  `}>
                  <Link
                    to={menus[1].href}
                    className={`${activeCustomize === "khwaahish" ? "bg-white text-black" : ""} px-2 py-1 rounded-md transition-all ease-in-out duration-200 cursor-pointer`}
                    onClick={() => {
                      setActiveCustomize("khwaahish");
                    }}>
                    Khwaahish
                  </Link>
                  <Link
                    to="queen"
                    className={`${activeCustomize === "QOH" ? "bg-white text-black" : ""} px-2 py-1 rounded-md transition-all ease-in-out duration-200 cursor-pointer`}
                    onClick={() => {
                      setActiveCustomize("QOH");
                    }}>
                    QOH
                  </Link>
                </div>
              </div>
            </div>

            {/* for 10 to 11 appearance beacuse of space between */}

            <div className="flex flex-col justify-start items-start pt-3 gap-3">
              {menus.slice(2, ).map((menu, i) => (
                <div key={i}>
                  <Link to={menu.href}>
                    <button
                      onClick={() => {
                        setactive(menu.label);
                      }}
                      className={`${active == menu.label ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                      <span className=" text-[24px]">{menu.icon}</span>
                      {close && <span className="text-[16px] text-nowrap">{menu.label}</span>}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Dashboardsidemenu;
