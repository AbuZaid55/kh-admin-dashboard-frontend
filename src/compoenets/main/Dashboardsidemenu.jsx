
import { useEffect, useState } from 'react'
import { CgMenuLeftAlt } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { GrValidate } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { ImMagicWand } from "react-icons/im";
import { Link } from 'react-router-dom';

function Dashboardsidemenu() {
    const [close, setClose] = useState(false)
    const [activeStore,setActiveStore]=useState('khwaahish')

    const [active, setactive] = useState(sessionStorage.getItem('activeMenu') || 'Admin Profile')


    // using beacuse of state managment of active menu
    useEffect(() => {
        sessionStorage.setItem('activeMenu', active)
    }, [active])



    const menus = [
        {
            icon: <GrValidate />,
            label: 'Promocode',
            href: 'promocode'
        },
        {
            icon: <IoSettingsOutline />,
            label: 'Settings',
            href: 'settings'
        },
        {
            icon: <ImMagicWand />,
            label: 'Khawahish',
            href: 'Khwahish'
        },
        {
            icon: <IoIosInformationCircleOutline />,
            label: 'Customer',
            href: 'customers'
        },

    ]

    const store = {
        khwaahish: [
            {
                label: 'Collections',
                href: 'store/khwaahish/collections'
            },
            {
                label: 'Categories',
                href: 'store/khwaahish/categories'
            }, {
                label: 'Styles',
                href: 'store/khwaahish/styles'
            },
            {
                label: 'Add Product',
                href: 'store/khwaahish/add-product'
            },
            {
                label: 'Products',
                href: 'store/khwaahish/products'
            },
        ],
        eshop: [
            {
                label: 'Collections',
                href: 'store/eshop/collections'
            },
            {
                label: 'Categories',
                href: 'store/eshop/categories'
            }, 
            {
                label: 'Styles',
                href: 'store/eshop/styles'
            },
            {
                label: 'Colors',
                href: 'store/eshop/colors'
            },
            {
                label: 'Golds',
                href: "store/eshop/golds"
            },
            {
                label: 'Diamonds',
                href: 'store/eshop/diamonds'
            },
            {
                label: 'Labors',
                href: 'store/eshop/labors'
            },
            {
                label: 'Making Charges',
                href: 'store/eshop/making-charges'
            },
            {
                label: 'Wastage Charges',
                href: 'store/eshop/wastage-charges'
            },
            {
                label: 'Add Product',
                href: 'store/eshop/add-product'
            },
            {
                label: 'Discount',
                href: 'store/eshop/discount'
            },
            {
                label: 'Products',
                href: 'store/eshop/products'
            },
            {
                lable: "Discounts",
                href: 'store/eshop/discounts'
            },
            {
                label: 'Orders',
                href: 'store/eshop/orders'
            }
        ]
    }

    return (
        <>
            <aside className='  text-white '>
                <div
                    className={`bg-black overflow-hidden ${close ? "w-[300px]" : "w-[90px]"} transition-all  duration-300 ease-in-out px-10 pt-8 w-[100%] min-h-screen flex flex-col items-center gap-5`}>

                    <div className=' flex flex-col justify-start items-start'>
                        <button
                            className='flex gap-5 justify-start items-start cursor-pointer'
                            onClick={() => setClose(prev => !prev)}>
                            <CgMenuLeftAlt className={`text-[24px] ${close ? "rotate-180 duration-500 " : "rotate-0 duration-500"}`} />
                            {close && <span className=' text-[16px] '>Menu</span>}
                        </button>

                        {/* for first 0 to 9 appearance beacuse of space between */}
                        <div className=' flex flex-col pt-[50px] gap-3'>
                            <div >
                                <Link to="/dashboard">
                                    <button
                                        onClick={() => {
                                            setactive("dashboard"),
                                                setClose(false)
                                        }}
                                        className={`${active == "dashboard" ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                                        <span className=' text-[24px]'><CgProfile /></span>
                                        {close && <span
                                            className='text-[16px] text-nowrap' >
                                            Admin Profile</span>}
                                    </button>
                                </Link>
                            </div>
                            <div >
                                <Link to="dashprofile">
                                    <button
                                        onClick={() => {
                                            setactive("dashprofile"),
                                                setClose(false)
                                        }}
                                        className={`${active == "dashprofile" ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                                        <span className=' text-[24px]'><RxDashboard /></span>
                                        {close && <span
                                            className='text-[16px] text-nowrap' >
                                            Dashboard</span>}
                                    </button>
                                </Link>
                            </div>
                            <div>
                                <div
                                    onClick={() => {
                                        setactive("store_manegement")
                                        setClose(true)
                                    }}
                                    className={`${active == "store_manegement" ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                                    <span className=' text-[24px]'><IoStorefrontSharp /></span>
                                    {close && <span
                                        className='text-[16px] text-nowrap' >
                                        Store Manegement</span>}
                                            
                                </div>
                                <div className={`${(close && active==="store_manegement")?"":"hidden"}  flex flex-col items-end mt-2 ml-8`}>
                                    <div className={`grid grid-cols-2 gap-2 justify-end bg-gray-500 rounded-md`}>
                                        <button  className={`${activeStore==="khwaahish"?"bg-white text-black":""} px-2 py-1 rounded-md transition-all ease-in-out duration-200 cursor-pointer`} onClick={()=>{setActiveStore("khwaahish")}}>Khwaahish</button>
                                        <button  className={`${activeStore==="eshop"?"bg-white text-black":""} px-2 py-1 rounded-md transition-all ease-in-out duration-200 cursor-pointer`} onClick={()=>{setActiveStore("eshop")}}>Eshop</button>
                                    </div>
                                    <div className='w-full flex flex-col gap-1 p-4 border mt-4 rounded-xl border-gray-500'>
                                    {
                                        activeStore && store[activeStore].map((item,i)=>(
                                            <Link  to={item.href} className=' cursor-pointer hover:text-[#EC9D0C]' key={i}>{item.label}</Link>
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                            {menus.slice(0, 9).map((menu, i) => (
                                <div key={i}>
                                    <Link to={menu.href}>
                                        <button
                                            onClick={() => {
                                                setactive(menu.label),
                                                    setClose(false)
                                            }}
                                            className={`${active == menu.label ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                                            <span className=' text-[24px]'>{menu.icon}</span>
                                            {close && <span
                                                className='text-[16px] text-nowrap' >
                                                {menu.label}</span>}
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>


                        {/* for 10 to 11 appearance beacuse of space between */}

                        <div className='flex flex-col justify-start items-start pt-[60px] gap-3'>
                            {menus.slice(9, 12).map((menu, i) => (
                                <div key={i}>
                                    <Link to={menu.href}>
                                        <button
                                            onClick={() => {
                                                setactive(menu.label),
                                                    setClose(false)
                                            }}
                                            className={`${active == menu.label ? "text-[#EC9D0C]" : "text-white"}  flex gap-5 justify-start items-center p-1 hover:text-[#EC9D0C] cursor-pointer`}>
                                            <span className=' text-[24px]'>{menu.icon}</span>
                                            {close && <span
                                                className='text-[16px] text-nowrap' >
                                                {menu.label}</span>}
                                        </button>
                                    </Link>
                                </div>
                            ))}

                        </div>

                    </div>



                </div>
            </aside>


        </>
    )
}

export default Dashboardsidemenu