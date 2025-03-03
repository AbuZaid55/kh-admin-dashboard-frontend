
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../compoenets/main/Input';
import Button from '../../compoenets/main/Button';
import { useState } from 'react';

function SignUp() {
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()

  // handel sign form after click on submit button
  const handelsignorm = (e) => {
    e.preventDefault()
    console.log(firstname, password, lastname, email)
    navigate('/dashboard')
    setfirstname('')
    setpassword('')
    setlastname('')
    setemail('')
  }
  return (
    <>
      <div className=" w-[100%] min-h-screen flex flex-col justify-center items-center">
        <div className="w-[80%] md:w-[600px] p-8 rounded-md shadow-xl">
          <h2 className="md:text-2xl text-[14px] uppercase text-center w-[100%]">
            <span className=" pb-2 inline-block border-b-[3px] w-[40%]">Sign Up</span>
          </h2>

          {/* sign in to your account form */}

          <form onSubmit={handelsignorm}>
            <div className="mt-[40px] mb-[10px] flex flex-col gap-5 text-[14px] md:text-[18px]">

              <Input type='text' placeholder='First Name' 
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              />

              <Input type='text' placeholder='Last Name'
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              />

              <Input type='email' placeholder='Email' 
              value={email}
              onChange={(e) => setemail(e.target.value)}
              />

              <Input type='password' placeholder='Password' 
              value={password}
              onChange={(e) => setpassword(e.target.value)}  />
              
              <Button type="submit" text="Sign up" />


            </div>
          </form>
          <div className=' text-[14px] text-center flex justify-center'>
            Already have an account? <Link to="/"><p className='underline hover:text-[#EC9D0C]'>Login</p></Link>

          </div>

        </div>

      </div>
    </>
  )
}

export default SignUp