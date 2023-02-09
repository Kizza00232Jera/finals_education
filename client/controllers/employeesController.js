const Employee = require('../models/Employee')
const Event = require('../models/Event')
const Role = require('../models/Role')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc Get all employees
// @route GET /employees
// @access Private
const getAllEmployees = asyncHandler(async (req, res) => {
    
})


// @desc Create new employee
// @route POST /employees
// @access Private
const createNewEmployee = asyncHandler(async (req, res) => {
    
})

// @desc  update an employee
// @route PATCH  /employees
// @access Private
const updateEmployee = asyncHandler(async (req, res) => {
    
})

// @desc  Delete an employee
// @route DELETE  /employees
// @access Private
const deleteEmployee = asyncHandler(async (req, res) => {
    
})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}