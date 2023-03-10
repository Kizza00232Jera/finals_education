import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Public from './pages/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import EmployeesList from './features/employees/EmployeesList';
import EditEmployee from './features/employees/EditEmployee';
import NewEmployeeForm from './features/employees/NewEmployeeForm';
import EditEvent from './features/events/EditEvent';
import NewEvent from './features/events/NewEvent';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';
import EducationsPage from './pages/EducationsPage';

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

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="employees">
                    <Route index element={<EmployeesList />} />
                    <Route path=":id" element={<EditEmployee />} />
                    <Route path="new" element={<NewEmployeeForm />} />
                  </Route>
                </Route>

                <Route path="events">
                  <Route index element={<EducationsPage />} />
                  <Route path=":id" element={<EditEvent />} />
                  <Route path="new" element={<NewEvent />} />
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
