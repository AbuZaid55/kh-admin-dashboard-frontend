import React, { useState } from 'react'
import HeaderLogo from '../../compoenets/ui/Layout/HeaderLogo'
import OnOffbutton from '../../compoenets/ui/Khwhishcommon/OnOffbutton'
import Input from '../../compoenets/main/Input';
import Button from '../../compoenets/main/Button';

function Header() {
  const [openclosebutton, setopenclosebutton] = useState(false)
  const [isOn, setIsOn] = useState(true);
  const [Link, setLink] = useState('')

  const handleLocation = (e) => {
    e.preventDefault();
    console.log(Link);
    setLink('')
    
  }
  return (
    <>
      <div className=' flex flex-col gap-3'>
        <HeaderLogo />

        <div>
          <OnOffbutton
            isOn={isOn}
            setIsOn={setIsOn}
            openclosebutton={openclosebutton}
            setopenclosebutton={setopenclosebutton}
            headname='Location'>
            <form action="" onSubmit={handleLocation}>
              <div className="my-4">
                <label className="block text-gray-700 mb-2">Add Link</label>
                <Input
                  type="text"
                  placeholder="Add Link"
                value={Link}
                onChange={(e) => setLink( e.target.value)}
                />
              </div>

              <div className=' flex justify-end gap-[50px] mt-3 '>
                <div className='w-[10%]'>
                  <Button
                    type='reset'
                    className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                    text="Reset" />

                </div>

                <div className='w-[20%]'>
                  <Button text="Save Changes" type='submit' />
                </div>
              </div>
            </form>
          </OnOffbutton>
        </div>
      </div>
    </>
  )
}

export default Header