import React, { useState } from 'react'
import { CiSquareChevDown } from 'react-icons/ci'

function OnOffbutton({ openclosebutton,setopenclosebutton, children,isOn,setIsOn,headname }) {
    
    return (
        <>
            <div className={`p-6 shadow-md rounded-md ${openclosebutton ? 'min-h-[400px]' : 'h-[70px]'} overflow-hidden flex flex-col transition-transform duration-500 `} >
                {/* drop down button*/}
                <div className='flex justify-between'>
                    <button
                        onClick={() => setopenclosebutton(!openclosebutton)}
                        className={`flex items-center gap-2 text-[16px] font-semibold cursor-pointer ${!isOn ? "cursor-not-allowed opacity-40 " : ""}`}
                        disabled={!isOn}
                    >
                        <h1 className={`${!isOn ? "line-through" : ""}`} >{headname}</h1>
                        <CiSquareChevDown />
                    </button>

                    <div
                        className={`w-20 h-9 flex items-center rounded-[10px] p-3 cursor-pointer transition-all duration-500 ease-in-out text-white ${isOn ? "bg-yellow-500 justify-end" : "bg-gray-700 justify-start"}`}
                        onClick={() => {
                            setIsOn(!isOn),
                                !isOn ? null : setopenclosebutton(false)
                        }}>
                        {isOn ? "ON" : "OFF"}
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}

export default OnOffbutton