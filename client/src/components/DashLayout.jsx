import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import LeftNav from './LeftNav'

const DashLayout = () => {
  return (
    <>
      <div className='flex'>
        <LeftNav />
        <div className='w-main ml-20 mr-20'>
          <div>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>

    </>
  )
}

export default DashLayout
