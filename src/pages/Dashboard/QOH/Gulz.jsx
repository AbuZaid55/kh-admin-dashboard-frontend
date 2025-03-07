import React, { useState } from 'react'
import HeroSection from '../../../compoenets/ui/Khwhishcommon/HeroSection'
import HallmarkAndJewel from '../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel'
import Carousel from '../../../compoenets/ui/Khwhishcommon/Carousel'

import KhwPromise from '../../../compoenets/ui/Khwhishcommon/KhwPromise'

import UploadVedio from '../../../compoenets/ui/QOHpagecomp/UploadVedio'
import Eshopbenifits from '../../../compoenets/ui/QOHpagecomp/Eshopbenifits'
import OurRecommendatio from '../../../compoenets/ui/QOHpagecomp/OurRecommendatio'
import BrowseByStyle from '../../../compoenets/ui/QOHpagecomp/BrowseByStyle'
import CarouselQOH from './../../../compoenets/ui/QOHpagecomp/CarouselQOH';

function Gulz() {
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

  // for What’s trending section
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


  return (
    <>
      <div className=' flex flex-col gap-2'>
        <HeroSection formdata={formdataHeroSection} setformdata={setformdataHeroSection} handleform={handleformHeroSection} />

        <HallmarkAndJewel formdata={formdataHallmarkAndJewel} setformdata={setformdataHallmarkAndJewel} handleform={handleformHallmarkAndJewel} tittle='Hallmarks' />

        
        <OurRecommendatio/>
        <BrowseByStyle/>
        <UploadVedio />

        <CarouselQOH  
        formdata={formdataCarousel} setformdata={setformdataCarousel} handleform={handleformCarousel} slides={slides} setslides={setslides} seteditSlideIndex={seteditSlideIndex}
        />

        <KhwPromise formdata={formdataKhwPromise} setformdata={setformdataKhwPromise} handleform={handleformKhwPromise}
          headname='What’s trending section'
        />
        <Eshopbenifits/>

      </div>
    </>
  )
}

export default Gulz