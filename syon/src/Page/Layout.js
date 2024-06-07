import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'


export default function Layout() {
  return (
    <div className='relative min-h-screen'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}