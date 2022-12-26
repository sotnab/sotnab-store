import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="page">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App