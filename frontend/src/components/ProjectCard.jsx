import React from 'react'
import { Link } from 'react-router-dom'


const ProjectCard = ({ projects }) => {
  return (
    <div className="flex flex-col ">
      <section>
        <h2 className="font-semibold mb-2">My Projects</h2>
        <div className="grid gap-4">
          {projects?.map((p) => (
            
            <Link to={`/project/${p.id}`} key={p.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {console.log(p.id)}
              <h3 className="font-medium text-lg">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.description || "No description"}</p>
      
            </Link>
            
          ))}
        </div>
      </section>

    </div>
  )
}

export default ProjectCard