import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminViewLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminProducts from './pages/admin-view/Products'
import AdminFeatures from './pages/admin-view/Features'
import AdminOrders from './pages/admin-view/Orders'

function App() {

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>

        <Routes>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/admin' element={<AdminViewLayout />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='features' element={<AdminFeatures />} />
            <Route path='orders' element={<AdminOrders />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
