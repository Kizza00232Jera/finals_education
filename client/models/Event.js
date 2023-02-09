const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    userCreated: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
    eventLength: {
        type: Number,
        required: true
    },
    eventPrice: {
        type: Number,
        required: true
    },
    eventWebLink: {
        type: String,
        required: false
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

// userSchema.set('timestamps', {
//     createdAt: 'crdAt',
//     updatedAt: 'updAt'
// });

module.exports = mongoose.model('Event', eventSchema)
