import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const BACKEND_URL = " http://localhost:8787/api/v1";

const SignupForm = ({type}: {type : "signin" | "signup"}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : ""
    })


    const changeHandler = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => (
            {
                ...prev,
                [name] : value
            }
        ))
    }


    const submitHandler = async (e:any) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`, formData);
            console.log(response);
            const token = response.data.jwt;
            console.log(token);
            localStorage.setItem("token",token);
            navigate("/blogs")
        }
        catch(err)
        {

        }
    }


  return (
    <div className=' w-[100%] h-screen flex justify-center items-center'>
        <div className='w-[60%]'>
            <h2 className='text-3xl font-bold text-center'>
                {
                    type === "signup" ? "Create Your Account" : "Login into your Account"
                }
            </h2>
            
            <div className='text-center text-gray-600'>
                {
                    type === "signup" ? "Already have an Account" : "Create an account"
                }
                <Link to={type==="signup" ? "/login" : "/signup"}
                     className='underline ml-2'>
                    {
                        type === "signup" ? "Login" : "Signup"
                    }
                </Link>
            </div>

            <div className='mt-8 w-full'>
              <form
               className='w-full'>
                    {
                        type === "signup" && (
                            <LableInputFields 
                                label="name" 
                                placeholder='Enter your name' 
                                name = "name"
                                changeHandler={changeHandler}/>
                        )
                    }

                    <LableInputFields 
                    label = "email" 
                    name = "email"  
                    placeholder='enter your email'
                    changeHandler={changeHandler}
                    />

                    <LableInputFields
                    label = "password"
                    name = "password"
                    placeholder='Enter a password'
                    changeHandler={changeHandler}
                    type = "password"/>

                    <button 
                    onClick={submitHandler}
                    className='py-2 mt-10 w-[calc(100%-17px)] bg-black rounded-md text-white font-medium'>
                        {
                            type === "signup" ? "Create Account" : "Login"
                        }
                    </button>  
              </form>
            </div>

            
        </div>
    </div>
  )
}





interface SignupInputType {
    label : string,
    placeholder : string,
    name : string,
    type ?: string
    changeHandler : (e: React.ChangeEvent<HTMLInputElement>) => void
}




function LableInputFields({label , placeholder,name,type, changeHandler}: SignupInputType)  {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 bg-background text-foreground mt-3">
            <label htmlFor={label} className="font-medium">
             {label}
            </label>
            <input
            type={type || "text"}
            id={label}
            name =  {name}
            placeholder={placeholder}
            onChange={changeHandler}
            className="rounded-md border w-full bg-background px-3 py-2 text-sm shadow-sm "
            />
      </div>
    )
}


export default SignupForm


