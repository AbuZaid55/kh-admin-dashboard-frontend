import Bargraph from "../../compoenets/ui/MainDashboard/Bargraph"
import LineGraph from "../../compoenets/ui/MainDashboard/LineGraph"
import OrdersDataTPRE from "../../compoenets/ui/MainDashboard/OrdersDataTPRE"
import SchecdulWhatsappCall from "../../compoenets/ui/MainDashboard/SchecdulWhatsappCall"
import TopProduct from "../../compoenets/ui/MainDashboard/TopProduct"


function MainDashboard() {
  return (
    <>

      <div className=' w-full h-full p-3 flex flex-col gap-5'>

        {/* total order/pending etc */}
        <OrdersDataTPRE />
        <div className="flex justify-between w-[100%] gap-5">
          <div className="w-[57%] flex flex-col gap-4">

            {/* graphs */}
            <LineGraph />
            <Bargraph />

          </div>
          <div className="flex flex-col w-[42%] gap-5">
            <SchecdulWhatsappCall />
            
            {/* top product */}
            <TopProduct />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainDashboard