import React, { useState } from 'react'
import HeroSection from '../../../compoenets/ui/Khwhishcommon/HeroSection'
import AssaiAddImage from './../../../compoenets/ui/Khwhishcommon/AssaiAddImage';
import UploadAddCamp from '../../../compoenets/ui/Khwhishcommon/UploadAddCamp';
import KhwPromise from '../../../compoenets/ui/Khwhishcommon/KhwPromise';
import HallmarkAndJewel from '../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel';

function Asai() {
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
        <AssaiAddImage />
        <UploadAddCamp Video={VideoAddCamp} setVideo={setVideoAddCamp} hadleform={hadleformAddCamp} />
        <KhwPromise formdata={formdataKhwPromise} setformdata={setformdataKhwPromise} handleform={handleformKhwPromise} 
        headname='The Khwaahish Promise'
        />
        <HallmarkAndJewel formdata={formdataHallmarkAndJewel} setformdata={setformdataHallmarkAndJewel} handleform={handleformHallmarkAndJewel} tittle='Hallmarks' />

      </div>
    </>
  )
}

export default Asai