const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    employeeEmail: {
        type: mongoose.Schema.Types.String,
        required: true,
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
        type: String,
        required: true
    },
    eventEndDate: {
        type: String,
        required: true
    },
    eventDeadline: {
        type: String,
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
    },
    eventDepartment: {
        type: [String],
        default: ["All"],
        required: true
    },
    eventRequested: {
        type: [String],
        default: [""]
    },
    eventApproved: {
        type: [String],
        default: [""]
    },
    eventRejected: {
        type: [String],
        default: [""]
    }

},

{
    timestamps: true
}
)

module.exports = mongoose.model('Event', eventSchema)
