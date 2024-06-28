import React from 'react'
import { UserAvatar } from './BlogCard'
import { Link } from 'react-router-dom'

const NavbarBar = () => {
  return (
    <div className='px-10 py-4 flex justify-between items-center border-b-2'>
        <Link to="/blogs">
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Medium_%28website%29_logo.svg/2560px-Medium_%28website%29_logo.svg.png"
            className='h-[28px]'
            />
        </Link>
        
        <div className='flex gap-8 items-center'>
             <Link to="/publish">
                <button type="button" 
                 className="text-lg font-medium">
                    + New Blog
                </button>
             </Link>
            <UserAvatar name={"Nilesh"} size='large'/>
        </div>
    </div>
  )
}

export default NavbarBar