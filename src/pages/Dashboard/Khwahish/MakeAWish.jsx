import React, { useState } from 'react'
import KhwPromise from '../../../compoenets/ui/Khwhishcommon/KhwPromise'
import UploadAddCamp from '../../../compoenets/ui/Khwhishcommon/UploadAddCamp';

function MakeAWish() {

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

  // Add Campaign
  const [VideoAddCamp, setVideoAddCamp] = useState(null)
  const hadleformAddCamp = (e) => {
    e.preventDefault();
    if (VideoAddCamp) {
      console.log(VideoAddCamp);
    }
    setVideoAddCamp(null)
  }


  // for From Sketch To Finish
  const [formdataSketch, setformdataSketch] = useState({
    tittle: '',
    description: '',
    img: '',
  })

  const handleformSketch = (e) => {
    e.preventDefault();
    console.log(formdataSketch);
    setformdataSketch({
      tittle: '',
      description: '',
      img: '',
    })
  }

  // for Make a Wish with Khwaahish
  const [formdataMakeAWish, setformdataMakeAWish] = useState({
    tittle: '',
    description: '',
    img: '',
  })

  const handleformMakeAWish = (e) => {
    e.preventDefault();
    console.log(formdataMakeAWish);
    setformdataMakeAWish({
      tittle: '',
      description: '',
      img: '',
    })
  }
  return (
    <div className=' flex flex-col gap-2'>
      <KhwPromise formdata={formdataKhwPromise} setformdata={setformdataKhwPromise} handleform={handleformKhwPromise}
        headname='Image'
      />

      <UploadAddCamp Video={VideoAddCamp} setVideo={setVideoAddCamp} hadleform={hadleformAddCamp} />

      <KhwPromise formdata={formdataSketch} setformdata={setformdataSketch} handleform={handleformSketch}
        headname='From Sketch To Finish'
      />

      <KhwPromise formdata={formdataMakeAWish} setformdata={setformdataMakeAWish} handleform={handleformMakeAWish}
        headname='Make a Wish with Khwaahish'
      />

    </div>
  )
}

export default MakeAWish