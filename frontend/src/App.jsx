import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import Homepage from './pages/Homepage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/authActions'
import { Navigate } from 'react-router-dom'
import Nav from './components/Nav'


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return isAuthenticated ? children : <Navigate to="/login" />
}


function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Nav />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/landing"
              element={
                <ProtectedRoute>
                  <LandingPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <footer>
          <p>© 2025</p>
        </footer>
      </div>
    </>
  );
}

export default App
