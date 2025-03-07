import React, { useState } from 'react'
import HeroSection from '../../../compoenets/ui/Khwhishcommon/HeroSection'
import HallmarkAndJewel from '../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel'
import UploadAddCamp from './../../../compoenets/ui/Khwhishcommon/UploadAddCamp';
import Carousel from '../../../compoenets/ui/Khwhishcommon/Carousel';
import Description from '../../../compoenets/ui/QOHpagecomp/Description';
import CarouselQOH from '../../../compoenets/ui/QOHpagecomp/CarouselQOH';

function Fazza() {

  //  for Hero Section
  const [formdataHeroSection, setformdataHeroSection] = useState({
    title: '',
    description: '',
    mobilebanner: '',
    desktopbanner: '',
  })
  const handleformHeroSection = (e) => {
    e.preventDefault();
    console.log(formdataHeroSection, "kha-homepage");
    setformdataHeroSection({
      title: '',
      description: '',
      mobilebanner: '',
      desktopbanner: '',
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

  //  for Description
  const [formdataDescription, setformdataDescription] = useState({
    tittle: '',
    Description: '',
  })

  const handleformDescription = (e) => {
    e.preventDefault();
    console.log(formdataDescription);
    setformdataDescription({
      tittle: '',
      Description: '',
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

  //  for Hallmark
  const [formdataHallmark, setformdataHallmark] = useState({
    description: '',
    images: [],
  })
  const handleformHallmark = (e) => {
    e.preventDefault();
    console.log(formdataHallmark, "kha-homepage");
    setformdataHallmark({
      description: '',
      images: [],
    })
  }

  //  for Carousel
  const [slides, setslides] = useState([])
  const [editSlideIndex, seteditSlideIndex] = useState(null)

  const [formdataCarousel, setformdataCarousel] = useState({
    title: '',
    Description: '',
    img: '',
  })

  const handleformCarousel = (e) => {
    e.preventDefault();
    console.log(formdataCarousel, "kha-homepage");
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
      title: '',
      Description: '',
      img: '',
    })
  }


  return (
    <>
      <div className=" flex flex-col gap-2">
        <HeroSection formdata={formdataHeroSection} setformdata={setformdataHeroSection} handleform={handleformHeroSection} />

        <HallmarkAndJewel formdata={formdataHallmarkAndJewel} setformdata={setformdataHallmarkAndJewel} handleform={handleformHallmarkAndJewel} tittle='Jewels at glance' />

        <UploadAddCamp Video={VideoAddCamp} setVideo={setVideoAddCamp} hadleform={hadleformAddCamp} />

        <Description formdata={formdataDescription} setformdata={setformdataDescription} handleform={handleformDescription} />

        <HallmarkAndJewel formdata={formdataHallmark} setformdata={setformdataHallmark} handleform={handleformHallmark} tittle='Hallmark' />

        <CarouselQOH  
        formdata={formdataCarousel} setformdata={setformdataCarousel} handleform={handleformCarousel} slides={slides} setslides={setslides} seteditSlideIndex={seteditSlideIndex}
        />

      </div>
    </>
  )
}

export default Fazza