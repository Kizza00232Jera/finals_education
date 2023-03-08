const Employee = require('../models/Employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req,res) => {

    const { employeeEmail, employeePassword } = req.body

    if (!employeeEmail || !employeePassword) {
        return res.status(400).json({ message:'all fields are required' })
    }

    const foundEmployee = await Employee.findOne({ employeeEmail }).exec()

    if (!foundEmployee) {
        return res.status(401).json({ message: 'unauth found empl'})
    }

    const match = await bcrypt.compare(employeePassword, foundEmployee.employeePassword)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })



     //creating access token (object)
    //username and roles are inserted in access token
    //and giving access token duration
    const accessToken = jwt.sign(
        {
            "EmployeeInfo": {
                "employeeName": foundEmployee.employeeName,
                "employeeSurname": foundEmployee.employeeSurname,
                "employeeEmail": foundEmployee.employeeEmail,
                "employeeRole": foundEmployee.employeeRole,
                "employeeDepartment": foundEmployee.employeeDepartment,
                "employeeFund": foundEmployee.employeeFund,
                "employeeSpent": foundEmployee.employeeSpent,
                "employeeBudget": foundEmployee.employeeBudget
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        {"employeeEmail": foundEmployee.employeeEmail},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server 
    secure: true, //https
    sameSite: 'None', //cross-site cookie 
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match refresh Token
    })

    //send accessToken containing all data
    res.json({ accessToken })

})

// @desc refresh
// @route POST /auth/refresh
// @access Public - because access token has expired
const refresh =  (req,res) => {
    const cookies = req.cookies
    //if we don't have a cookie, returning 401

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    //if we have that cookie we will set refreshToken to it
    const refreshToken = cookies.jwt

    //verifying token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        //async handler to catch any unexpected error
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundEmployee = await Employee.findOne({ employeeEmail: decoded.employeeEmail }).exec()

            if (!foundEmployee) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "EmployeeInfo": {
                        "employeeName": foundEmployee.employeeName,
                        "employeeSurname": foundEmployee.employeeSurname,
                        "employeeEmail": foundEmployee.employeeEmail,
                        "employeeRole": foundEmployee.employeeRole,
                        "employeeDepartment": foundEmployee.employeeDepartment,
                        "employeeFund": foundEmployee.employeeFund,
                        "employeeSpent": foundEmployee.employeeSpent,
                        "employeeBudget": foundEmployee.employeeBudget
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}


// @desc logout
// @route POST /auth/logout
// @access Public - just to clear cookies
const logout = asyncHandler(async (req,res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // no content
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
    res.json({ message: 'cookie cleared'})
})


module.exports = {
    login,
    refresh,
    logout
}