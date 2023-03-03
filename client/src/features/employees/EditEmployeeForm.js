import { useState, useEffect } from "react"
import { useUpdateEmployeeMutation, useDeleteEmployeeMutation } from "./employeesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"


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
    const [username, setUsername] = useState(employee.employeeName)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [employeeRole, setRoles] = useState(employee.employeeRole)
    

    //checking for valid username and password
    useEffect(() => {
        setValidUsername(EMPLOYEE_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

     //checking issuccess and isdellsuccess effects
     useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/employees')
        }

    }, [isSuccess, isDelSuccess, navigate])

     //handlers, on usernamechanged, set username to the inputed value
     const onUsernameChanged = e => setUsername(e.target.value)
     const onPasswordChanged = e => setPassword(e.target.value)
 
     const onRolesChanged = e => {
         const values = Array.from(
             e.target.selectedOptions,
             (option) => option.value
         )
         setRoles(values)
     }
 
   

    //we want to check if we have an password updated, as well as if we have it without password updated
    const onSaveEmployeeClicked = async (e) => {
        if (password) {
            await updateEmployee({ id: employee.id, username, password, employeeRole })
        } else {
            await updateEmployee({ id: employee.id, username, employeeRole })
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
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
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

            </form>
        </>
    )



    return content


}

export default EditEmployeeForm
