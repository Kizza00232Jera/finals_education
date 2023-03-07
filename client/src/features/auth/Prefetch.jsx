import { store } from '../../app/store'
import { eventsApiSlice } from '../events/eventsApiSlice'
import { employeesApiSlice } from '../employees/employeesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';


//we only want this to run when component mounts

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        //initiate is creating that subscription
        const events = store.dispatch(eventsApiSlice.endpoints.getEvents.initiate())
        const employee = store.dispatch(employeesApiSlice.endpoints.getEmployees.initiate())

        //unsubscribe if we leave protected mode
        return () => {
            console.log('unsubscribing')
            events.unsubscribe()
            employee.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch