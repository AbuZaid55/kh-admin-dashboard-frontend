import React, { useState } from 'react';

const SideBar = ( { orderData } ) => {
    const [ activeBtn, setActiveBtn ] = useState( 0 );

    const handleBtnClick = ( index ) => {
        setActiveBtn( index );
        console.log( index );
    };

    const btnArr = [ "Exchanges", "Returns", "Cancelled" ];

    return (
        <div className='w-[35%] bg-white shadow-2xl h-full mx-5 py-6 px-8'>
            <h1 className='text-2xl text-gray-900 text-center mb-5 font-semibold'>Customer Requests</h1>
            <div className='flex gap-2 items-center justify-evenly'>
                { btnArr.map( ( btn, index ) => (
                    <button
                        onClick={ () => handleBtnClick( index ) }
                        key={ index }
                        className={ `px-6 py-2 rounded-full ${ activeBtn === index ? 'bg-[#507CFF1C] text-[#6B6B6B]' : 'bg-[#E6E6E64A] text-[#6B6B6B]' } cursor-pointer` }
                    >
                        { btn }
                    </button>
                ) ) }
            </div>
            <div className='flex flex-col'>
                { Array( 3 ).fill().map( ( _, i ) => (
                    <div key={ i } className={ i === 1 ? 'mt-6' : '' }>
                        { i === 0 && <h2 className='text-gray-800 text-lg mt-5 py-4'>{ orderData.orderId }</h2> }
                        { i === 1 && <h3 className='text-gray-800 text-lg mt-5 py-4'>Exchange Requested</h3> }
                        { orderData?.items?.map( ( item, index ) => (
                            <div key={ index } className='flex flex-col'>
                                <div className='flex h-full '>
                                    <img src={ item.imgUrl } alt="img" className=' w-[50%]' />
                                    <div className='flex flex-col px-4'>
                                        <p className='text-gray-700 text-md'>{ item.name }</p>
                                        <p className='text-[#00000080]'>{ item.description }</p>
                                        <p className='mt-4 text-md text-[#EC9D0C] '>{ item.price }</p>
                                    </div>
                                </div>
                                { ( i === 1 || i === 2 ) && (
                                    <button
                                        onClick={ () => console.log( "btn clicked" ) }
                                        className='mt-3 px-3 py-2 mb-9 rounded-md bg-[#CAEEDA66] text-[#14B45C] text-sm self-start'>
                                        Process { btnArr[ i ] }
                                    </button>
                                ) }
                            </div>
                        ) ) }
                    </div>
                ) ) }
            </div>
        </div>
    );
};

export default SideBar;
