import React, { useState } from 'react'
import DesireSection from '../../../compoenets/ui/Artical/Ourstory/DesireSection'
import OurLogoSelection from '../../../compoenets/ui/Artical/Ourstory/OurLogoSelection'
import OurValues from '../../../compoenets/ui/Artical/Ourstory/OurValues'

import OurPromoters from '../../../compoenets/ui/Artical/Ourstory/OurPromoters';

function OurStory() {


  return (
    <>
      <div className=' flex flex-col gap-3'>
        <DesireSection />
        <OurLogoSelection />
        <OurValues />
        <OurPromoters/>
      </div>
    </>
  )
}

export default OurStory