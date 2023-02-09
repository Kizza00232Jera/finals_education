
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    }, 
    userSurname: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userRole: [{
        type: Roles,
        default: "Employee"
    }],
    userDepartment: [{
        type: String,
        default: "Developer"
    }],
    userFund: {
        type: Number,
        required: true
    },
    userSpent: {
        type: Number,
        required: true
    },
    userBudget: {
        type: Number,
        required: true
    }

},
{
    timestamps: true
});


module.exports = mongoose.model('User', userSchema)
