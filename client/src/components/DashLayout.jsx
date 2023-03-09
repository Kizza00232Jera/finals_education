import React from 'react'
import {Outlet} from 'react-router-dom'
import DashFooter from './DashFooter'
import LeftNav from './LeftNav'

const DashLayout = () => {
  return (
    <>
      <div className='flex'>
        <LeftNav />
      <div className='w-main ml-20 mr-20'>
        <div>
            <Outlet/>
        </div>
        <DashFooter/>
      </div>
      </div>

    </>
  )
}

export default DashLayout
