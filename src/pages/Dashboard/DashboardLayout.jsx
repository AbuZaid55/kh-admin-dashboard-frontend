import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboarduppermenu from '../../compoenets/main/Dashboarduppermenu'
import Dashboardsidemenu from '../../compoenets/main/Dashboardsidemenu'

function Dashboard() {
    return (
        <>
            <div className=' flex gap-5 w-full h-[100%] relative mx-auto items-center' >
                <div className=' fixed top-0 z-50 w-[50px]'>
                    <div>
                        <Dashboardsidemenu /> {/* sidebar layout menu */}
                        
                    </div>
                </div>
                <div className=' flex flex-col gap-5 pb-4 pt-5 w-[100%] pl-[100px] pr-10'>
                    <Dashboarduppermenu />  {/* Uppar layout menu */}
                    <Outlet />
                </div>

            </div>

        </>
    )
}

export default Dashboard