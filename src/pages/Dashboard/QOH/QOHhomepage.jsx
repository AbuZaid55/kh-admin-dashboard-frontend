import React, { useState } from 'react'
import HeroSection from './../../../compoenets/ui/Khwhishcommon/HeroSection';
import HallmarkAndJewel from '../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel';
import Carousel from '../../../compoenets/ui/Khwhishcommon/Carousel';
import BrandImages from '../../../compoenets/ui/QOHpagecomp/BrandImages';
import Galleria from '../../../compoenets/ui/QOHpagecomp/Galleria';
import CarouselQOH from '../../../compoenets/ui/QOHpagecomp/CarouselQOH';

function QOHhomepage() {

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
      <div className=' flex flex-col gap-2'>
        <HeroSection formdata={formdataHeroSection} setformdata={setformdataHeroSection} handleform={handleformHeroSection} />

        <HallmarkAndJewel formdata={formdataHallmarkAndJewel} setformdata={setformdataHallmarkAndJewel} handleform={handleformHallmarkAndJewel} tittle='Hallmarks' />
        
        <BrandImages/>


        <CarouselQOH formdata={formdataCarousel} setformdata={setformdataCarousel} handleform={handleformCarousel}
          slides={slides} setslides={setslides} seteditSlideIndex={seteditSlideIndex}/>
        <Galleria/>

      </div>
    </>
  )
}

export default QOHhomepage