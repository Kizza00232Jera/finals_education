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
        required: yes
    },
    eventStartDate: {
        type: Date,
        required: yes
    },
    eventEndDate: {
        type: Date,
        required: yes
    },
    eventDeadline: {
        type: Date,
        required: yes
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
        link: mongoose.SchemaTypes.Url
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
