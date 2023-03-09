import React, {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { faRightFromBracket, faTrophy, faUserGear } from "@fortawesome/free-solid-svg-icons"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import edulogo from '../img/edulogo.png'





const LeftNav = () => {

    const { employeeEmail, status, isManager, isAdmin } = useAuth()

    const navigate = useNavigate()

    const [sendLogout, { 
        isSuccess   
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])



    const logoutBtn = (
        <Link
        to="/login"
        className='flex p-3' 
        title="Logout"
        onClick={sendLogout}
        >
        <button>
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
        <p className='font-base pl-2'>Logout</p>
           
        </Link> 
    )

    let eduListBtn = null
        eduListBtn = (
            <Link
            to="http://localhost:3000/dash/events"
            className='flex p-3'
            title="educations"
            >
            
            <button>
                <FontAwesomeIcon icon={faTrophy} />
            </button>
            <p className='font-base pl-2'>Educations</p>
            </Link>
            
        )
    

    let myEduBtn = null
        myEduBtn = (
            <Link
             to="http://localhost:3000/dash/events"
             className='flex p-3'
             title="myeducations"  
            >
            <button>
                <FontAwesomeIcon icon={faTrophy} />
            </button>
            <p className='font-base pl-2'>My Educations</p>
            
            </Link>
        )
    

    let employeeBtn = null
    if (isManager || isAdmin) {
            employeeBtn = (
            <Link
            to="http://localhost:3000/dash/employees"
             className='flex p-3'
             title="employees"  
            >
            <button>
                <FontAwesomeIcon icon={faUserGear} />
            </button>
            <p className='font-base pl-2'>Employees</p>
            
            </Link>
        )         
    }

    const content = (
        <div className='max-w-sm'>
        <div>
          <img src={edulogo} className="object-fill h-12 w-40" alt="logo" />
        </div>
        <section>
            {employeeBtn}
        </section>
        <section>
            {eduListBtn}
        </section>
        <section>
            {myEduBtn}
        </section>

        <footer>
            <div>
           {logoutBtn}
            </div>
            <div className='bg-smoke-gray'>
            <p className='text-sm text-power-gray'>Current User:{employeeEmail}</p>
            <p className='text-sm font-bold'>Status: {status}</p>
            </div>
        </footer>
        </div>
    )

    return content
}

export default LeftNav