const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    employeeCreated: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Employee'
    },
    eventTitle: {
        type: String,
        required: true
    }, 
    eventCity: {
        type: String,
        required: true
    }, 
    eventVenue: {
        type: String,
        required: true
    },
    eventStartDate: {
        type: Date,
        required: true
    },
    eventEndDate: {
        type: Date,
        required: true
    },
    eventDeadline: {
        type: Date,
        required: true
    },
    eventDuration: {
        type: Number,
        required: true
    },
    eventPrice: {
        type: Number,
        required: true
    },
    eventWebLink: {
        type: String,
        default: "no link available"
    },
    eventDescription: {
        type: String,
        required: true,
        maxLength: 300
    }
},

{
    timestamps: true
}
)

module.exports = mongoose.model('Event', eventSchema)
