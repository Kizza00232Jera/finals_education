import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import LeftNav from './LeftNav'

const DashLayout = () => {
  return (
    <>
      <div className='flex flex-row min-w-max'>
        <LeftNav className="basis-1/12"/>
        <div className='basis-11/12 bg-gray flex flex-col'>
          <div className='flex-grow'>
            <Outlet />
          </div>
          <Footer className="px-20 flex-none"/>
        </div>
      </div>

    </>
  )
}

export default DashLayout
