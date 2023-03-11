import React from 'react'


const EventLayout = ({ event }) => {

    const content = (
        <>         
            <div className="">
                <div className="">
                    <h2>{event.eventTitle}</h2>
                    <p>{event.eventStartDate}</p>
                    <p>Decsription{event.eventDescription}</p>
                    <p>Start Date{event.eventStartDate}</p>
                    <p>Price {event.eventPrice} EUR</p>
                    <p>End Date{event.eventEndDate}</p>
                    <p>WorkDays {event.eventDuration}</p>
                    <p>Venue {event.eventVenue}</p>
                    <p>User Created {event.employeeEmail}</p>
                </div>
            </div>
        </>
    )
    return content

}

export default EventLayout
