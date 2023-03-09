import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectEventById } from './eventsApiSlice'

import React from 'react'

const Event = ({ eventId }) => {
    const event = useSelector(state => selectEventById(state, eventId))

    const navigate = useNavigate()

    if (event) {
        // const created = new Date(event.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        // const updated = new Date(event.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/events/${eventId}`)
      
        
        console.log(event)

        return (

         
            <tr className="border-2 border-soft-gray">
                <td className="p-2 m-2">{event.eventTitle}</td>
                <td className="p-2 m-2">{event.eventPrice} €</td>
                <td className="p-2 m-2">{event.eventStartDate}</td>
                <td className="p-2 m-2">{event.eventPrice}</td>

                <td className="p-2 m-2">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                        >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
                    
        )

    } else return null
}
export default Event