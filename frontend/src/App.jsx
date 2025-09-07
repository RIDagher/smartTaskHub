import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import DashboardLayout from "./layouts/DashboardLayout";
import CreateProject from './pages/CreateProject'
import ProjectsPage from './pages/ProjectsPage'
import ProjectMembers from './pages/ProjectMembers'
import Project from './pages/Project'





function App() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
        <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='project/:id' element={<Project />} />
        
        

         {/* User dashboard (everything renders inside DashboardLayout via <Outlet />) */}
      <Route path="/user-dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path='projects' element={<ProjectsPage />} />
          <Route path='project-members' element={<ProjectMembers />} />
          <Route path='create-project' element={<CreateProject />} />
          
        </Route>


        <Route
          path="/admin-dashboard"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />

        
      </Routes>
    </main>
  );
}

export default App
