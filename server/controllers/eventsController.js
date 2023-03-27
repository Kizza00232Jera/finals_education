const Event = require('../models/Event')
const Employee = require('../models/Employee')
const asyncHandler = require('express-async-handler')

// @desc Get all events 
// @route GET /events
// @access Private

const getAllEvents = asyncHandler(async (req, res) => {
    //get all events from mongodb
    const events = await Event.find().lean()

    //if no events
    if (!events?.length) {
        return res.status(400).json({ message: 'no events found' })
    }

    // Add employee who created it to each event before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    // const eventsWithEmployee = await Promise.all(events.map(async (event) => {
    //     const employeeEmail = await Employee.findById(event.employeeEmail).lean().exec()
    //     return { ...event, employeeEmail: employeeEmail.employeeEmail }
    // }))

    res.json(events)
})

// @desc Create new event
// @route POST /events
// @access Private
const createNewEvent = asyncHandler(async (req, res) => {
    const { employeeEmail, eventTitle, eventCity, eventVenue, eventStartDate, eventEndDate, eventDeadline, eventDuration, eventPrice, eventWebLink, eventDescription } = req.body

    // Confirm data
    if (!employeeEmail || !eventTitle || !eventCity || !eventVenue || !eventStartDate || !eventEndDate || !eventDeadline || !eventDuration || !eventPrice || !eventDescription ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Event.findOne({ eventTitle }).collation({ locale:'en', strength: 2}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate event title' })
    }

    // Create and store the new employee 
    const event = await Event.create({ employeeEmail, eventTitle, eventCity, eventVenue, eventStartDate, eventEndDate, eventDeadline, eventDuration, eventPrice, eventWebLink, eventDescription })

    if (event) { // Created 
        return res.status(201).json({ message: 'New event created' })
    } else {
        return res.status(400).json({ message: 'Invalid event data received' })
    }

})


// @desc Update a event
// @route PATCH /events
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
    const { id, employeeEmail, eventTitle, eventCity, eventVenue, eventStartDate, eventEndDate, eventDeadline, eventDuration, eventWebLink, eventPrice, eventDescription } = req.body

    // Confirm data
    if (!id || !employeeEmail || !eventTitle || !eventCity || !eventVenue || !eventStartDate || !eventEndDate || !eventDeadline || !eventDuration || !eventPrice || !eventDescription) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm event exists to update
    const event = await Event.findById(id).exec()

    if (!event) {
        return res.status(400).json({ message: 'Event not found' })
    }

    // Check for duplicate title
    const duplicate = await Event.findOne({ eventTitle }).collation({ locale:'en', strength: 2}).lean().exec()

    // Allow renaming of the original event 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate event title' })
    }

    event.employeeEmail = employeeEmail
    event.eventTitle = eventTitle
    event.eventCity = eventCity
    event.eventVenue = eventVenue
    event.eventStartDate = eventStartDate
    event.eventEndDate = eventEndDate
    event.eventDeadline = eventDeadline
    event.eventDuration = eventDuration
    event.eventPrice = eventPrice
    event.eventWebLink = eventWebLink
    event.eventDescription = eventDescription

    

    const updatedEvent = await event.save()

    res.json(`'${updatedEvent.eventTitle}' updated`)
})

// @desc Delete a event
// @route DELETE /events
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Event ID required' })
    }

    // Confirm event exists to delete 
    const event = await Event.findById(id).exec()

    if (!event) {
        return res.status(400).json({ message: 'Event not found' })
    }

    const result = await event.deleteOne()

    const reply = `Event '${result.eventTitle}' with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllEvents,
    createNewEvent,
    updateEvent,
    deleteEvent
}