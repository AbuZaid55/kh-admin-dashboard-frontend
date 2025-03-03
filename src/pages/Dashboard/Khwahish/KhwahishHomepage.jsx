
import HeroSection from './../../../compoenets/ui/Khwhishcommon/HeroSection';
import HallmarkAndJewel from './../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel';
import Carousel from './../../../compoenets/ui/Khwhishcommon/Carousel';
import Banner from "../../../compoenets/ui/Khwhishcommon/Banner";
import Spotlight from "../../../compoenets/ui/Khwhishcommon/Spotlight";
import CommingSoon from './../../../compoenets/ui/Khwhishcommon/CommingSoon';
import KhwahishStore from "../../../compoenets/ui/Khwhishcommon/KhwahishStore";

const KhwahishHomepage = () => {


  return (
    <>
      <div className=" flex flex-col gap-2s">
        <HeroSection />
        <HallmarkAndJewel />
        <Carousel />
        <Banner />
        <Spotlight />
        <CommingSoon />
        <KhwahishStore />
      </div>
    </>
  );
};

export default KhwahishHomepage;
