import React from 'react'


const EventLayout = ({ event, employee }) => {

    const content = (
        <>
            <div className="">
                <div className="flex gap-5 mx-20">
                    <div className='bg-invisible-gray p-3 py-2 my-5 border border-soft-gray rounded-lg basis-2/3'>
                        <h2 className='text-2xl font-semibold py-5 border-b border-b-soft-gray'>{event.eventTitle}</h2>
                        <div className='flex flex-col py-5'>
                            <p className='font-bold'>Description</p>
                            <p>{event.eventDescription}</p>
                        </div>
                        <div className='flex flex-col py-5'>
                            <p className='font-bold'>Comment</p>
                            <p>{event.eventDescription}</p>
                        </div>
                    </div>
                    <div className='bg-invisible-gray p-3 py-2 my-5 border border-soft-gray rounded-lg basis-1/3'>
                        <div className='flex flex-row justify-between'>
                            <p className='text-sm font-bold text-black'>Start Date:</p>
                            <p className='text-sm font-medium text-black'>{event.eventStartDate}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-sm font-bold text-black'>End Date:</p>
                            <p className='text-sm font-medium text-black'>{event.eventEndDate}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-sm font-bold text-black'>Workdays:</p>
                            <p className='text-sm font-medium text-black'>{event.eventDuration}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-sm font-bold text-black'>Venue:</p>
                            <p className='text-sm font-medium text-black'>{event.eventVenue}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-sm font-bold text-black'>Created by:</p>
                            <p className='text-sm font-medium text-black'>{event.employeeEmail}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='text-sm font-bold text-black'>Price:</p>
                            <p className='text-sm font-bold text-primary'>{event.eventPrice} €</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
    return content

}

export default EventLayout
