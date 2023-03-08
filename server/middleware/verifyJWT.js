const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.employeeName = decoded.EmployeeInfo.employeeName
            req.employeeSurname = decoded.EmployeeInfo.employeeSurname
            req.employeeEmail = decoded.EmployeeInfo.employeeEmail
            req.employeeRole = decoded.EmployeeInfo.employeeRole
            req.employeeDepartment = decoded.EmployeeInfo.employeeDepartment
            req.employeeFund = decoded.EmployeeInfo.employeeFund
            req.employeeSpent = decoded.EmployeeInfo.employeeSpent
            req.employeeBudget = decoded.EmployeeInfo.employeeBudget
            
            next()
        }
    )
}

module.exports = verifyJWT 