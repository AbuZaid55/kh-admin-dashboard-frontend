
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Bargraph() {
  let Diamond = [
    { value: 11000, date: "Mon" },
    { value: 21678, date: "Tue" },
    { value: 31342, date: "Wed" },
    { value: 48543, date: "Thurs" },
    { value: 98534, date: "Fri" },
    { value: 43534, date: "sat" },
    { value: 40534, date: "sun" },
  ]
  return (
    <>
      <div className=' w-[100%] h-[350px] rounded-[10px] shadow-md'>
        <ResponsiveContainer width='100%' className='py-2 pb-6' minHeight={200}>
          <BarChart data={Diamond} >
            <XAxis dataKey='date' axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill:"#F3F3F7"}} />
            <Bar dataKey='value' stroke='#EC9D0C' strokeWidth={3} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Bargraph