import ProjectCard from "../components/ProjectCard";
import { useProjects} from "../features/projects/useProjects";



export default function ProjectsPage() {
  const { data: projects, isLoading, isError, error } = useProjects();

  

  if (isLoading) return <p>Loading projects…</p>;
  if (isError) return <p className="text-red-600">{error.message}</p>;

  return (
    <div className="flex flex-row ">
      
      <ProjectCard projects={projects} />
    </div>
  );
}