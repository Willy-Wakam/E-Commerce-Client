import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        <h1> Header Component</h1>

        <Routes>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
