import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewEventMutation } from "./eventsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewEventForm = () => {

  const [addNewEvent, {
      isLoading,
      isSuccess,
      isError,
      error
  }] = useAddNewEventMutation()

  const navigate = useNavigate()

  //usestate.. 
  const [eventTitle, setTitle] = useState('')
  const [eventCity, setCity] = useState('')
  const [eventVenue, setVenue] = useState('')
  const [eventStartDate, setStartDate] = useState('')
  const [eventEndDate, setEndDate] = useState('')
  const [eventDeadline, setDeadline] = useState('')
  const [eventDuration, setDuration] = useState('')
  const [eventPrice, setPrice] = useState('')
  const [eventWebLink, setWebLink] = useState('')
  const [eventDescription, setDescription] = useState('')
  const [employeeEmail, setEmployeeEmail] = useState('')

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess) {
        setTitle('')
        setCity('')
        setVenue('')
        setStartDate('')
        setEndDate('')
        setDeadline('')
        setDuration('')
        setPrice('')
        setWebLink('')
        setDescription('')
        setEmployeeEmail('')
        navigate('/dash/events')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onCityChanged = e => setCity(e.target.value)
  const onVenueChanged = e => setVenue(e.target.value)
  const onStartDateChanged = e => setStartDate(e.target.value)
  const onEndDateChanged = e => setEndDate(e.target.value)
  const onDeadlineChanged = e => setDeadline(e.target.value)
  const onDurationChanged = e => setDuration(e.target.value)
  const onPriceChanged = e => setPrice(e.target.value)
  const onWebLinkChanged = e => setWebLink(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)
  const onEmployeeEmailChanged = e => setEmployeeEmail(e.target.value)

  const canSave = [employeeEmail, eventTitle, eventCity, eventVenue, eventStartDate, eventEndDate, eventDeadline, eventDuration, eventPrice, eventWebLink, eventDescription].every(Boolean) && !isLoading

 //calling add new event mutation
 const onSaveEventClicked = async (e) => {
  e.preventDefault()
  if (canSave) {
      await addNewEvent({ employeeEmail, eventTitle, eventCity, eventVenue, eventStartDate, eventEndDate, eventDeadline, eventDuration, eventPrice, eventWebLink, eventDescription })
  }
}

//   const options = employees.map(employee => {
//     return (
//         <option
//             key={employee.id}
//             value={employee.id}
//         > {employee.employeeEmail}</option >
//     )
// })

const errClass = isError ? "errmsg" : "offscreen"

const content = (
  <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveEventClicked}>
          <div className="form__title-row">
              <h2>New Event</h2>
              <div className="form__action-buttons">
                  <button
                      className="icon-button"
                      title="Save"
                      disabled={!canSave}
                  >
                      <FontAwesomeIcon icon={faSave} />
                  </button>
              </div>
          </div>
          <label className="form__label" htmlFor="event-title">
                    Title:</label>
                <input
                    id="event-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={eventTitle}
                    onChange={onTitleChanged}
                />
                <label className="form__label" htmlFor="event-city">
                    City:</label>
                <input
                    id="event-city"
                    name="city"
                    type="text"
                    autoComplete="off"
                    value={eventCity}
                    onChange={onCityChanged}
                />
                <label className="form__label" htmlFor="event-venue">
                    Venue:</label>
                <input
                    id="event-venue"
                    name="venue"
                    type="text"
                    autoComplete="off"
                    value={eventVenue}
                    onChange={onVenueChanged}
                />
                <label className="form__label" htmlFor="event-startdate">
                    Start Date:</label>
                <input
                    id="event-startdate"
                    name="startdate"
                    type="text"
                    autoComplete="off"
                    value={eventStartDate}
                    onChange={onStartDateChanged}
                />
                <label className="form__label" htmlFor="event-enddate">
                    End Date:</label>
                <input
                    id="event-enddate"
                    name="startdate"
                    type="text"
                    autoComplete="off"
                    value={eventEndDate}
                    onChange={onEndDateChanged}
                />
                <label className="form__label" htmlFor="event-deadline">
                    Deadline:</label>
                <input
                    id="event-deadline"
                    name="deadline"
                    type="text"
                    autoComplete="off"
                    value={eventDeadline}
                    onChange={onDeadlineChanged}
                />
                <label className="form__label" htmlFor="event-duration">
                    Duration:</label>
                <input
                    id="event-duration"
                    name="duration"
                    type="text"
                    autoComplete="off"
                    value={eventDuration}
                    onChange={onDurationChanged}
                />
                <label className="form__label" htmlFor="event-price">
                    Price:</label>
                <input
                    id="event-price"
                    name="price"
                    type="text"
                    autoComplete="off"
                    value={eventPrice}
                    onChange={onPriceChanged}
                />
                <label className="form__label" htmlFor="event-weblink">
                    Web Link:</label>
                <input
                    id="event-price"
                    name="weblink"
                    type="text"
                    autoComplete="off"
                    value={eventWebLink}
                    onChange={onWebLinkChanged}
                />
                <label className="form__label" htmlFor="event-description">
                    Description:</label>
                <input
                    id="event-description"
                    name="description"
                    type="text"
                    autoComplete="off"
                    value={eventDescription}
                    onChange={onDescriptionChanged}
                />
                <label className="form__label" htmlFor="event-usercreated">
                    User Created:</label>
                <input
                    id="event-usercreated"
                    name="usercreated"
                    type="text"
                    //autoComplete="off"
                    value={employeeEmail}
                    onChange={onEmployeeEmailChanged}
                /> 
      </form>
  </>
)

return content
}

export default NewEventForm
