import { useState, useEffect } from "react"
import { useUpdateEmployeeMutation, useDeleteEmployeeMutation } from "./employeesApiSlice"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { DEPARTMENTS } from "../../config/departments"


//regex for checking fields
const EMPLOYEE_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


//destructuring employee({employee})
const EditEmployeeForm = ({ employee }) => {

    const { pathname } = useLocation()


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

    const [employeeName, setName] = useState(employee.employeeName)
    const [validUsername, setValidUsername] = useState(false)
    const [employeeSurname, setSurname] = useState(employee.employeeSurname)
    const [validSurname, setValidSurname] = useState(false)
    const [employeeEmail, setEmail] = useState(employee.employeeEmail)
    const [employeePassword, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [employeeRole, setRole] = useState(employee.employeeRole)
    const [employeeDepartment, setDepartment] = useState(employee.employeeDepartment)
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



    //checking for valid employeeName, surname and password
    useEffect(() => {
        setValidUsername(EMPLOYEE_REGEX.test(employeeName))
    }, [employeeName])

    useEffect(() => {
        setValidSurname(EMPLOYEE_REGEX.test(employeeSurname))
    }, [employeeSurname])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(employeePassword))
    }, [employeePassword])

    //checking issuccess and isdellsuccess effects
    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
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

    }, [isSuccess, isDelSuccess, navigate])

    //handlers, on usernamechanged, set employeeName to the inputed value
    const onNameChanged = e => setName(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onFundChanged = e => setFund(e.target.value)
    const onSpentChanged = e => setSpent(e.target.value)
    const onBudgetChanged = e => setBudget(e.target.value)
    //  const onRolesChanged = e => setRole(e.target.value)
    //  const onDepartmentsChanged = e => setDepartment(e.target.value)

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


    //we want to check if we have an password updated, as well as if we have it without password updated
    const onSaveEmployeeClicked = async (e) => {
        if (employeePassword) {
            await updateEmployee({ id: employee.id, employeeName, employeePassword, employeeRole, employeeSurname, employeeEmail, employeeDepartment, employeeFund, employeeSpent, employeeBudget })
        } else {
            await updateEmployee({ id: employee.id, employeeName, employeeRole, employeeSurname, employeeEmail, employeeDepartment, employeeFund, employeeSpent, employeeBudget })
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
    if (employeePassword) {
        canSave = [employeeRole, validUsername, validPassword, validSurname, employeeEmail, employeeDepartment.length, employeeFund, employeeSpent, employeeBudget].every(Boolean) && !isLoading
    } else {
        canSave = [employeeRole, validUsername, validSurname, employeeEmail, employeeDepartment.length, employeeFund, employeeSpent, employeeBudget].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    const saveClass = canSave ?

        "w-36 text-center p-2 bg-primary text-sm font-bold rounded text-color-white mb-4 block" :
        "w-36 text-center p-2 bg-invisible-gray text-sm font-bold rounded text-color-power-gray mb-4 block"




    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <div className='mb-4'>
                        <div className='border-b border-b-soft-gray '>

                            <header className='h-28 flex flex-wrap content-center px-20 bg-white'>
                                <div className='flex-grow'>
                                    <Link to="/dash/employees">
                                        <h1 className='text-3xl'>Edit Employee</h1>
                                        <p>{pathname}</p>
                                    </Link>
                                </div>
                            </header>
                        </div>
                    </div>
                </div>
                <div className='px-20'>
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
                    <div className="mt-5 flex gap-4">
                        <button
                            className="w-36 text-center p-2 bg-error text-sm font-bold rounded text-color-white mb-4 block"
                            onClick={onDeleteEmployeeClicked}
                            title="delete"
                        >
                            Delete
                        </button>
                        <button
                            className={saveClass}
                            onClick={onSaveEmployeeClicked}
                            title="Save"
                            disabled={!canSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    )



    return content


}

export default EditEmployeeForm
