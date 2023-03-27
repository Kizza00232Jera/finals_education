import React from 'react'
import { useState, useEffect } from "react"
import { useUpdateEventMutation, useDeleteEventMutation } from "./eventsApiSlice"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'

//regex for checking fields
// const LETTERS_REGEX = /^[A-z]$/
// const ALLSYMBOLS_REGEX = /^[A-z0-9!@#$%]$/
// const DATES_REGEX = /^[0-9!@#$%]$/


const EditEventForm = ({ event }) => {

    const { pathname } = useLocation()


    const { isManager, isAdmin } = useAuth()

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

    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="w-36 text-center p-2 bg-error text-sm font-bold rounded text-color-white mb-4 block"
                onClick={onDeleteEventClicked}
                title="delete"
            >
                Delete
            </button>
            )

    }

    const saveClass = canSave ?

        "w-36 text-center p-2 bg-primary text-sm font-bold rounded text-color-white mb-4 block" :
        "w-36 text-center p-2 bg-invisible-gray text-sm font-bold rounded text-color-power-gray mb-4 block"



    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className='mb-4'>
                    <div className='border-b border-b-soft-gray '>

                        <header className='h-28 flex flex-wrap content-center px-20 bg-white'>
                            <div className='flex-grow'>
                                <Link to="/dash/employees">
                                    <h1 className='text-3xl'>{event.eventTitle}</h1>
                                    <p>{pathname}</p>
                                </Link>
                            </div>
                        </header>
                    </div>
                </div>
                <div className='px-20'>

                    <div className="text-lg font-bold py-5">
                        <h2>GENERAL</h2>

                    </div>
                    <div className='flex w-80 gap-4'>


                        <div className='w-80'>
                            <label className="block" htmlFor="event-enddate">
                                Title*</label>
                            <input
                                id="event-enddate"
                                name="startdate"
                                type="text"
                                autoComplete="off"
                                value={eventTitle}
                                placeholder="Deadline to apply"
                                className='border rounded-lg text-base w-80 block p-2'
                                onChange={onTitleChanged}
                            />

                        </div>
                        <div className='w-80 '>
                            <label className="block" htmlFor="event-enddate">
                                Deadline*</label>
                            <input
                                id="event-enddate"
                                name="startdate"
                                type="text"
                                autoComplete="off"
                                value={eventDeadline}
                                placeholder="Deadline to apply"
                                className='border rounded-lg text-base w-80 block p-2'
                                onChange={onDeadlineChanged}
                            />

                        </div>
                    </div>
                    <div className='flex gap-4 w-80'>

                        <div className="w-80">

                            <label className="form__label" htmlFor="event-city">
                                City*</label>
                            <input
                                id="event-city"
                                name="city"
                                type="text"
                                autoComplete="off"
                                value={eventCity}
                                placeholder="Event city"
                                className='border rounded-lg text-base w-80 block p-2'
                                onChange={onCityChanged}
                            />
                        </div>
                        <div className='w-80'>
                            <label className="form__label" htmlFor="event-venue">
                                Venue*</label>
                            <input
                                id="event-venue"
                                name="venue"
                                type="text"
                                autoComplete="off"
                                value={eventVenue}
                                placeholder="Event Venue"
                                className='border rounded-lg text-base w-80 block p-2'
                                onChange={onVenueChanged}
                            />
                        </div>
                    </div>
                    <div className="text-lg font-bold py-5">
                        <h2>Date and Duration</h2>

                    </div>
                    <div className='flex gap-4 w-80'>
                        <div className='w-80'>
                            <label className="form__label" htmlFor="event-startdate">
                                Start Date*</label>
                            <input
                                id="event-startdate"
                                name="startdate"
                                type="text"
                                autoComplete="off"
                                value={eventStartDate}
                                placeholder="123"
                                className='border rounded-lg text-base w-80 block p-2'
                                onChange={onStartDateChanged}
                            />
                        </div>

                        <div className='w-80'>

                            <label className="form__label" htmlFor="event-deadline">
                                End date*</label>
                            <input
                                id="event-deadline"
                                name="deadline"
                                type="text"
                                autoComplete="off"
                                value={eventEndDate}
                                placeholder="123"
                                className='border rounded-lg text-base w-80 block p-2'
                                onChange={onEndDateChanged}
                            />
                        </div>

                    </div>
                    <div className='w-80'>
                        <label className="form__label" htmlFor="event-duration">
                            Lenght (in days)*</label>
                        <input
                            id="event-duration"
                            name="duration"
                            type="text"
                            autoComplete="off"
                            value={eventDuration}
                            placeholder="123"
                            className='border rounded-lg text-base w-80 block p-2'
                            onChange={onDurationChanged}
                        />
                    </div>
                    <div className="text-lg font-bold py-5">
                        <h2>Purchase details</h2>

                    </div>
                    <div className='flex gap-5 w-80'>

                        <div className='w-80'>

                            <label className="form__label" htmlFor="event-price">
                                Price (in euro)*</label>
                            <input
                                id="event-price"
                                name="price"
                                type="text"
                                autoComplete="off"
                                value={eventPrice}
                                placeholder="123"
                                className='border rounded-lg text-base w-80 block p-2'
                                onChange={onPriceChanged}
                            />
                        </div>
                        <div className='w-80'>

                            <label className="form__label" htmlFor="event-weblink">
                                Web Link*</label>
                            <input
                                id="event-price"
                                name="weblink"
                                type="text"
                                autoComplete="off"
                                value={eventWebLink}
                                placeholder="Link of the event"
                                className='border rounded-lg text-base w-80 block p-2'
                                onChange={onWebLinkChanged}
                            />
                        </div>
                    </div>
                    <div className=''>

                        <label className="w-80" htmlFor="event-description">
                            Event and price breakdown*</label>
                        <input
                            id="event-description"
                            name="description"
                            type="text"
                            autoComplete="off"
                            value={eventDescription}
                            placeholder="Placeholder"
                            className='border rounded-lg text-base w-80 block p-2'
                            onChange={onDescriptionChanged}
                        />
                    </div>

                    <div className='w-80'>

                        <label className="form__label" htmlFor="event-usercreated">
                            User Created(your email)*</label>
                        <input
                            id="event-usercreated"
                            name="usercreated"
                            type="text"
                            //autoComplete="on"
                            className='border rounded-lg text-base w-80 block p-2'
                            value={employeeEmail}
                            onChange={onEmployeeEmailChanged}
                        />
                    </div>

                    <div className="mt-5 flex gap-4">
                        <button
                            className={saveClass}
                            onClick={onSaveEventClicked}
                            title="Save"
                            disabled={!canSave}
                        >
                            Save
                        </button>
                        {deleteButton}
                    </div>





                </div>
            </form>
        </>
    )

    return content

}

export default EditEventForm
