import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faUserGear } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectEventById } from './eventsApiSlice'

import React from 'react'
import useAuth from '../../hooks/useAuth'

const Event = ({ eventId }) => {
    const event = useSelector(state => selectEventById(state, eventId))

    const navigate = useNavigate()
    const {  isManager, isAdmin } = useAuth()

    
    if (event) { 

        const handleEdit = () => navigate(`/dash/events/${eventId}`)
        
        let editBtn = null
        if (isManager || isAdmin) {
                editBtn = (
                <button
                className="icon-button table__button"
                onClick={handleEdit}
                >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            )         
        }
      

      
        
      

        return (

         
            <tr className="border-2 border-soft-gray">
                <td className="p-2 m-2">{event.eventTitle}</td>
                <td className="p-2 m-2">{event.eventPrice} €</td>
                <td className="p-2 m-2">{event.eventStartDate}</td>
                <td className="p-2 m-2">123 </td>
                <td className="p-2 m-2">       
                {editBtn}
                    </td>
                

                
            </tr>
                    
        )

    } else return null
}
export default Event