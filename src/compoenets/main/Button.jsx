
import React from 'react'


function Button({ text, type = 'button', className = 'w-[100%] bg-[#EC9D0C] border-[#EC9D0C] hover:bg-transparent hover:text-[#EC9D0C] ', ...props }) {
    return (
        <>

            <button
                type={type}
                className={` py-2 text-white uppercase border-2 rounded-md cursor-pointer  transition-colors duration-200 ease-in-out ${className} `}
                {...props}
            > {text}</button>

        </>
    )
}

export default Button