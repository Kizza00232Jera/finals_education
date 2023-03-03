import { useState, useEffect } from "react"
import { useUpdateEmployeeMutation, useDeleteEmployeeMutation } from "./employeesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { DEPARTMENTS } from "../../config/departments"


//regex for checking fields
const EMPLOYEE_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


//destructuring employee({employee})
const EditEmployeeForm = ({employee}) => {

     //update user hook
     const [updateEmployee, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateEmployeeMutation()

    //isSuccess is renamed and rest, so that they're separate functions
    const [deleteEmployee, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteEmployeeMutation()

    const navigate = useNavigate()

    //its same state like in a new user form. 
    const [employeeName, setUsername] = useState(employee.employeeName)
    const [validUsername, setValidUsername] = useState(false)
    const [employeeSurname, setSurname] = useState(employee.employeeSurname)
    const [employeeEmail, setEmail] = useState(employee.employeeEmail)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [employeeRole, setRoles] = useState(employee.employeeRole)
    const [employeeDepartment, setDepartment] = useState(employee.employeDepartment)
    const [employeeFund, setFund] = useState(employee.employeeFund)
    const [employeeSpent, setSpent] = useState(employee.employeeSpent)
    const [employeeBudget, setBudget] = useState(employee.employeeBudget)

    // employee.employeeName = employeeName DONEEE
    // employee.employeeSurname = employeeSurname DONEEE
    // employee.employeeEmail = employeeEmail DONEEE
    // employee.employeePassword = employeePassword DONEEE
    // employee.employeeRole = employeeRole DONEEE
    // employee.employeeDepartment = employeeDepartment DONEEE
    // employee.employeeFund = employeeFund DONEEE
    // employee.employeeSpent = employeeSpent DONEEE
    // employee.employeeBudget = employeeBudget DONEEE
    

    //checking for valid employeeName and password
    useEffect(() => {
        setValidUsername(EMPLOYEE_REGEX.test(employeeName))
    }, [employeeName])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

     //checking issuccess and isdellsuccess effects
     useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setSurname('')
            setPassword('')
            setEmail('')
            setRoles([])
            setDepartment([])
            setFund('')
            setSpent('')
            setBudget('')
            navigate('/dash/employees')
        }

    }, [isSuccess, isDelSuccess, navigate])

     //handlers, on usernamechanged, set employeeName to the inputed value
     const onUsernameChanged = e => setUsername(e.target.value)
     const onSurnameChanged = e => setSurname(e.target.value)
     const onEmailChanged = e => setEmail(e.target.value)
     const onPasswordChanged = e => setPassword(e.target.value)
     const onFundChanged = e => setFund(e.target.value)
     const onSpentChanged = e => setSpent(e.target.value)
     const onBudgetChanged = e => setBudget(e.target.value)
 
     const onRolesChanged = e => {
         const values = Array.from(
             e.target.selectedOptions,
             (option) => option.value
         )
         setRoles(values)
     }
 
     const onDepartmentsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setDepartment(values)
    }
   

    //we want to check if we have an password updated, as well as if we have it without password updated
    const onSaveEmployeeClicked = async (e) => {
        if (password) {
            await updateEmployee({ id: employee.id, employeeName, password, employeeRole })
        } else {
            await updateEmployee({ id: employee.id, employeeName, employeeRole })
        }
    }

    const onDeleteEmployeeClicked = async () => {
        await deleteEmployee({ id: employee.id })
    }


    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const options2 = Object.values(DEPARTMENTS).map(department => {
        return (
            <option
                key={department}
                value={department}

            > {department}</option>
        )
    })

    let canSave
    if (password) {
        canSave = [employeeRole.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [employeeRole.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(employeeRole.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit employee</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveEmployeeClicked}
                            disabled={!canSave}
                        >
                        <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteEmployeeClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="employeeName">
                    Name: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="employeeName"
                    name="employeeName"
                    type="text"
                    autoComplete="off"
                    value={employeeName}
                    onChange={onUsernameChanged}
                /> 
                <label className="form__label" htmlFor="employeeSurname">
                Surname: <span className="nowrap">[3-20 letters]</span></label>
            <input
                className={`form__input ${validUserClass}`}
                id="employeeSurname"
                name="employeeSurname"
                type="text"
                autoComplete="off"
                value={employeeSurname}
                onChange={onSurnameChanged}
            />
                 <label className="form__label" htmlFor="email">
                    Email: <span className="nowrap">[incl @]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={employeeEmail}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="roles">
                    ASSIGNED DEPARTMENTS:</label>
                <select
                    id="roles"
                    name="roles"
                    multiple={true}
                    size="3"
                    value={employeeDepartment}
                    onChange={onDepartmentsChanged}
                >
                    {options2}
                </select>


                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={employeeRole}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
                <label className="form__label" htmlFor="employeeFund">
                Fund: <span className="nowrap">[number]</span></label>
            <input  
                id="employeeFund"
                name="employeeFund"
                type="text"
                autoComplete="off"
                value={employeeFund}
                onChange={onFundChanged}
            />
             <label className="form__label" htmlFor="employeeSpent">
                Spent: <span className="nowrap">[number]</span></label>
            <input    
                id="employeeSpent"
                name="employeeSpent"
                type="text"
                autoComplete="off"
                value={employeeSpent}
                onChange={onSpentChanged}
            />
              <label className="form__label" htmlFor="employeeBudget">
                Remaining Budget: <span className="nowrap">[number]</span></label>
            <input
                id="employeeBudget"
                name="employeeBudget"
                type="text"
                autoComplete="off"
                value={employeeBudget}
                onChange={onBudgetChanged}
            />

            </form>
        </>
    )



    return content


}

export default EditEmployeeForm
