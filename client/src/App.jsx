import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminViewLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminProducts from './pages/admin-view/Products'
import AdminFeatures from './pages/admin-view/Features'
import AdminOrders from './pages/admin-view/Orders'
import ShoppingLayout from './components/shopping-view/Layout'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingAccount from './pages/shopping-view/Account'
import ShoppingCardCheckout from './pages/shopping-view/CheckOut'
import ShoppingProductsList from './pages/shopping-view/ProductsList'
import CheckAuth from './components/common/Check-Auth'
import UnAuthPage from './pages/un-auth/UnAuthPage'

function App() {

  const isAuthenticated = true; // Replace with actual authentication logic
  const user = {
    role: 'customer', // or 'admin' based on the logged-in user
  }; // Replace with actual user data

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>

        <Routes>
          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminViewLayout />
            </CheckAuth>
          }>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='features' element={<AdminFeatures />} />
            <Route path='orders' element={<AdminOrders />} />
          </Route>
          <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
            <Route path='home' element={<ShoppingHome />} />
            <Route path='account' element={<ShoppingAccount />} />
            <Route path='checkout' element={<ShoppingCardCheckout/>} />
            <Route path='products' element={<ShoppingProductsList />} />
          </Route>
          <Route path='*' element={<h1 className='text-3xl text-center'>Page Not Found</h1>} />
          <Route path='/unauth-page' element={<UnAuthPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
