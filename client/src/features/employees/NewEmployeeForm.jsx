import React from 'react'
import { useState, useEffect } from "react"
import { useAddNewEmployeeMutation } from './employeesApiSlice'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import { DEPARTMENTS } from "../../config/departments"


//input guidlines..
const EMPLOYEE_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const NewEmployeeForm = () => {

    const { pathname } = useLocation()


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
    const canSave = [employeeRole, validUsername, validPassword, validSurname, employeeEmail, employeeDepartment, employeeFund, employeeSpent, employeeBudget].every(Boolean) && !isLoading

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
    const saveClass = canSave ? "w-36 text-center p-2 bg-primary text-sm font-bold rounded text-color-white mb-4 block" :
    "w-36 text-center p-2 bg-invisible-gray text-sm font-bold rounded text-color-power-gray mb-4 block"


    const content = (
        <>
            <div className='mb-4'>
                    <div className='border-b border-b-soft-gray '>
                        <header className='h-28 flex flex-wrap content-center px-20 bg-white'>
                            <div className='flex-grow'>
                                <Link to="/dash/employees">
                                    <h1 className='text-3xl'>New Employee</h1>
                                    <p>{pathname}</p>
                                </Link>
                            </div>
                        </header>
                    </div>
                </div>
            <form className="px-20 place-content-center w-96" onSubmit={onSaveEmployeeClicked}>
                <div className="text-lg font-bold py-5">
                    <h2>Add New Employee</h2>
                </div>
                <div className='w-80 '>
                    <label className="block" htmlFor="name">
                        Name*<span className="nowrap">[3-20 letters]</span></label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="off"
                        placeholder="Name"
                        className='border rounded-lg text-base w-80 block p-2'
                        value={employeeName}
                        onChange={onNameChanged}
                    />
                    </div>
                    <div className='w-80'>
                    <label className="block" htmlFor="employeeSurname">
                        Surname*<span className="nowrap">[3-20 letters]</span></label>
                    <input
                        id="employeeSurname"
                        name="employeeSurname"
                        type="text"
                        autoComplete="off"
                        value={employeeSurname}
                        placeholder="Surname"
                        className='border rounded-lg text-base w-80 block p-2'
                        onChange={onSurnameChanged}
                    />
                </div>
                <div className='w-80'>
                    <label className="w-80" htmlFor="password">
                        Password* <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className='border rounded-lg text-base w-80 block p-2'
                        value={employeePassword}
                        onChange={onPasswordChanged}
                    />
                </div>
                <div className='w-80'>
                    <label className="block" htmlFor="email">
                        Email* <span className="nowrap">[incl @]</span></label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="email"
                        className='border rounded-lg text-base w-80 block p-2'
                        autoComplete="off"
                        value={employeeEmail}
                        onChange={onEmailChanged}
                    />
                </div>
                <div className='w-80'>
                    <label className="form__label" htmlFor="departments">
                        ASSIGNED DEPARTMENTS*</label>
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
                </div>
                <div className='w-80'>
                    <label className="block" htmlFor="roles">
                        ASSIGNED ROLES*</label>
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
                </div>
                <div className='w-80'>
                    <label className="block" htmlFor="employeeFund">
                        Fund*</label>
                    <input
                        id="employeeFund"
                        name="employeeFund"
                        type="text"
                        autoComplete="off"
                        value={employeeFund}
                        onChange={onFundChanged}
                        placeholder="$"
                        className='border rounded-lg text-base w-80 block p-2'
                    />
                </div>
                <div className='w-80'>
                    <label className="form__label" htmlFor="employeeSpent">
                        Spent*</label>
                    <input
                        id="employeeSpent"
                        name="employeeSpent"
                        type="text"
                        autoComplete="off"
                        value={employeeSpent}
                        placeholder="$"
                        className='border rounded-lg text-base w-80 block p-2'
                        onChange={onSpentChanged}
                    />
                </div>
                <div className='w-80'>
                    <label className="form__label" htmlFor="employeeBudget">
                        Remaining Budget* </label>
                    <input
                        id="employeeBudget"
                        name="employeeBudget"
                        type="text"
                        autoComplete="off"
                        value={employeeBudget}
                        placeholder="$"
                        className='border rounded-lg text-base w-80 block p-2'
                        onChange={onBudgetChanged}
                    />
                </div>
            <p className="bg-error">{error?.data?.message}</p>
                <div className="mt-5">
                    <button
                        className={saveClass}
                        title="Save"
                        disabled={!canSave}
                    >
                        Create
                    </button>
                </div>
            </form>
        </>
    )

    return content
}

export default NewEmployeeForm
