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
            req.employeeName = decoded.UserInfo.employeeName
            req.employeeSurname = decoded.UserInfo.employeeSurname
            req.employeeEmail = decoded.UserInfo.employeeEmail
            req.employeeRole = decoded.UserInfo.employeeRole
            req.employeeDepartment = decoded.UserInfo.employeeDepartment
            req.employeeFund = decoded.UserInfo.employeeFund
            req.employeeSpent = decoded.UserInfo.employeeSpent
            req.employeeBudget = decoded.UserInfo.employeeBudget
            
            next()
        }
    )
}

module.exports = verifyJWT 