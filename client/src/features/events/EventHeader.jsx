import { faFilter, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const EventHeader = () => {

    const { pathname } = useLocation()


    return (
        <div className='mb-4'>
            <div className='border-b border-b-soft-gray '>

                <header className='h-28 flex flex-wrap content-center px-20 bg-white'>
                    <div className='flex-grow'>
                        <Link to="/dash/employees">
                            <h1 className='text-3xl'>Event</h1>
                            <p>{pathname}</p>
                        </Link>
                    </div>
                </header>
            </div>

            <div className='flex gap-4 px-20 pt-4'>

            </div>
        </div>
    )
}

export default EventHeader
