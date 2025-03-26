"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp,Menu,X } from "lucide-react";
import { useRouter } from 'next/navigation'
import { useMenu } from '../context/MenuContext';


export default function Navbar() {
    const [Userdetails, setUserdetails] = useState({})
    const {  isVisible,toggleVisibility } = useMenu();
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);


    let cleanedUsername = Userdetails?.Username ? Userdetails.Username.replace(/[0-9]/g, '').charAt(0).toUpperCase() : 'G'
    if (cleanedUsername==""){
        cleanedUsername="G"
    }
    useEffect(() => {
        let details = localStorage.getItem("User")
        if (details) {
            details = JSON.parse(details)
            setUserdetails(details)
        }
    }, [])
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleclick=()=>{
        toggleVisibility("")
    }


    return (
        <nav className='h-[9vh] flex items-center justify-between bg-[#071027] text-white md:px-8 px-4 shadow-lg'>
            <h1 className='text-3xl'>AlgoRoot</h1>
            <div>
                <div  className='flex h-full justify-center relative sm:w-[200px] w-[140px] items-center gap-4'>
                    <div onClick={toggleDropdown} className='cursor-pointer flex gap-1'>
                        <span className='text-2xl border-2 border-gray-600 rounded-full py-2 px-4'>{cleanedUsername}</span>
                        <span className='pt-4 text-gray-600'> {isOpen ? <ChevronUp /> : <ChevronDown />}</span>
                    </div>

                    {/* Dropdown Menu */}
                    <div className={`dropdown bg-black text-center flex border p-3 rounded-xl flex-col gap-2 absolute right-[30px] z-10 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 top-[100px]' : 'opacity-0 top-[0px] pointer-events-none'}`}>
                        <span>{Userdetails.Username}</span>
                        <span>{Userdetails.email}</span>

                        {/* Logout Button */}
                        <button className='cursor-pointer text-lg font-semibold bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-700 hover:rounded-lg' onClick={() => {
                            Userdetails.Session = "SignedOut"
                            console.log(Userdetails)
                            localStorage.setItem("User", JSON.stringify(Userdetails));
                            router.push('/')
                        }}>Logout</button>

                        {/* Delete Account Button */}
                        <button className='cursor-pointer text-lg font-semibold bg-red-500 px-2 py-1 rounded-md hover:bg-red-700 hover:rounded-lg' onClick={() => {
                            let ans = prompt("Type 'Delete My Account' to delete your account")
                            if (ans === "Delete My Account") {
                                localStorage.removeItem("User");
                                router.push('/')
                            } else {
                                alert("Incorrect Answer")
                            }

                        }}>Delete Account</button>
                    </div>
                    <span onClick={handleclick} className='md:hidden flex'>{isVisible? <X/>:<Menu/>}</span>
                   
                </div>
            </div>
        </nav>
    );
}
