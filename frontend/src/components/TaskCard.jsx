import React from 'react'

const TaskCard = ({ tasks }) => {
  return (
    <table className="table-auto md:table-fixed w-full">
      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Assigned To</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((t) => (
          <tr key={t.id}>
            <td>{t.title}</td>
            <td>{t.status}</td>
            <td>{t.due_date}</td>
            <td>{t.assigned_to}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TaskCard