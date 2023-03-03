import React from 'react'
import { useState, useEffect } from "react"
import { useAddNewEmployeeMutation } from './employeesApiSlice'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

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
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Employee"])

    //useeffect will help validate username and password..testing REGEX that was defined above
    useEffect(() => {
      setValidUsername(EMPLOYEE_REGEX.test(username))
  }, [username])

  useEffect(() => {
      setValidPassword(PWD_REGEX.test(password))
  }, [password])

    //check if issuccess status its gonna navigate back to /employees
    useEffect(() => {
      if (isSuccess) {
          setUsername('')
          setPassword('')
          setRoles([])
          navigate('/dash/employees')          
      }
  }, [isSuccess, navigate])

    //handlers.. sets username and pw...
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    //we allow more roles to be selected
    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    //checking if all of these are true
    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    
    //calling add new employee mutation
    const onSaveEmployeeClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewEmployee({ username, password, roles })
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
  
  
      //classes that we might or might not want to apply -- update w tailwind classes
      const errClass = isError ? "errmsg" : "offscreen"
      const validUserClass = !validUsername ? 'form__input--incomplete' : ''
      const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
      const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


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
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
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
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

  return content
}

export default NewEmployeeForm
