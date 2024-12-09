import React, { useState } from 'react';
import axios from 'axios';
// import './NewTask.css'

const NewTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://127.0.0.1:8000/content/tasks', 
        { title, description }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onTaskAdded(response.data);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default NewTask;
