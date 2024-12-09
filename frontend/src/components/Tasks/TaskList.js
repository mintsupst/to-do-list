import React from 'react';
// import './TaskList.css'

const TaskList = ({ tasks, onDelete, onUpdateStatus, onEdit }) => {
  return (
    <div>
      <h3>Tasks</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>
            
            <div className="task-actions">
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
              <button onClick={() => onUpdateStatus(task.id, !task.completed)}>
                {task.completed ? "Mark as Pending" : "Mark as Completed"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
