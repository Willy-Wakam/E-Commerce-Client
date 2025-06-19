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
          <Route path='/shop' element={<ShoppingLayout />}>
            <Route path='home' element={<ShoppingHome />} />
            <Route path='account' element={<ShoppingAccount />} />
            <Route path='checkout' element={<ShoppingCardCheckout/>} />
            <Route path='products' element={<ShoppingProductsList />} />
          </Route>
          <Route path='*' element={<h1 className='text-3xl text-center'>Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
