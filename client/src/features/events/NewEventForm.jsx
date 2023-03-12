import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DEPARTMENTS } from '../../config/departments'
import { useAddNewEventMutation } from "./eventsApiSlice"


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
    const [eventDepartment, setDepartment] = useState(["All"])
    const [eventRequested, setRequested] = useState([''])
    const [eventApproved, setApproved] = useState([''])
    const [eventRejected, setRejected] = useState([''])


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
            setDepartment('')
            setRequested('')
            setApproved('')
            setRejected('')
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

    const onDepartmentChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setDepartment(values)
    }

    const onRequestedChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRequested(values)
    }

    const onApprovedChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setApproved(values)
    }

    const onRejectedChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRejected(values)
    }


    const canSave = [employeeEmail, eventTitle, eventCity, eventVenue, eventStartDate, eventEndDate, eventDeadline, eventDuration, eventPrice, eventWebLink, eventDescription, eventDepartment.length].every(Boolean) && !isLoading

    //calling add new event mutation
    const onSaveEventClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewEvent({ employeeEmail, eventTitle, eventCity, eventVenue, eventStartDate, eventEndDate, eventDeadline, eventDuration, eventPrice, eventWebLink, eventDescription, eventDepartment, eventRequested, eventApproved, eventRejected })
        }
    }

    const options2 = Object.values(DEPARTMENTS).map(department => {
        return (
            <option
                key={department}
                value={department}

            > {department}</option>
        )
    })

    //   const options = employees.map(employee => {
    //     return (
    //         <option
    //             key={employee.id}
    //             value={employee.id}
    //         > {employee.employeeEmail}</option >
    //     )
    // })

    const errClass = isError ? "errmsg" : "offscreen"

    const saveClass = canSave ?

        "w-36 text-center p-2 bg-primary text-sm font-bold rounded text-color-white mb-4 block" :
        "w-36 text-center p-2 bg-invisible-gray text-sm font-bold rounded text-color-power-gray mb-4 block"





    const content = (
        <>

            <p className={errClass}>{error?.data?.message}</p>

            <form className="px-20 place-content-center w-96" onSubmit={onSaveEventClicked}>
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
                    <label className="form__label" htmlFor="departments">
                        ASSIGNED DEPARTMENTS*</label>
                    <select
                        className='w-80 h-36'
                        id="departments"
                        name="departments"
                        multiple={true}
                        size="3"
                        value={eventDepartment}
                        onChange={onDepartmentChanged}
                    >
                        {options2}
                    </select>
                </div>
                <div className='w-80'>
                    <label className="form__label" htmlFor="departments">
                        Requested *</label>
                    <div
                        id="departments"
                        name="departments"
                        size="3"
                        value={eventRequested}
                        onChange={onRequestedChanged}
                    >
                        -all requests here-
                    </div>
                </div>
                <div className='w-80'>
                    <label className="form__label" htmlFor="departments">
                        Approved *</label>
                    <div
                        id="departments"
                        name="departments"
                        size="3"
                        value={eventApproved}
                        onChange={onApprovedChanged}
                    >
                        -all requests here-
                    </div>
                </div>
                <div className='w-80'>
                    <label className="form__label" htmlFor="departments">
                        Rejected *</label>
                    <div
                        id="departments"
                        name="departments"
                        size="3"
                        value={eventRejected}
                        onChange={onRejectedChanged}
                    >
                        -all requests here-
                    </div>
                </div>
                <div className='w-80'>

                    <label className="form__label" htmlFor="event-usercreated">
                        User Created*</label>
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
                <div className="mt-5">
                    <button
                        className={saveClass}
                        title="Save"
                        disabled={!canSave}
                    >
                        Create
                    </button>
                </div>
            </form>
        </>
    )

    return content
}

export default NewEventForm
