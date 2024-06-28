import React from 'react'
import { formatDate } from '../utils/dateFormatter'


interface blogInput {
    authorName : string,
    title :  string,
    content : string,
    publishedDate : string
}

const BlogCard = ({authorName, title, content , publishedDate}: blogInput) => {
  return (
    <div className='p-2 pb-10 border-b-2'>
        <div className='flex items-center'>
            <div className='flex items-center gap-2'>
              <UserAvatar name={authorName} size='small'/>
              <div className='font-medium text-lg capitalize'>{authorName} </div>
            </div>
            <div className='font-medium text-gray-600 ml-2'> . {formatDate(publishedDate)}</div>
        </div>
        <div className='mt-4'>
            <h2 className='text-2xl font-semibold'>{title}</h2>
            <p className='mt-2 text-lg'>{content.slice(0, 200)}...</p>
        </div>

        <div className='mt-4 bg-[#F2F2F2] rounded-full py-1 px-5 w-fit'>{Math.ceil(content.length/100)} min read</div>
    </div>
  )
}

export function UserAvatar({name, size} : {name:string, size: string
}) {
    return (
        <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-8 h-8" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">{name[0]}</span>
        </div>
    )
}

export default BlogCard