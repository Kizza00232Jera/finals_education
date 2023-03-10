const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    employeeEmail: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'Employee'
    },
    bookTitle: {
        type: String,
        required: true
    }, 
    bookAuthor: {
        type: String,
        required: true
    }, 
    bookPublicationYear: {
        type: String,
        required: true
    },
    bookPrice: {
        type: String,
        required: true
    },
    bookShop: {
        type: String,
        required: true
    },
    bookWebLink: {
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
        required: true
    }
   
},

{
    timestamps: true
}
)

module.exports = mongoose.model('Book', bookSchema)
