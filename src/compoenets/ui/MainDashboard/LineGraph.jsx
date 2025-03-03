
import React, { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// this is for custom element while hover the map 
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip px-4 py-1 border border-[#EC9D0C] rounded-[20px]">
        <p className="label text-[16px]">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}


function LineGraph() {




  let Gold_Rate = [
    { value: 57000, date: "Mon" },
    { value: 55678, date: "Tue" },
    { value: 33342, date: "Wed" },
    { value: 67543, date: "Thurs" },
    { value: 32534, date: "Fri" },
    { value: 39534, date: "sat" },
    { value: 22534, date: "sun" },
  ]


  let Gem_Rate = [
    { value: 23000, date: "Mon" },
    { value: 67678, date: "Tue" },
    { value: 56342, date: "Wed" },
    { value: 32543, date: "Thurs" },
    { value: 39534, date: "Fri" },
    { value: 76534, date: "sat" },
    { value: 22534, date: "sun" },
  ]

  let Silver_Rate = [
    { value: 51000, date: "Mon" },
    { value: 22678, date: "Tue" },
    { value: 44342, date: "Wed" },
    { value: 87543, date: "Thurs" },
    { value: 13534, date: "Fri" },
    { value: 86534, date: "sat" },
    { value: 32534, date: "sun" },
  ]

  let Diamond = [
    { value: 11000, date: "Mon" },
    { value: 21678, date: "Tue" },
    { value: 31342, date: "Wed" },
    { value: 48543, date: "Thurs" },
    { value: 98534, date: "Fri" },
    { value: 43534, date: "sat" },
    { value: 40534, date: "sun" },
  ]
  let Rates = [Gold_Rate, Gem_Rate, Silver_Rate, Diamond]
  let Rates2 = ['Gold_Rate', 'Gem_Rate', 'Silver_Rate', 'Diamond']

  const [Datatograph, setDatatograph] = useState(Gold_Rate)
  return (
    <>
      <div className=' w-[100%] h-[350px] rounded-[10px] shadow-md p-4 overflow-hidden'>
        <div className=' flex justify-between items-center'>
          <h1 className=' mb-4'>Today price</h1>
          <div className=' flex gap-3 text-white'>

            {/* this is for data change on graphs */}
            {Rates.map((rate, i) => (
              <button key={i} onClick={() => setDatatograph(rate)}
                className={` ${Datatograph === rate?"bg-black":"bg-[#EC9D0C]"} px-2 py-1 rounded-[8px] border `} >{Rates2[i]}</button>
            ))}

          </div>

        </div>
        <ResponsiveContainer width='100%' className='py-2 pb-6' minHeight={200}>
          <LineChart data={Datatograph} >
            <XAxis dataKey='date' axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ stroke:'#F3F3F7' ,strokeWidth: 2}} content={<CustomTooltip />} />
            <Line dot={false} dataKey='value' stroke='#EC9D0C' strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default LineGraph