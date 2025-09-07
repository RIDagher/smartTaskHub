import React from 'react'
import { useProject } from '../features/projects/useProjects'
import { useParams } from 'react-router-dom'
import TaskCard from '../components/TaskCard';
import { useTasks } from '../features/tasks/useTasks';

const Project = () => {
    const { id } = useParams();
    const projectId = Number(id);
    
const {data: tasks} = useTasks()
  const { data: project, isLoading, isError, error } = useProject(projectId)

  
 console.log("Project data:", project);

  if (isLoading) return <p>Loading project…</p>
  if (isError) return <p className="text-red-600">{error.message}</p>

  return (
    <div className='p-20'>
        
      <h2 className="font-semibold mb-2">{project.project.name}</h2>
      <TaskCard tasks={tasks}/>
     
      
    </div>
  )
}

export default Project