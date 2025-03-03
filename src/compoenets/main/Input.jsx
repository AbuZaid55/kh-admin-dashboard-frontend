import React from 'react'

function Input( {type , placeholder, ...props}) {
    return (
        <>
            <input
                className="mt-2 block w-full px-3 py-2 border border-gray-300 outline-[#EC9D0C] rounded-md shadow-sm "
                type={type}
                placeholder={placeholder}
                {...props}
            />
            
        </>
    )
}

export default Input