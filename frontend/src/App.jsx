import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'


function App() {
  return (
    <main className="min-h-screen bg-gray-100">
     
      <Navbar />
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* <Route path="/projects" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />   */}
    </Routes>
   
    </main>
  )
}

export default App
