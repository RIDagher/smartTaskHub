import React from "react";
import { Sidebar, SidebarContent, SidebarProvider, SidebarHeader, SidebarFooter, SidebarGroupLabel } from "../components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

function DashboardLayout() {
  const { user } = useAuth();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background pt-30 w-full">
        <Sidebar className="w-64 pt-20 flex-shrink-0">
          <SidebarHeader>Workspace</SidebarHeader>
          <SidebarGroupLabel>{user?.username}'s Workspace</SidebarGroupLabel>
          <SidebarContent>
            <ul className="space-y-2">
              <li>
                <Link to="projects" className="block p-2 hover:bg-gray-100 rounded">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="project-members" className="block p-2 hover:bg-gray-100 rounded">
                  Project Members
                </Link>
              </li>
              <li>
                <Link to="create-project" className="block p-2 hover:bg-gray-100 rounded">
                  Create a Project
                </Link>
              </li>
            </ul>
          </SidebarContent>
          <SidebarFooter>
            <p className="text-xs text-gray-500 pb-5">Logged in as {user?.email}</p>
          </SidebarFooter>
        </Sidebar>
        <main className="p-10">
          <h1 className="text-2xl font-bold mb-4">Workspace</h1>
          <hr className="border-gray-300 mb-6" />
          <Outlet />
          
        </main>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
