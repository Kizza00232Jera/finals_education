import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { employeeName, employeeSurname, employeeEmail, employeeRole, employeeDepartment, employeeFund, employeeSpent, employeeBudget} = decoded.EmployeeInfo


        isManager = employeeRole.includes('Manager')
        isAdmin = employeeRole.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { employeeName, employeeSurname, employeeEmail, employeeDepartment, employeeFund, employeeSpent, employeeBudget, status, employeeRole, isManager, isAdmin }
    }

    return { employeeName: '', employeeSurname: '', employeeEmail: '', employeeRole: [], employeeDepartment: [], employeeFund:'', employeeSpent:'', employeeBudget:'', isManager, isAdmin, status }
}



export default useAuth