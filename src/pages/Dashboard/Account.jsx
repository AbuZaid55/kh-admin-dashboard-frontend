import React from 'react'
import Profile from '../../compoenets/ui/AdminAccount/Profile'
import Addresess from '../../compoenets/ui/AdminAccount/Addresess'

function Account() {
  return (
    <>
      <div className=' shadow-md rounded-[10px] p-4 '>
        <Profile/>
        <Addresess/>
      </div>
    </>
  )
}

export default Account