import { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { LuBellRing } from "react-icons/lu";
import { IoChevronUpOutline } from "react-icons/io5";
import { BsCloudUpload } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';


const inventoryfilter = ['Price', 'Stock', "Category", "Subcategory", "Tags"]
const orderfilter = ["Newest first", "Pending", "Completed"]
const KhwahishpageName = ["Noor", "Asai", "Pache", "BridelEdit", "PolkiEdit", "MakeAwish"]
const NoorpageName = ["Gulz", "Fazza", "Festara"]
const Artical = ["Terms&Conditions", "OurStory", "Blog"]
const Seo = ["DNS", "Customizations"]
const Layout=["Footer","QuickLinks"]

function Dashboarduppermenu() {
  const [filtercompshow, setfiltercompshow] = useState(false)
  const [bulkshow, setbulkshow] = useState(false)
  const [filtertab, setfiltertab] = useState(false)
  const [edithompage, setedithompage] = useState(false)
  const [filterselection, setfilterselection] = useState('')
  const [currentfilter, setcurrentfilter] = useState([])
  const [currentpageName, setcurrentpageName] = useState([])
  const [selectedoption, setselectedoption] = useState('')

  const location = useLocation()
  const navigate = useNavigate()


  // check location for component render on there require and filter data change also
  useEffect(() => {
    if (location.pathname === '/dashboard/inventory') {
      setfiltercompshow(true);
      setbulkshow(true);
      setedithompage(false)
      setcurrentfilter(inventoryfilter)
      setfilterselection('Price')
    } else if (location.pathname === '/dashboard/orders') {
      setfiltercompshow(true);
      setbulkshow(false);
      setedithompage(false)
      setcurrentfilter(orderfilter)
      setfilterselection('Newest first')
    } else if (location.pathname.startsWith('/dashboard/Khwahish')) {
      setedithompage(true)
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(KhwahishpageName)
    } else if (location.pathname.startsWith('/dashboard/queen')) {
      setedithompage(true)
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(NoorpageName)
    } else if (location.pathname.startsWith('/dashboard/artical')) {
      setedithompage(true)
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(Artical)
    } else if (location.pathname.startsWith('/dashboard/seo')) {
      setedithompage(true)
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(Seo)
    } 
    else if (location.pathname.startsWith('/dashboard/layout')) {
      setedithompage(true)
      setfiltercompshow(false);
      setbulkshow(false);
      setcurrentpageName(Layout)
    }
    else {
      setfiltercompshow(false);
      setbulkshow(false);
      setedithompage(false)
    }
  }, [location.pathname]);


  // handle category option input page change 
  const handeloptionchange = (e) => {
    const selectedvaluse = e.target.value;
    setselectedoption(selectedvaluse)
    if (location.pathname.startsWith('/dashboard/Khwahish')) navigate(`/dashboard/Khwahish/${selectedvaluse.toLowerCase()}`)

    if (location.pathname.startsWith('/dashboard/queen')) navigate(`/dashboard/queen/${selectedvaluse.toLowerCase()}`)
    if (location.pathname.startsWith('/dashboard/artical')) navigate(`/dashboard/artical/${selectedvaluse.toLowerCase()}`)
    if (location.pathname.startsWith('/dashboard/seo')) navigate(`/dashboard/seo/${selectedvaluse.toLowerCase()}`)
    if (location.pathname.startsWith('/dashboard/layout')) navigate(`/dashboard/layout/${selectedvaluse.toLowerCase()}`)
  }

  // handle on cking option change for home page and make option selected empty
  const handeloptionhomepageclick = () => {
    setselectedoption('')
    if (location.pathname.startsWith('/dashboard/Khwahish')) navigate(`/dashboard/Khwahish`)
    if (location.pathname.startsWith('/dashboard/queen')) navigate(`/dashboard/queen`)
    if (location.pathname.startsWith('/dashboard/artical')) navigate(`/dashboard/artical`)
    if (location.pathname.startsWith('/dashboard/seo')) navigate(`/dashboard/seo`)
    if (location.pathname.startsWith('/dashboard/layout')) navigate(`/dashboard/layout`)
  }


  // handle on bulk action change
  const renderButtonText = () => {
    if (location.pathname.startsWith('/dashboard/artical')) {
      return "Privacy Policy";
    } else if (location.pathname.startsWith('/dashboard/Khwahish')) {
      return "Edit Khwahish Homepage";
    } else if (location.pathname.startsWith('/dashboard/queen')) {
      return "Edit Queen Homepage";
    } else if (location.pathname.startsWith('/dashboard/seo')) {
      return "SEO Details"
    } else if (location.pathname.startsWith('/dashboard/layout')) {
      return "Header"
    } else {
      return "Edit Homepage";
    }
  };


  return (
    <>
      <div className=' w-full flex gap-10 justify-between items-center  '>

        <div className=' flex gap-[100px] pl-5'>

          {/* filter components only on spacific pages */}
          {filtercompshow &&
            <div className=' relative '>
              <button className='cursor-pointer px-3 py-2 shadow-md rounded-lg flex items-center gap-[90px] hover:bg-gray-100'
                onClick={() => setfiltertab(!filtertab)}>
                <p>Filter By</p>
                <span className={`text-[20px] opacity-60 ${filtertab ? "rotate-0" : "rotate-180"} `}><IoChevronUpOutline /></span>
              </button>

              {filtertab &&
                <div className=' absolute shadow-md rounded-lg px-5 py-2 top-12 z-50 bg-[#FDFDFF] flex flex-col gap-2'>
                  {currentfilter.map((filter, i) =>
                    <button key={i} className='flex justify-between gap-12 items-center cursor-pointer'
                      onClick={() => {
                        setfilterselection(filter),
                          setfiltertab(false)
                      }}>
                      <p>{filter}</p>
                      <p className={`w-[10px] h-[10px] rounded-[100%] ${filter == filterselection ? "bg-red-500" : "bg-gray-500"} `} />
                    </button>
                  )}

                </div>
              }


            </div>}

          {/* bulk upload */}
          {bulkshow && <div className=' px-3 py-2  shadow-md rounded-lg' >
            <label className='flex items-center gap-2 cursor-pointer'>
              <input type="file" className=' hidden w-full h-full' accept="image/*" />
              <p>Bulk upload </p>
              <span><BsCloudUpload /></span></label>
          </div>}


          {/* edit homepage  and edit collection list*/}
          {edithompage &&
            <div className=' flex gap-8 items-center'>
              <button className={` px-3 py-2 shadow-md rounded-lg border-4 cursor-pointer  ${location.pathname === '/dashboard/Khwahish' || location.pathname === "/dashboard/queen" || location.pathname === "/dashboard/artical" || location.pathname === "/dashboard/seo" || location.pathname === "/dashboard/layout" ? 'border-amber-200' : 'border-transparent'}`}
                onClick={handeloptionhomepageclick}
              >
                {renderButtonText()}
              </button>
              <p>Edit Collection</p>

              <div className='' >
                <select name="" id="" className='outline-none text-[15px] p-2 w-[140px] shadow-md rounded-lg cursor-pointer'
                  onChange={handeloptionchange}
                  value={selectedoption}>
                  <option value="" disabled hidden>Select Category</option>
                  {currentpageName.map((page, i) =>
                    <option key={i} value={page}>{page}</option>
                  )}

                </select>
              </div>
            </div>
          }


        </div>


        <div className=' flex gap-10'>
          {/* search button */}
          <div
            className=' rounded-xl w-[300px] bg-[#FDFDFF] flex justify-start items-center gap-4 shadow-md py-3 px-6 '>
            <span className=' w-[5%]'><IoSearchOutline /></span>
            <input
              type="search"
              className='outline-none focus:outline-none text-[14px] w-[90%]'
              placeholder="Search for anything" />
          </div>

          <div className='flex justify-center items-center gap-5 ml-5'>
            <LuBellRing className=' text-[24px]' />
          </div>
        </div>



      </div>
    </>
  )
}

export default Dashboarduppermenu