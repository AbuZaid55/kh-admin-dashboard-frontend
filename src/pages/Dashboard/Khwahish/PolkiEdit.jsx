import React, { useState } from 'react'
import HeroSection from '../../../compoenets/ui/Khwhishcommon/HeroSection'
import HallmarkAndJewel from '../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel'
import UploadAddCamp from '../../../compoenets/ui/Khwhishcommon/UploadAddCamp'
import KhwPromise from '../../../compoenets/ui/Khwhishcommon/KhwPromise'

function PolkiEdit() {
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


  //  for Jewels at glance
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

  // for Style edit
  const [formdataStyle, setformdataStyle] = useState({
    tittle: '',
    description: '',
    img: '',
  })

  const handleformStyle = (e) => {
    e.preventDefault();
    console.log(formdataStyle);
    setformdataStyle({
      tittle: '',
      description: '',
      img: '',
    })
  }

  // for Curators
  const [formdataCurators, setformdataCurators] = useState({
    tittle: '',
    description: '',
    img: '',
  })

  const handleformCurators = (e) => {
    e.preventDefault();
    console.log(formdataCurators);
    setformdataCurators({
      tittle: '',
      description: '',
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

  //  for Hallmark 
  const [formdataHallmarks, setformdataHallmarks] = useState({
    description: '',
    images: [],
  })
  const handleformHallmarks = (e) => {
    e.preventDefault();
    console.log(formdataHallmarks, "kha-homepage");
    setformdataHallmarks({
      description: '',
      images: [],
    })
  }


  return (
    <div className=' flex flex-col gap-2'>
      <HeroSection formdata={formdataHeroSection} setformdata={setformdataHeroSection} handleform={handleformHeroSection} />

      <HallmarkAndJewel formdata={formdataHallmarkAndJewel} setformdata={setformdataHallmarkAndJewel} handleform={handleformHallmarkAndJewel} tittle='Jewels at glance' />

      <KhwPromise formdata={formdataStyle} setformdata={setformdataStyle} handleform={handleformStyle}
        headname='Style edit'
      />

      <KhwPromise formdata={formdataCurators} setformdata={setformdataCurators} handleform={handleformCurators}
        headname='Curators'
      />


      <UploadAddCamp Video={VideoAddCamp} setVideo={setVideoAddCamp} hadleform={hadleformAddCamp} />

      <KhwPromise formdata={formdataKhwPromise} setformdata={setformdataKhwPromise} handleform={handleformKhwPromise}
        headname='The Khwaahish Promise'
      />
      <HallmarkAndJewel formdata={formdataHallmarks} setformdata={setformdataHallmarks} handleform={handleformHallmarks} tittle='Hallmarks' />

    </div>
  )
}

export default PolkiEdit