const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true
    }, 
    roleActive: {
        type: boolean,
        default: true
    }
})

module.exports = mongoose.model('Role', roleSchema)
