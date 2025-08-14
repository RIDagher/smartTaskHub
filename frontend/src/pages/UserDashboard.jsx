// src/features/dashboard/UserDashboard.jsx
import { useState } from "react";
import { useProjects, useProject } from "@/features/projects/useProjects";

export default function UserDashboard() {
  // Calls GET /user/:id/projects (based on the logged-in user)
  const { data: projects, isLoading, isError, error } = useProjects();

  console.log("Projects data:", projects);

  // Keeps track of which project the user clicked
  const [activeProjectId, setActiveProjectId] = useState(null);

  // When activeProjectId changes, calls GET /project/:id
  const single = useProject(activeProjectId);

  if (isLoading) return <p>Loading projects…</p>;
  if (isError)   return <p className="text-red-600">{error.message}</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section>
        <h2 className="font-semibold mb-2">My Projects</h2>
        <ul className="space-y-2">
          {projects?.map((p) => (
            <li key={p.id}>
              <button className="underline" onClick={() => setActiveProjectId(p.id)}>
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Project Details</h2>
        {!activeProjectId ? (
          <p>Select a project</p>
        ) : single.isLoading ? (
          <p>Loading…</p>
        ) : single.isError ? (
          <p className="text-red-600">{single.error.message}</p>
        ) : (
          <pre className="text-sm">{JSON.stringify(single.data, null, 2)}</pre>
        )}
      </section>
    </div>
  );
}