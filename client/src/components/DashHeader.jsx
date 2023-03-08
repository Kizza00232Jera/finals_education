import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

// const DASH_REGEX = /^\/dash(\/)?$/
// const EVENTS_REGEX = /^\/dash\/events(\/)?$/
// const EMPLOYEES_REGEX = /^\/dash\/employees(\/)?$/


const DashHeader = () => {

    const navigate = useNavigate()
    // const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    //IF I WANNA ADD CLASS
    // let dashClass = null
    // if (!DASH_REGEX.test(pathname) && !EVENTS_REGEX.test(pathname) && !EMPLOYEES_REGEX.test(pathname)) {
    //     dashClass = "dash-header__container--small"
    // }

    const logoutButton = (
        <button
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

  return (
   <header>
    <div>
        <Link to="/">
            <h1>EDU</h1>
        </Link>
        <nav>
            <Link to="">EDU</Link>
            <Link to="">Educations</Link>
            <Link to="">Library</Link>
            <Link to="">My educations</Link>
            <nav>
            {logoutButton}
            </nav>
            <div>Profile</div>
        </nav>
    </div>
   </header>
  )
}

export default DashHeader
