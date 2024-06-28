import React, { useEffect, useState } from 'react'
import NavbarBar from '../components/NavbarBar'
import { UserAvatar } from '../components/BlogCard'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const BACKEND_URL = "http://localhost:8787/api/v1"
import { formatDate } from '../utils/dateFormatter'


export interface Blog {
  id: string
  author: {
      _id: string,
      name : string
  };
  title: string;
  content: string;
  publishedDate: string; // Assuming publishedDate is a string in "YYYY-MM-DD" format
}


const Blog = () => {
  const [loading , setLoading] = useState(false);
  const {id} = useParams();
  const [blog, setBlog] = useState<Blog>({
    id: '',
    author: {
      _id: '',
      name: ''
    },
    title: '',
    content: '',
    publishedDate: ''
  })

  const getBlogDetails = async () => {
    try{
        setLoading(true);

        const res = await axios.get(`${BACKEND_URL}/blog/get/${id}`,
          {
              headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
          }
        )

        setBlog(res.data);
    }
    catch(err)
    {
      console.log("error while fetching the blog details");
      console.error(err);
    }
    setLoading(false);

  }

  useEffect(() => {
      getBlogDetails()
  }, [])


  if(loading){
    return(
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='text-3xl font-semibold'>
                Loading...
            </div>
        </div>
    )
  }

  return (
    <div>
      <NavbarBar/>
      <div className='mt-10 w-[90%] mx-auto flex gap-10 '>
        <div className='w-[70%]'>
          <h2 className='text-4xl font-bold'>{blog.title}</h2>
          <p className='font-medium text-gray-700 text-lg'>Posted on {formatDate(blog.publishedDate)}</p>
          <p className='mt-5 text-xl'>{blog.content}</p>
        </div>

        <div className='border-l-2 px-8 h-fit'>
          <p className='font-medium text-lg'>Author</p>
          <div className='flex items-center mt-3 gap-2'>
             <UserAvatar name="Nilesh" size='8'/>
             <p className='font-medium'>{blog.author.name}</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Blog