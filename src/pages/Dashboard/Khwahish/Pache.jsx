import React, { useState } from 'react'
import HeroSection from '../../../compoenets/ui/Khwhishcommon/HeroSection';
import KhwPromise from '../../../compoenets/ui/Khwhishcommon/KhwPromise';
import HallmarkAndJewel from '../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel';
import UploadAddCamp from '../../../compoenets/ui/Khwhishcommon/UploadAddCamp';

function Pache() {
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

  // for Pache Collection
  const [formdataKhwPromise, setformdataKhwPromise] = useState({
    tittle: '',
    description: '',
    img: '',
  })

  const handleformKhwPromise = (e) => {
    e.preventDefault();
    console.log(formdataKhwPromise, "promise");
    setformdataKhwPromise({
      tittle: '',
      description: '',
      img: '',
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


  // Add Campaign
  const [VideoAddCamp, setVideoAddCamp] = useState(null)
  const hadleformAddCamp = (e) => {
    e.preventDefault();
    if (VideoAddCamp) {
      console.log(VideoAddCamp);
    }
    setVideoAddCamp(null)
  }

  //  for Categories
  const [formdataCategories, setformdataCategories] = useState({
    description: '',
    images: [],
  })
  const handleformCategories = (e) => {
    e.preventDefault();
    console.log(formdataCategories, "kha-homepage");
    setformdataCategories({
      description: '',
      images: [],
    })
  }

  // for The Khwaahish Promise
  const [formdataPache, setformdataPache] = useState({
    tittle: '',
    description: '',
    img: '',
  })

  const handleformPache = (e) => {
    e.preventDefault();
    console.log(formdataPache, "The Khwaahish Promise");
    setformdataPache({
      tittle: '',
      description: '',
      img: '',
    })
  }

  //  for Hallmarks
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
    <>
      <div className='flex flex-col gap-2'>
        <HeroSection formdata={formdataHeroSection} setformdata={setformdataHeroSection} handleform={handleformHeroSection} />

        <KhwPromise formdata={formdataKhwPromise} setformdata={setformdataKhwPromise} handleform={handleformKhwPromise}
          headname='Pache Collection'
        />

        <HallmarkAndJewel formdata={formdataHallmarkAndJewel} setformdata={setformdataHallmarkAndJewel} handleform={handleformHallmarkAndJewel} tittle='Jewels at glance' />

        <UploadAddCamp Video={VideoAddCamp} setVideo={setVideoAddCamp} hadleform={hadleformAddCamp} />

        <HallmarkAndJewel formdata={formdataCategories} setformdata={setformdataCategories} handleform={handleformCategories} tittle='Categories' />

        <KhwPromise formdata={formdataPache} setformdata={setformdataPache} handleform={handleformPache}
          headname='The Khwaahish Promise'
        />

        <HallmarkAndJewel formdata={formdataHallmarks} setformdata={setformdataHallmarks} handleform={handleformHallmarks} tittle='Hallmarks' />

      </div>
    </>
  )
}

export default Pache