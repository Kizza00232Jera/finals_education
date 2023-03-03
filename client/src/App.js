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
import EditNote from './features/events/EditNote';
import NewNote from './features/events/NewNote';
import Prefetch from './features/auth/Prefetch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Public />}/>
        <Route path="login" element={<Login/>}/>

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
            <Route path=":id" element={<EditNote />} />
            <Route path="new" element={<NewNote />} />
          </Route>


        </Route> {/* end dash */}
        </Route> {/* end prefetch */}
        </Route>
    </Routes>
  
  );
}

export default App;
