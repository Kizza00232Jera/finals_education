const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    }, 
    employeeSurname: {
        type: String,
        required: true
    },
    employeeEmail: {
        type: String,
        required: true,
        unique: true
    },
    employeePassword: {
        type: String,
        required: true
    },
    employeeRole: {
        type: [String],
        default: ["Employee"]
    },
    employeeDepartment: {
        type: [String],
        default: ["Developer"]
    },
    employeeFund: {
        type: Number,
        required: true
    },
    employeeSpent: {
        type: Number,
        required: true
    },
    employeeBudget: {
        type: Number,
        required: true
    }

},
{
    timestamps: true
});


module.exports = mongoose.model('Employee', employeeSchema)
