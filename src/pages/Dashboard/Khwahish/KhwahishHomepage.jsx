import { useState } from 'react';

import HeroSection from './../../../compoenets/ui/Khwhishcommon/HeroSection';
import HallmarkAndJewel from './../../../compoenets/ui/Khwhishcommon/HallmarkAndJewel';
import Carousel from './../../../compoenets/ui/Khwhishcommon/Carousel';
import Banner from "../../../compoenets/ui/Khwhishcommon/Banner";
import Spotlight from "../../../compoenets/ui/Khwhishcommon/Spotlight";
import CommingSoon from './../../../compoenets/ui/Khwhishcommon/CommingSoon';
import KhwahishStore from "../../../compoenets/ui/Khwhishcommon/KhwahishStore";
import KhwPromise from '../../../compoenets/ui/Khwhishcommon/KhwPromise';
import FAQ from './../../../compoenets/ui/Khwhishcommon/FAQ';

const KhwahishHomepage = () => {
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
    Category_Name: '',
    Collection_Name: '',
    Subtitle: '',
    Explore_more: '',
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
      Category_Name: '',
      Collection_Name: '',
      Subtitle: '',
      Explore_more: '',
      Description: '',
      img: '',
    })
  }


  //  for Banner
  const [formdataBanner, setformdataBanner] = useState({
    Category_Name: '',
    Collection_Name: '',
    Subtitle: '',
    Explore_more: '',
    Description: '',
    img: '',
  })

  const handleformBanner = (e) => {
    e.preventDefault();
    console.log(formdataBanner);

    setformdataBanner({
      Category_Name: '',
      Collection_Name: '',
      Subtitle: '',
      Explore_more: '',
      Description: '',
      img: '',
    })
  }

  //  for Spotlight
  const [video, setVideo] = useState(null);

  const handleformSpotlight = (e) => {
    e.preventDefault();
    if (video) {
      console.log("Video file:", video);

    }
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

  // for comming soon
  const [imagesCommingSoon, setImagesCommingSoon] = useState([]);
  const handleformCommingSoon = (e) => {
    e.preventDefault();
    console.log(imagesCommingSoon, 'soon');
    setImagesCommingSoon([]);

  };

  // for KhwahishStore
  const [formdataKhwahishStore, setformdataKhwahishStore] = useState({
    Location: '',
    Google_map_Link: '',
    description: '',
    img: '',
  })

  const handleformKhwahishStore = (e) => {
    e.preventDefault();
    console.log(formdataKhwahishStore);
    setformdataKhwahishStore({
      Location: '',
      Google_map_Link: '',
      description: '',
      img: '',
    })
  }


  // for category photo upload Browse By Category
  const [imagesByCategory, setImagesByCategory] = useState([]);
  const handleformByCategory = (e) => {
    e.preventDefault();
    console.log(imagesByCategory, 'category');
    setImagesByCategory([]);

  };

  return (
    <>
      <div className=" flex flex-col gap-2">
        <HeroSection formdata={formdataHeroSection} setformdata={setformdataHeroSection} handleform={handleformHeroSection} />

        <HallmarkAndJewel formdata={formdataHallmarkAndJewel} setformdata={setformdataHallmarkAndJewel} handleform={handleformHallmarkAndJewel} tittle='Hallmarks' />

        <Carousel formdata={formdataCarousel} setformdata={setformdataCarousel} handleform={handleformCarousel}
          slides={slides} setslides={setslides} seteditSlideIndex={seteditSlideIndex}
        />

        <Banner formdata={formdataBanner} setformdata={setformdataBanner} handleform={handleformBanner} />

        <Spotlight video={video} setVideo={setVideo} handleform={handleformSpotlight} />

        <KhwPromise formdata={formdataKhwPromise} setformdata={setformdataKhwPromise} handleform={handleformKhwPromise}
        headname='The Khwaahish Promise'
        />

        <CommingSoon headername='Comming Soon' images={imagesCommingSoon} setImages={setImagesCommingSoon} handleform={handleformCommingSoon} />

        {/* for category photo upload Browse By Category */}
        <KhwahishStore formdata={formdataKhwahishStore} setformdata={setformdataKhwahishStore} handleform={handleformKhwahishStore} />

        <CommingSoon headername='Browse By Category' images={imagesByCategory} setImages={setImagesByCategory} handleform={handleformByCategory} />

        <FAQ />
      </div>
    </>
  );
};

export default KhwahishHomepage;
