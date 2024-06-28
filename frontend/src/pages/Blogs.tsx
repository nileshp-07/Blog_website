import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import NavbarBar from '../components/NavbarBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
const BACKEND_URL = "http://localhost:8787/api/v1"
 

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
const initialBlogs: Blog[] = []; 
  
const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    

    const fetchAllBlogs = async () => {
        try{
            setLoading(true);
            const res = await axios.get<Blog[]>(`${BACKEND_URL}/blog/all`,{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            setBlogs(res.data);
        }
        catch(err)
        {
            console.log("Error while fetching all the blogs")
            console.error(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchAllBlogs()
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
        <div className='flex flex-col gap-8 w-[80%] px-10 mt-10  mx-auto'>
           <h2 className='text-3xl font-bold'>Blogs For You</h2>
        {
            blogs?.map((blog) => (
                <Link to={`/blog/${blog.id}`} key={blog.id}>
                   <BlogCard
                    authorName={blog?.author?.name}
                    title={blog?.title}
                    content={blog?.content}
                    publishedDate={blog?.publishedDate}
                />
                </Link>
            ))
        }
        </div>
    </div>
  )
}

export default Blogs