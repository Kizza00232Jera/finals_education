import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Public from './pages/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import EditEmployee from './features/employees/EditEmployee';
import NewEmployeeForm from './features/employees/NewEmployeeForm';
import EditEvent from './features/events/EditEvent';
import NewEventPage from './pages/NewEventPage';
import EventPage from './pages/EventPage';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';
import EventsPage from './pages/EventsPage';
import EmployeePage from './pages/EmployeePage';
import EmployeesPage from './pages/EmployeesPage';
import NewEducationPage from './pages/NewEducationPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

              
              {/* <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>*/}  
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path="employees">
                    <Route index element={<EmployeesPage />} />
                    <Route path=":id" element={<EditEmployee />} />
                    <Route path="new" element={<NewEducationPage />} />
                  <Route path="employee/:id" element={<EmployeePage />} />

                  </Route>
                </Route>

                <Route path="events">
                  <Route index element={<EventsPage />} />
                  <Route path=":id" element={<EditEvent />} />
                  <Route path="new" element={<NewEventPage />} />
                  <Route path="event/:id" element={<EventPage />} />
                </Route>


              </Route> {/* end dash */}
            </Route> {/* end prefetch */}
          </Route> {/* end require auth */}
        </Route> {/* end persistlogin */}

      </Route> {/* end public routes */}
    </Routes>

  );
}

export default App;
