import React from 'react'
import { useState, useEffect } from "react"
import { useAddNewEmployeeMutation } from './employeesApiSlice'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { DEPARTMENTS } from "../../config/departments"


//input guidlines..
const EMPLOYEE_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const NewEmployeeForm = () => {

    //addnewemployeemutation, gives us an add new employee function that we can call when we need it.
    const [addNewEmployee, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewEmployeeMutation()

    //react router hook... navigate function
    const navigate = useNavigate()

    //usestate.. 
    const [employeeName, setName] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [employeeSurname, setSurname] = useState('')
    const [validSurname, setValidSurname] = useState(false)
    const [employeeEmail, setEmail] = useState('')
    const [employeePassword, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [employeeRole, setRole] = useState(["Employee"])
    const [employeeDepartment, setDepartment] = useState(["Developer"])
    const [employeeFund, setFund] = useState('')
    const [employeeSpent, setSpent] = useState('')
    const [employeeBudget, setBudget] = useState('')


    //useeffect will help validate username and password..testing REGEX that was defined above
    useEffect(() => {
        setValidUsername(EMPLOYEE_REGEX.test(employeeName))
    }, [employeeName])

    useEffect(() => {
        setValidSurname(EMPLOYEE_REGEX.test(employeeSurname))
    }, [employeeSurname])


    useEffect(() => {
        setValidPassword(PWD_REGEX.test(employeePassword))
    }, [employeePassword])

    //check if issuccess status its gonna navigate back to /employees
    useEffect(() => {
        if (isSuccess) {
            setName('')
            setSurname('')
            setPassword('')
            setEmail('')
            setRole([])
            setDepartment([])
            setFund('')
            setSpent('')
            setBudget('')
            navigate('/dash/employees')
        }
    }, [isSuccess, navigate])

    //handlers.. sets username and pw...
    const onNameChanged = e => setName(e.target.value)
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
        setRole(values)
    }

    const onDepartmentsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setDepartment(values)
    }

    //checking if all of these are true
    //const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    const canSave = [employeeRole, validUsername, validPassword, validSurname, employeeEmail, employeeDepartment.length, employeeFund, employeeSpent, employeeBudget].every(Boolean) && !isLoading

    //calling add new employee mutation
    const onSaveEmployeeClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewEmployee({ employeeName, employeePassword, employeeRole, employeeSurname, employeeEmail, employeeDepartment, employeeFund, employeeSpent, employeeBudget })
        }
    }

    //cus we have select for roles, we will need options
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


    //classes that we might or might not want to apply -- update w tailwind classes
    const errClass = isError ? "errmsg" : "offscreen"
    //   const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    //   const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    //   const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <form className="form" onSubmit={onSaveEmployeeClicked}>
                <div className="form__title-row">
                    <h2>New Employee</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="name">
                    Name : <span className="nowrap">[3-20 letters]</span></label>
                <input

                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={employeeName}
                    onChange={onNameChanged}
                />
                <label className="form__label" htmlFor="employeeSurname">
                    Surname: <span className="nowrap">[3-20 letters]</span></label>
                <input

                    id="employeeSurname"
                    name="employeeSurname"
                    type="text"
                    autoComplete="off"
                    value={employeeSurname}
                    onChange={onSurnameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input

                    id="password"
                    name="password"
                    type="password"
                    value={employeePassword}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="email">
                    Email: <span className="nowrap">[incl @]</span></label>
                <input

                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={employeeEmail}
                    onChange={onEmailChanged}
                />
                <label className="form__label" htmlFor="departments">
                    ASSIGNED DEPARTMENTS:</label>
                <select
                    id="departments"
                    name="departments"
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

export default NewEmployeeForm
