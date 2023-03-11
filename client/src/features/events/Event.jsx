import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

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
        const handleEventPage = () => navigate(`/dash/events/event/${eventId}`)
        
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

         
            <div className="border-2 border-soft-gray flex flex-row">
                <div onClick={handleEventPage} className="basis-5/12 p-2 m-2">{event.eventTitle}</div>
                <div className="p-2 m-2 basis-2/12 ">{event.eventPrice} €</div>
                <div className="p-2 m-2 basis-2/12 ">{event.eventStartDate}</div>
                <div className="p-2 m-2 basis-2/12 ">123</div>
                <div className="p-2 m-2 basis-1/12 ">       
                {editBtn}
                    </div>
                

                
            </div>
                    
        )

    } else return null
}
export default Event