import React, {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { faRightFromBracket, faTrophy, faUserEdit, faUserGear } from "@fortawesome/free-solid-svg-icons"
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
        className='flex p-3 hover:bg-blue-hover hover:text-primary' 
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
            className='flex p-3 hover:bg-blue-hover hover:text-primary'
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
             to="http://localhost:3000/dash/events/myevents"
             className='flex p-3 hover:bg-blue-hover hover:text-primary'
             title="myeducations"  
            >
            <button>
                <FontAwesomeIcon icon={faTrophy} />
            </button>
            <p className='font-base pl-2'>My Educations</p>
            
            </Link>
        )
    

    let employeeBtn = null
            employeeBtn = (
            <Link 
            to="http://localhost:3000/dash/employees"
             className='flex p-3 hover:bg-blue-hover hover:text-primary'
             title="employees"  
            >
            <button>
                <FontAwesomeIcon icon={faUserGear} />
            </button>
            <p className='font-base pl-2'>Employees</p>
            
            </Link>
        )         


    let addEmployeeBtn = null
    if (isManager || isAdmin) {
        addEmployeeBtn = (
            <Link 
            to="http://localhost:3000/dash/employees/new"
             className='flex p-3 hover:bg-blue-hover hover:text-primary'
             title="employees"  
            >
            <button>
                <FontAwesomeIcon icon={faUserEdit} />
            </button>
            <p className='font-base pl-2'>Add Employee</p>
            
            </Link>
        )         
    }

    const content = (
        <div className=' border-r border-soft-gray min-h-screen flex flex-col'>
        <div className='basis-2/12 pt-8 self-center'>
          <img src={edulogo} className="object-fill h-12 w-40" alt="logo" />
        </div>
        <div className='basis-9/12'>

        <section >
            {employeeBtn}
        </section>
        <section>
            {eduListBtn}
        </section>
        <section>
            {myEduBtn}
        </section>
        <section >
            {addEmployeeBtn}
        </section>
        </div>
        <footer className='basis-1/12 '>
            <div className='mb-4'>
           {logoutBtn}
            </div>
            <div className='bg-smoke-gray p-3 py-2 flex-none'>
            <p className='text-sm text-rich-gray'>Current User:{employeeEmail}</p>
            <p className='text-sm font-bold text-black'>{status}</p>
            </div>
        </footer>
        </div>
    )

    return content
}

export default LeftNav