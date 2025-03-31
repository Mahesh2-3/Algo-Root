"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitForm } from './context/AuthContext'
import { useRouter } from 'next/navigation'



const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter()
    const [details, setDetails] = useState(null);


    // Fetch user details from localStorage
    useEffect(() => {
        const userDetails = localStorage.getItem("User");
        if (userDetails) {
            const parsedDetails = JSON.parse(userDetails);
            setDetails(parsedDetails);
            if (parsedDetails.Session === "SignedIn") {
                router.push('/details');
            }
        }
        console.log(JSON.parse(userDetails));
    }, []);


    const onSubmit = async (data) => {
        let message = await SubmitForm(data)
        let messageElement = document.querySelector('.message')
        messageElement.innerText = message.message
        messageElement.style.color = message.success ? '#00d26a' : 'red'
        setTimeout(() => {
            messageElement.innerText = ""
            if (message.success) {

                router.push('/details')

            }
        }, 600);
        console.log(data, message)
    }




    return (
        <>
            <div className={`flex  text-white items-center justify-center min-h-screen `}>
                <div className='w-[550px]  flex flex-col justify-center gap-3 items-center  p-6 rounded-lg shadow-lg'>
                    <h1 className='text-3xl w-fit px-8 py-2 border-b-2 font-semibold text-center mb-4'>SignUp</h1>
                    <form className='flex flex-col w-[100%] gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <input className='bg-transparent w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Email" {...register("email", { required: "This field is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address", }, })} />
                        {errors.email && <span className='text-red-600'>{errors.email.message}</span>}

                        <input className='bg-transparent w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder="Password" {...register("password", { required: true, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, message: "Password include uppercase, lowercase, number.", }, minLength: { value: 8, message: "Password must be at least 8 characters long." } })} />
                        {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

                        <input className=' cursor-pointer w-full px-4 py-2 text-xl rounded-md focus:outline-none bg-blue-500' type="submit" />
                        <span className='text-xl message h-[30px]'></span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
