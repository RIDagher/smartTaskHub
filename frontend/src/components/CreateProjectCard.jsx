import React from 'react'
import { useState } from 'react';
import { useCreateProject } from "../features/projects/useProjects";

const CreateProjectCard = () => {

    // Call the custom hook to get the createProject function
    const createProject = useCreateProject();

    // Initialize form data state
    const [formData, setFormData] = useState({
        name:"",
        description:""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProject.mutateAsync(formData);
            setFormData({ name: "", description: "" }); // Reset form after submission
            // Redirect to the project dashboard or another page
            window.location.href = "/user-dashboard";
        } catch (error) {
            console.error("Error creating project:", error);
        }

    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Create Project</h2>
            <input
                type="text"
                placeholder="Project Name"
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value }) } // Update name

            />
            <textarea
                placeholder="Project Description"
                className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} // Update description

            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"

            >
                Create Project
            </button>
            <button type='button' className="bg-gray-500 text-white rounded-lg py-2 px-4 hover:bg-gray-600">
                Cancel

            </button>
        </div>
    </form>
  )
}

export default CreateProjectCard