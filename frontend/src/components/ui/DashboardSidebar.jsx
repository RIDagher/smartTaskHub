import { Link } from "react-router-dom";

function DashboardSidebar() {
  return (
    <div className="sidebar">
      <h2 className="font-semibold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/projects" className="underline">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/project-members" className="underline">
            Project Members
          </Link>
        </li>
        <li>
          <Link to="/create-project" className="underline">
            Create a Project
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSidebar;
