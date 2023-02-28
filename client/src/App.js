import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import EventList from './features/events/EventList';
import EmployeesList from './features/employees/EmployeeList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}/>
        <Route index element={<Public />}/>
        <Route path="login" element={<Login/>}/>

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome/>} />

          <Route path="events">
            <Route index element={<EventList />} />
          </Route>
          <Route path="employees">
            <Route index element={<EmployeesList />} />
          </Route>



        </Route> {/* end dash */}

    </Routes>
  
  );
}

export default App;
