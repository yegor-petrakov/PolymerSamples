import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Home from './features/auth/Home'
import RequireAuth from './features/auth/RequireAuth'
import PersistLogin from './features/auth/PersistLogin';

import CodesList from './features/codes/CodesList';
import EditCode from './features/codes/EditCode';
import CreateCode from './features/codes/CreateCode';

import VaultsList from './features/vaults/VaultsList';
import CreateVault from './features/vaults/CreateVault';
import EditVault from './features/vaults/EditVault';

import UsersList from './features/users/UsersList'
import CreateUser from './features/users/CreateUser';
import EditUser from './features/users/EditUser';

import useTitle from './hooks/useTitle';

function App() {
  useTitle('Система управления образцами')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={['viewer', 'editor', 'admin']} />}>
            <Route path="dash" element={<DashLayout />}>

              <Route index element={<Home />} />

              <Route path='codes'>
                <Route index element={<CodesList />} />
                <Route element={<RequireAuth allowedRoles={['editor', 'admin']} />}>
                  <Route path=':id' element={<EditCode />} />
                  <Route path='create' element={<CreateCode />} />
                </Route>
              </Route>

              <Route path='vaults'>
                <Route index element={<VaultsList />} />
                <Route element={<RequireAuth allowedRoles={['editor', 'admin']} />}>
                  <Route path='create' element={<CreateVault />} />
                  <Route path=':id' element={<EditVault />} />
                </Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={['admin']} />}>
                <Route path='users'>
                  <Route index element={<UsersList />} />
                  <Route path='create' element={<CreateUser />} />
                  <Route path=':id' element={<EditUser />} />
                </Route>
              </Route>

            </Route>{/* End Dash */}
          </Route>
        </Route>



      </Route>
    </Routes >
  );
}

export default App;