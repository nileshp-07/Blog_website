import React from 'react'
import SignupForm from '../components/SignupForm'
import Quotes from '../components/Quotes'

const Signup = () => {
  return (
    <div className='flex h-full'>
        <SignupForm type ="signup"/>
        <Quotes/>
    </div>
  )
}

export default Signup