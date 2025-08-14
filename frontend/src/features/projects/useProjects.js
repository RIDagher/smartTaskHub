// src/features/projects/useProjects.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/services/apiClient";
import { useAuth } from "@/features/auth/useAuth";

/**
 * GET /user/:id/projects
 * - queryKey includes the user id so each user's cache is isolated
 * - enabled prevents calling the API until we know the user id
 * - staleTime keeps data "fresh" for 60s to avoid chatty refetches
 */
export function useProjects() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["projects", user?.id], // Unique key for each user's projects
    enabled: !!user?.id, // Only fetch if user ID is available
    queryFn: () => apiFetch("/projects?member=me"), // Fetch projects for the authenticated user
    staleTime: 60_000, // Keep data fresh for 60 seconds
  });
}

/**
 * GET /project/:id
 * - fetches a single project
 */
export function useProject(projectId) {
  return useQuery({
    queryKey: ["project", projectId], // Unique key for each project
    enabled: !!projectId, // `projectId` must be defined
    queryFn: () => apiFetch(`/project/${projectId}`), // Fetch project by ID
  });
}

/**
 * POST /user/:id/project
 * - creates a project and invalidates the list so it refetches
 */
export function useCreateProject() {
  const { user } = useAuth(); // Get the authenticated user
  const qc = useQueryClient(); // Get the query client

  return useMutation({ // Create a mutation for creating a project
    mutationFn: (payload) => // Call the API to create a new project
      apiFetch(`/user/${user.id}/project`, { 
        method: "POST",
        body: JSON.stringify(payload), // Send the project data as JSON
      }),
    onSuccess: () => { // Invalidate the projects query on success
      qc.invalidateQueries({ queryKey: ["projects", user.id] }); // Refetch projects for the user
    },
  });
}