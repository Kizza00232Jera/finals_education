import React from 'react'
import { useState, useEffect } from "react"
import { useUpdateEventMutation, useDeleteEventMutation } from "./eventsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

//regex for checking fields
// const LETTERS_REGEX = /^[A-z]$/
// const ALLSYMBOLS_REGEX = /^[A-z0-9!@#$%]$/
// const DATES_REGEX = /^[0-9!@#$%]$/


const EditEventForm = ({ event }) => {

    const [updateEvent, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateEventMutation()

    const [deleteEvent, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteEventMutation()

    const navigate = useNavigate()

 

    const [eventTitle, setTitle] = useState(event.eventTitle)
    // const [validTitle, setValidTitle] = useState(false)
    const [eventCity, setCity] = useState(event.eventCity)
    //  const [validCity, setValidCity] = useState(false)
    const [eventVenue, setVenue] = useState(event.eventVenue)
    //  const [validVenue, setValidVenue] = useState(false)
    const [eventStartDate, setStartDate] = useState(event.eventStartDate)
   //   const [validStartDate, setValidStartDate] = useState(false)
    const [eventEndDate, setEndDate] = useState(event.eventEndDate)
    //  const [validEndDate, setValidEndDate] = useState(false)
    const [eventDeadline, setDeadline] = useState(event.eventDeadline)
    //  const [validDeadline, setValidDeadline] = useState(false)
    const [eventDuration, setDuration] = useState(event.eventDuration)
    //  const [validDuration, setValidDuration] = useState(false)
    const [eventPrice, setPrice] = useState(event.eventPrice)
    //  const [validPrice, setValidPrice] = useState(false)
    const [eventWebLink, setWebLink] = useState(event.eventWebLink)
    //  const [validWebLink, setValidWebLink] = useState(false)
    const [eventDescription, setDescription] = useState(event.eventDescription)
    //  const [validDescription, setValidDescription] = useState(false)
       //ADD EMPLOYEE ID -> EMPLOYEE EMAIL 
       //THIS WILL NEED TO BE CHANGED TO BE ABLE TO EDIT OR CREATE EVENT
       //works now
    const [employeeEmail, setEmployeeEmail] = useState(event.employeeEmail)

    //   event.employeeEmail = employeeEmail
    //     event.eventTitle = eventTitle
    //     event.eventCity = eventCity
    //     event.eventVenue = eventVenue
    //     event.eventStartDate = eventStartDate
    //     event.eventEndDate = eventEndDate
    //     event.eventDeadline = eventDeadline
    //     event.eventDuration = eventDuration
    //     event.eventPrice = eventPrice
    //     event.eventWebLink = eventWebLink
    //     event.eventDescription = eventDescription

    //making sure that title and description have letters(&nr)
    //and that numbers and dates dont have letters

    // useEffect(() => {
    //     setValidTitle(ALLSYMBOLS_REGEX.test(eventTitle))
    // }, [eventTitle])

    // useEffect(() => {
    //     setValidCity(LETTERS_REGEX.test(eventCity))
    // }, [eventCity])

    // useEffect(() => {
    //     setValidVenue(ALLSYMBOLS_REGEX.test(eventVenue))
    // }, [eventVenue])

    // useEffect(() => {
    //     setValidStartDate(DATES_REGEX.test(eventStartDate))
    // }, [eventStartDate])

    // useEffect(() => {
    //     setValidEndDate(DATES_REGEX.test(eventEndDate))
    // }, [eventEndDate])

    // useEffect(() => {
    //     setValidDeadline(DATES_REGEX.test(eventDeadline))
    // }, [eventDeadline])

    // useEffect(() => {
    //     setValidDuration(DATES_REGEX.test(eventDuration))
    // }, [eventDuration])

    // useEffect(() => {
    //     setValidPrice(DATES_REGEX.test(eventPrice))
    // }, [eventPrice])

    // useEffect(() => {
    //     setValidWebLink(ALLSYMBOLS_REGEX.test(eventWebLink))
    // }, [eventWebLink])

    // useEffect(() => {
    //     setValidDescription(ALLSYMBOLS_REGEX.test(eventDescription))
    // }, [eventDescription])


    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
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

    }, [isSuccess, isDelSuccess, navigate])

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

    const onSaveEventClicked = async (e) => {
        if (canSave) {
            await updateEvent({ id: event.id, employeeEmail: employeeEmail, eventTitle, eventCity, eventVenue, eventStartDate, eventEndDate, eventDeadline, eventDuration, eventPrice, eventWebLink, eventDescription })
        }
    }

    const onDeleteEventClicked = async () => {
        await deleteEvent({ id: event.id })
    }

    // const created = new Date(event.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    // const updated = new Date(event.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    // const options = employees.map(employee => {
    //     return (
    //         <option
    //             key={employee.id}
    //             value={employee.id}

    //         > {employees.employeeEmail}</option >
    //     )
    // })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Event #{event.eventTitle}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveEventClicked}
                           disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteEventClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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

export default EditEventForm
