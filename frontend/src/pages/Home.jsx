import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
         style={{ backgroundImage: "url('')" }}>
      <div className="bg-black/60 p-8 rounded-md text-center">
        <h1 className="text-4xl font-bold mb-4">Smart Task Hub</h1>
        <p className="mb-6">Manage tasks, projects, and productivity with ease.</p>
        <Link to="/login" className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200">
          Sign In
        </Link>
      </div>
    </div>
  )
}