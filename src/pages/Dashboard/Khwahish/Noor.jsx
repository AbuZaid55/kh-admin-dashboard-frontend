import HeroSection from "../../../compoenets/ui/Khwhishcommon/HeroSection"
import HallmarkAndJewel from '../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel';
import Carousel from '../../../compoenets/ui/Khwhishcommon/Carousel';
import { useState } from "react";
import UploadAddCamp from "../../../compoenets/ui/Khwhishcommon/UploadAddCamp";
import KhwPromise from "../../../compoenets/ui/Khwhishcommon/KhwPromise";


function Noor() {
  //  for Hero Section
  const [formdataHeroSection, setformdataHeroSection] = useState({
    title: '',
    description: '',
    mobilebanner: '',
    desktopbanner: '',
  })
  const handleformHeroSection = (e) => {
    e.preventDefault();
    console.log(formdataHeroSection, "noor");
    setformdataHeroSection({
      title: '',
      description: '',
      mobilebanner: '',
      desktopbanner: '',
    })
  }


  //  for Carousel

  const [slides, setslides] = useState([])
  const [editSlideIndex, seteditSlideIndex] = useState(null)

  const [formdataCarousel, setformdataCarousel] = useState({
    Category_Name: '',
    Collection_Name: '',
    Subtitle: '',
    Explore_more: '',
    Description: '',
    img: '',
  })

  const handleformCarousel = (e) => {
    e.preventDefault();
    console.log(formdataCarousel, "noor");
    if (editSlideIndex !== null) {
      const updatedSlides = slides.map((slide, index) =>
        index === editSlideIndex ? formdataCarousel : slide,
      );
      setslides(updatedSlides);
      seteditSlideIndex(null);
    } else {
      setslides([...slides, formdataCarousel]);
    }
    setformdataCarousel({
      Category_Name: '',
      Collection_Name: '',
      Subtitle: '',
      Explore_more: '',
      Description: '',
      img: '',
    })
  }

  // Add Campaign
  const [VideoAddCamp, setVideoAddCamp] = useState(null)
  const hadleformAddCamp = (e) => {
    e.preventDefault();
    if (VideoAddCamp) {
      console.log(VideoAddCamp);
    }
    setVideoAddCamp(null)
  }

  // for khwahish promise
  const [formdataKhwPromise, setformdataKhwPromise] = useState({
    tittle: '',
    description: '',
    img: '',
  })

  const handleformKhwPromise = (e) => {
    e.preventDefault();
    console.log(formdataKhwPromise);
    setformdataKhwPromise({
      tittle: '',
      description: '',
      img: '',
    })
  }

  //  for Hallmark and Jewel
  const [formdataHallmarkAndJewel, setformdataHallmarkAndJewel] = useState({
    description: '',
    images: [],
  })
  const handleformHallmarkAndJewel = (e) => {
    e.preventDefault();
    console.log(formdataHallmarkAndJewel, "kha-homepage");
    setformdataHallmarkAndJewel({
      description: '',
      images: [],
    })
  }


  return (
    <>
      <div className=' flex flex-col gap-2'>

        <HeroSection formdata={formdataHeroSection} setformdata={setformdataHeroSection} handleform={handleformHeroSection} />
        <Carousel formdata={formdataCarousel} setformdata={setformdataCarousel} handleform={handleformCarousel}
          slides={slides} setslides={setslides} seteditSlideIndex={seteditSlideIndex}
        />
        <UploadAddCamp Video={VideoAddCamp} setVideo={setVideoAddCamp} hadleform={hadleformAddCamp} />
        
        <KhwPromise formdata={formdataKhwPromise} setformdata={setformdataKhwPromise} handleform={handleformKhwPromise}
          headname='The Khwaahish Promise'
        />
        <HallmarkAndJewel formdata={formdataHallmarkAndJewel} setformdata={setformdataHallmarkAndJewel} handleform={handleformHallmarkAndJewel} tittle='Hallmarks' />

      </div>

    </>
  )
}

export default Noor