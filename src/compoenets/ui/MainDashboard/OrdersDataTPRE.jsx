
import React from 'react'

function OrdersDataTPRE() {

    const ordersData = [{
        orderstype: 'Total Orders',
        orderIcon: '/assets/packagedcheckd.png',
        noofOrders: '7,33,940',
    }, {
        orderstype: 'Pending Orders',
        orderIcon: '/assets/packagedPending.png',
        noofOrders: '12,383',
    }, {
        orderstype: 'Total Returns',
        orderIcon: '/assets/packagedreturn.png',
        noofOrders: '1,283',
    }, {
        orderstype: 'Total Exchange',
        orderIcon: '/assets/packagedexchange.png',
        noofOrders: '1,230'
    },
    ]
    return (
        <>
            <div className=' flex justify-between'>
                {ordersData.map((order, i) => (
                    <div key={i} className='w-[100%]'>
                        <div className='flex px-3 py-2.5 shadow-md justify-between rounded-[10px] w-[90%] h-[87px]'>
                            <div className=' flex flex-col gap-5'>
                                <h2 className=' text-[14px]'>{order.orderstype}</h2>
                                <p className=' text-[20px]'>{order.noofOrders}</p>
                            </div>
                            <div>
                                <img src={order.orderIcon} alt='pakagedcheckd' width={40} height={40} />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default OrdersDataTPRE