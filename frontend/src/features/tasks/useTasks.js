// src/features/projects/useProjects.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/services/apiClient";

import { useParams } from 'react-router-dom'
import { useProject } from '../projects/useProjects'

export function useTasks() {

    const { id } = useParams();
    const projectId = Number(id);
    

  const { data: project } = useProject(projectId)

     return useQuery({
    queryKey: ["tasks", project?.id], // Unique key for each user's projects
    enabled: !!project?.id, // Only fetch if user ID is available
    queryFn: () => apiFetch("/project/:id/task"), // Fetch projects for the authenticated user
    staleTime: 60_000, // Keep data fresh for 60 seconds
  });
}

// export function useCreateProject() {
//   const { user } = useAuth(); // Get the authenticated user
//   const qc = useQueryClient(); // Get the query client

//   return useMutation({ // Create a mutation for creating a project
//     mutationFn: (payload) => // Call the API to create a new project
//       apiFetch(`/user/${user.id}/project`, { 
//         method: "POST",
//         body: JSON.stringify(payload), // Send the project data as JSON
//       }),
//     onSuccess: () => { // Invalidate the projects query on success
//       qc.invalidateQueries({ queryKey: ["projects", user.id] }); // Refetch projects for the user
//     },
//   });
// }