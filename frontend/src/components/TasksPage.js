import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/Tasks/TaskList';
import './TasksPage.css'


const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    completed: false,
  }); // Track the task being created
  const [isCreatingTask, setIsCreatingTask] = useState(false); // Track if creating a task
  const navigate = useNavigate();

  // Fetch tasks on page load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/content/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [navigate]);

  // Handle adding new task
  const handleTaskAdded = async (newTask) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/content/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setIsCreatingTask(false); // Close the creation modal
      setNewTask({ title: '', description: '', completed: false }); // Reset form after adding
    } catch (error) {
      console.error(error);
    }
  };

  // Handle task delete
  const handleTaskDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.delete(`http://127.0.0.1:8000/content/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  // Handle task status update (mark as completed or pending)
  const handleTaskStatusUpdate = async (taskId, status) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.patch(
        `http://127.0.0.1:8000/content/tasks/${taskId}`,
        { completed: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: status } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Handle task edit (open the edit modal/form)
  const handleTaskEdit = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  // Handle task update (submit the edited task)
  const handleTaskUpdate = async (updatedTask) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.patch(
        `http://127.0.0.1:8000/content/tasks/${updatedTask.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(
        tasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
      setEditingTask(null); // Close the edit form/modal
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes for new task creation
  const handleNewTaskChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask({
      ...newTask,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle new task form submit (create task)
  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    handleTaskAdded(newTask);
  };

  return (
    <div>


      {/* Button to trigger New Task modal */}
      <button onClick={() => setIsCreatingTask(true)}>Add New Task</button>

      {/* New Task Modal */}
      {isCreatingTask && (
        <div className="new-task-modal">
          <h3>Create New Task</h3>
          <form onSubmit={handleNewTaskSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleNewTaskChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleNewTaskChange}
                required
              />
            </label>
            <label>
              Completed:
              <input
                type="checkbox"
                name="completed"
                checked={newTask.completed}
                onChange={handleNewTaskChange}
              />
            </label>
            <button type="submit">Create Task</button>
            <button type="button" onClick={() => setIsCreatingTask(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <TaskList
        tasks={tasks}
        onDelete={handleTaskDelete}
        onUpdateStatus={handleTaskStatusUpdate}
        onEdit={handleTaskEdit}
      />

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="edit-task-modal">
          <h3>Edit Task</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTaskUpdate(editingTask);
            }}
          >
            <label>
              Title:
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
              />
            </label>
            <label>
              Description:
              <textarea
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={editingTask.completed}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    completed: e.target.checked,
                  })
                }
              />
            </label>
            <button type="submit">Update Task</button>
            <button type="button" onClick={() => setEditingTask(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
