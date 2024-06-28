import React, { useState } from 'react'
import NavbarBar from '../components/NavbarBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = "http://localhost:8787/api/v1"


const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const publishNewBlog = async () => {
        if(!title || !content)
        {
            alert("Please Enter the title and content")
            return;
        }
        try{
            setLoading(true)
            await axios.post(`${BACKEND_URL}/blog/create`,{
                    title,
                    content
                },
                {
                    headers : {
                      Authorization : `Bearer ${localStorage.getItem("token")}`
                  }
                }
            )
        }
        catch(err)
        {   
            console.log("Error while publishing a new blog")
            console.error(err);
        }
        setLoading(false);
        navigate("/blogs");
    }

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
        <div className="flex flex-col items-start p-10 rounded-md h-full">
            <div className="flex flex-col items-center mb-5 w-[80%] mx-auto ">
                <div className="flex flex-col ml-4  w-full">
                    <textarea
                    required
                    className="text-4xl font-bold border-none outline-none placeholder-gray-400 w-full"
                    placeholder="Title"
                    rows={3}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                    required
                    className="mt-2 text-2xl border-none outline-none placeholder-gray-400"
                    placeholder="Tell your story..."
                    rows={15}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button
                  onClick={publishNewBlog}
                  className="focus:outline-none mt-12 text-white  bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700">
                    Publish
                </button>
            </div>
        </div>
      </div>
    );
}

export default NewBlog