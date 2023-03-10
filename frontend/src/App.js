import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import useAuthContext from './hooks/useAuthContext'

import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'

const App = () => {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="page wrap">
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App