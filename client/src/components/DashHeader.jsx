import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket,
         faFileCirclePlus,
         faFilePen,
         faUserGear,
         faUserPlus,
        } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

//const DASH_REGEX = /^\/dash(\/)?$/
const EVENTS_REGEX = /^\/dash\/events(\/)?$/
const EMPLOYEES_REGEX = /^\/dash\/employees(\/)?$/


const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()


    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewEventClicked = () => navigate('/dash/events/new')
    const onNewEmployeeClicked = () => navigate('/dash/employees/new')
    const onEventsClicked = () => navigate('/dash/events')
    const onEmployeesClicked = () => navigate('/dash/employees')


  

    //IF I WANNA ADD CLASS
    // let dashClass = null
    // if (!DASH_REGEX.test(pathname) && !EVENTS_REGEX.test(pathname) && !EMPLOYEES_REGEX.test(pathname)) {
    //     dashClass = "dash-header__container--small"
    // }

    let newEventButton = null
    if (EVENTS_REGEX.test(pathname)) {
        newEventButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewEventClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }


    let newEmployeeButton = null
    if (EMPLOYEES_REGEX.test(pathname)) {
        newEmployeeButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewEmployeeClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let employeeButton = null
    if (isManager || isAdmin) {
        if (!EMPLOYEES_REGEX.test(pathname) && pathname.includes('/dash')) {
            employeeButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onEmployeesClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let eventsButton = null
    if (!EVENTS_REGEX.test(pathname) && pathname.includes('/dash')) {
        eventsButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onEventsClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newEventButton}
                {newEmployeeButton}
                {eventsButton}
                {employeeButton}
                {logoutButton}
            </>
        )
    }

  const content = (
    <>
    <p>{error?.data?.message}</p>

   <header>
    <div>
        <Link to="/">
            <h1>Educations</h1>
            <p>{pathname}</p>
        </Link>
    </div>
   </header>
    </>
  )

return content
}

export default DashHeader
