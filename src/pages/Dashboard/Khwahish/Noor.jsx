import HeroSection from "../../../compoenets/ui/Khwhishcommon/HeroSection"
import HallmarkAndJewel from '../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel';
import Carousel from '../../../compoenets/ui/Khwhishcommon/Carousel';
import AssaiAddImage from "../../../compoenets/ui/Khwhishcommon/AssaiAddImage";


function Noor() {
  return (
    <>
  <div className=' flex flex-col gap-7'>

    <HeroSection/>
    <HallmarkAndJewel/>
    <Carousel/>
    <AssaiAddImage/>
  </div>

    </>
  )
}

export default Noor