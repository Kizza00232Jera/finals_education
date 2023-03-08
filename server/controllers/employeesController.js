const Employee = require('../models/Employee')
const Event = require('../models/Event')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')


// @desc Get all employees
// @route GET /employees
// @access Private
const getAllEmployees = asyncHandler(async (req, res) => {
    // Get all employees from MongoDB
    const employees = await Employee.find().select('-password').lean()

    // If no employees 
    if (!employees?.length) {
        return res.status(400).json({ message: 'No employees found' })
    }

    res.json(employees)
})


// @desc Create new employee
// @route POST /employees
// @access Private
const createNewEmployee = asyncHandler(async (req, res) => {
    const { employeeName, employeeSurname, employeeEmail, employeePassword, employeeRole, employeeDepartment, employeeFund, employeeSpent, employeeBudget } = req.body

    // Confirm data
    if (!employeeName || !employeeSurname || !employeeEmail || !employeePassword || !Array.isArray(employeeDepartment) || !employeeDepartment.length || !employeeFund || !employeeSpent || !employeeBudget || !Array.isArray(employeeRole) || !employeeRole.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate employees
    const duplicate = await Employee.findOne({employeeEmail}).collation({ locale:'en', strength: 2}).lean().exec()
   
    if (duplicate) {
        return res.status(409).json({ message: ' employee already exists, email already used' })
    }

     // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(employeePassword, salt)


    const employeeObject = { employeeName, employeeSurname, employeeEmail, employeePassword: hashedPassword, employeeRole, employeeDepartment, employeeFund, employeeSpent, employeeBudget }

    // Create and store new employee 
    const employee = await Employee.create(employeeObject)

    if (employee) { //created 
        res.status(201).json({ message: `New employee ${employeeName} ${employeeSurname} is created` })
    } else {
        res.status(400).json({ message: 'Invalid employee data received' })
    }
})

// @desc  update an employee
// @route PATCH  /employees
// @access Private
const updateEmployee = asyncHandler(async (req, res) => {
    const { id, employeeName, employeeSurname, employeeEmail, employeePassword, employeeRole, employeeDepartment, employeeFund, employeeSpent, employeeBudget } = req.body

    //confirm data
    if (!id || !employeeName || !employeeSurname || !employeeEmail || !Array.isArray(employeeDepartment) || !employeeDepartment.length || !employeeFund || !employeeSpent || !employeeBudget || !Array.isArray(employeeRole) || !employeeRole.length) {
        return res.status(400).json({ message: 'All fields are required' })


    }

    const employee = await Employee.findById(id).exec()

    if (!employee) {
        return res.status(400).json({ message: 'employee not found' })
    }

    //check for duplicate
    const duplicate = await Employee.findOne({ employeeEmail }).collation({ locale:'en', strength: 2}).lean().exec()
    //allow updates to the original employee
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate employee' })
    }
    if (employeePassword) {
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(employeePassword, salt)

        employee.employeePassword = hashedPassword
    }


    employee.employeeName = employeeName
    employee.employeeSurname = employeeSurname
    employee.employeeEmail = employeeEmail
    employee.employeeRole = employeeRole
    employee.employeeDepartment = employeeDepartment
    employee.employeeFund = employeeFund
    employee.employeeSpent = employeeSpent
    employee.employeeBudget = employeeBudget

    




    const updatedEmployee = await employee.save()
    res.json({ message: `${updatedEmployee.employeeEmail} updated` })

})

// @desc  Delete an employee
// @route DELETE  /employees
// @access Private
const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Employee ID Required' })
    }

    // Does the employee exist to delete?
    const employee = await Employee.findById(id).exec()

    if (!employee) {
        return res.status(400).json({ message: 'employee not found' })
    }

    const result = await employee.deleteOne()

    const reply = `Employee with mail ${result.employeeEmail} with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee
}