import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import Input from '../../compoenets/main/Input'
import Button from '../../compoenets/main/Button'

function ResetPassword() {
  const [email, setemail] = useState('')
  const navigate = useNavigate()


  const handlereserpassword = (e) => {
    e.preventDefault()
    console.log('Email sent for password reset:', email)
    setemail('')
    navigate('/dashboard') 
  }
  return (
    <>
    <div className=" w-[100%] min-h-screen flex flex-col justify-center items-center">
        <div className="w-[80%] md:w-[600px] p-8 rounded-md shadow-xl">
          <h2 className="md:text-xl uppercase text-center w-[100%]">
            <span className=" pb-2 inline-block border-b-[3px] text-nowrap w-[60%]">RESET YOUR PASSWORD</span>
          </h2>


          <form onSubmit={handlereserpassword}>
            <div className="mt-[60px] mb-[10px] flex flex-col gap-5 text-[14px] md:text-[18px]">

              <div>
                <p className=' text-[14px]'>
                  Enter your email address below, and we’ll send you a link to reset it.
                </p>
                <Input type='text' placeholder='Email Address' 
                value={email}
                onChange={(e) => setemail(e.target.value)}  />
                

              </div>

              <Button  type="submit" text="Rest password" />

            </div>
          </form>
          <div className=' text-[14px] text-center flex justify-center'>
            <Link to="/"> Cancel</Link>

          </div>

        </div>

      </div>
    </>
  )
}

export default ResetPassword