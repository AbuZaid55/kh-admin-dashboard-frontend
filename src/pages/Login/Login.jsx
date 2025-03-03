import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import Input from '../../compoenets/main/Input';
import Button from '../../compoenets/main/Button';


function Login() {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()

  // handel login form after click on submit button
  const handelloginform = (e) => {
    e.preventDefault()
    console.log(email, password)
    navigate('/dashboard')
    setemail('')
    setpassword('')
  }

  return (
    <>
      <div className=" w-[100%] min-h-screen flex flex-col justify-center items-center">
        <div className="w-[80%] md:w-[600px] p-8 rounded-md shadow-xl">
          <h2 className="md:text-2xl text-[14px] uppercase text-center w-[100%]">
            <span className=" pb-2 inline-block border-b-[3px] w-[40%]">Login</span>
          </h2>

          {/* Login in to your account form */}

          <form onSubmit={handelloginform}>
            <div className="mt-[40px] mb-[10px] flex flex-col gap-5 text-[14px] md:text-[20px]">

              <Input type='email' placeholder='email'
                value={email}
                onChange={(e) => setemail(e.target.value)} />

              <Input type='password' placeholder='password'
                value={password}
                onChange={(e) => setpassword(e.target.value)} />

              <div className=" text-[15px]">
                <Link to='reset-password'
                  className=" hover:text-[#EC9D0C] hover:border-[#EC9D0C] text-gray-400 pb-1 border-b-2 border-gray-400">forget your password ?
                </Link>
              </div>

              <Button type="submit" text="Login" />


            </div>
          </form>
          <div className=" text-[15px] text-center">
            <Link to='sign-up'
              className=" hover:text-[#EC9D0C] hover:border-[#EC9D0C] text-gray-400 pb-1 border-b-2 border-gray-400">
              Create an account</Link>
          </div>

        </div>

      </div>
    </>
  )
}

export default Login