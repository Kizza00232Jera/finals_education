import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import EventsList from './features/events/EventsList';
import EmployeesList from './features/employees/EmployeeList';
import EditEmployee from './features/employees/EditEmployee';
import NewEmployeeForm from './features/employees/NewEmployeeForm';
import EditEvent from './features/events/EditEvent';
import NewEvent from './features/events/NewEvent';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public />}/>
        <Route path="login" element={<Login/>}/>

        <Route element={<PersistLogin />}> 
        <Route element={<Prefetch />}> 
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome/>} />
          
          <Route path="employees">
            <Route index element={<EmployeesList />} />
            <Route path=":id" element={<EditEmployee />} />
            <Route path="new" element={<NewEmployeeForm />} />
          </Route>

          <Route path="events">
            <Route index element={<EventsList />} />
            <Route path=":id" element={<EditEvent />} />
            <Route path="new" element={<NewEvent />} />
          </Route>


        </Route> {/* end dash */}
        </Route> {/* end prefetch */}
        </Route> {/* end persistlogin */}
        </Route>
    </Routes>
  
  );
}

export default App;
