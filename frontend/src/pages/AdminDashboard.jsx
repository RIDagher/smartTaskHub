import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-semibold mb-4">Admin Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2">Manage Users</h3>
            <p className="text-gray-600 text-sm mb-3">View and manage all users in the system</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Manage Users
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2">System Settings</h3>
            <p className="text-gray-600 text-sm mb-3">Configure system-wide settings</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Settings
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2">Reports</h3>
            <p className="text-gray-600 text-sm mb-3">View system reports and analytics</p>
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              View Reports
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;