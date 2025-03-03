import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboarduppermenu from '../../compoenets/main/Dashboarduppermenu'
import Dashboardsidemenu from '../../compoenets/main/Dashboardsidemenu'

function Dashboard() {
    return (
        <>
            <div className='flex' >
                <div>
                    <Dashboardsidemenu />

                </div>

                <div className='w-full p-4 h-screen overflow-hidden overflow-y-scroll'>
                    <Dashboarduppermenu />
                    <Outlet />
                </div>

            </div>

        </>
    )
}

export default Dashboard