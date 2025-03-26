"use client"
import React from 'react'
import Navbar from '../Components/Navbar'
import { ChevronRight } from "lucide-react";
import mockData from './mockData.json'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
import "./details.css"

const Page = () => {
  const [mockdata, setmockdata] = useState([])
  const [Empty, setEmpty] = useState(false)
  const { isVisible, toggleVisibility } = useMenu();

  //sort the names in ascending order
  useEffect(() => {
    mockData.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    setmockdata(mockData)

  }, [])
  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth > 768) {
        toggleVisibility(true)
        document.querySelector('.sidebar').classList.add('flex')
      }else{
        toggleVisibility(false)
        document.querySelector('.sidebar').classList.add('hidden')

      }
    };

    // Check on mount
    checkScreenWidth();

    // Listen for window resize
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup listener
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, [toggleVisibility()])




  const handlechange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = mockData.filter((user) => {
      return user.name.toLowerCase().includes(query);
    });
    setmockdata(filteredData);
    setEmpty(filteredData.length === 0);
  };





  return (
    <>
      <Navbar />
      <div className='flex overflow-hidden h-[90vh]'>
        <div className={`sidebar lg:min-w-[300px] ${isVisible ? "flex" : "hidden"} md:min-w-[200px] min-w-[250px] transition-all duration-700 ease-in-out  flex-col md:relative absolute bg-black z-40 lg:p-5 px-2 py-4  h-full border-gray-600 text-center border-r-2 lg:text-2xl text-lg font-bold `}>

          <span className='border-b-2 py-2 lg:px-3.5 px-1.5 w-full border-gray-600'> Details Page <ChevronRight className='inline' /></span>
        </div>
        <div className='lg:w-[85%] md:w-[70%] w-full lg:p-5 px-0 py-3 h-full gap-3.5 mx-auto'>
          <div className='flex h-full w-fit flex-col gap-3.5 m-auto justify-evenly items-center'>
            <div className="group sm:w-full w-[400px]">
              <svg id="svg" viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
                <g>
                  <path
                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                  ></path>
                </g>
              </svg>

              <input
                id="query"
                className="input"
                type="search"
                placeholder="Search Name..."
                name="searchbar"
                onChange={handlechange}
              />
            </div>
            <h2 className='text-3xl font-bold border-b-2 text-amber-400 px-3'>User Details</h2>
            <div className='h-[70%] overflow-y-scroll scrollbar-hide'>
              {Empty ? (
                <div className='lg:w-[604px] sm:w-[550px] w-[300px] h-full flex flex-col-reverse gap-2 items-center justify-center text-center text-2xl font-bold text-red-600'>
                  <span className='text-3xl my-10'>No data found</span>
                  <Image height={100} width={100} className=' shadow-[0px_0px_20px_20px_white]' src="error.gif"  alt="" />
                </div>
              ) : (
                <table className='lg:w-[604px] sm:w-[550px] min-w-[300px] mx-4 sm:mx-0' border="1">
                  <thead>
                    <tr className='border text-xl bg-[#0a0a0a]'>
                      {['ID', 'Name', 'Email', 'Role'].map((header) => (
                        <th key={header} className='border sm:px-6 px-2 py-2'>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockdata.map((user) => (
                      <tr key={user.id} className='border'>
                        <td className='border sm:px-6 px-0 sm:text-left text-center py-2'>{user.id}</td>
                        <td className='border sm:px-6 px-0 sm:text-left text-center py-2'>{user.name}</td>
                        <td className='border sm:px-6 px-0 sm:text-left text-center py-2'>{user.email}</td>
                        <td className='border sm:px-6 px-0 sm:text-left text-center py-2'>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}


            </div></div>
        </div>
      </div>
    </>
  )
}

export default Page
