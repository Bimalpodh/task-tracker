import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import {
  loadUserTasks,
  saveUserTasks,
  clearCurrentUser,
} from "../utils/localStoarage";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import DarkModeToggle from "./DarkModeToggle";
import Footer from "./Footer";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editTask, setEditTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (username) {
      setTasks(loadUserTasks(username));
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      saveUserTasks(username, tasks);
    }
  }, [tasks, username]);

  const logout = () => {
    clearCurrentUser();
    setUsername(null);
    navigate("/");
  };

const addTask = (task) =>
  setTasks([
    ...tasks,
    {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(), // ✅ added creation date
    },
  ]);


  const updateTask = (updated) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    setEditTask(null);
  };

  const toggleComplete = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const deleteTask = (id) =>
    window.confirm("Delete this task?") &&
    setTasks(tasks.filter((t) => t.id !== id));

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const filteredTasks = () => {
    let list = [...tasks];

    if (filter === "Completed") list = list.filter((t) => t.completed);
    if (filter === "Pending") list = list.filter((t) => !t.completed);

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term)
      );
    }

    return list.sort((a, b) => {
      const priorityDiff =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity);
    });
  };

  const counts = {
    All: tasks.length,
    Completed: tasks.filter((t) => t.completed).length,
    Pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className={`dashboard-page ${darkMode ? "dark" : ""}`}>
      <div className={`dashboard ${darkMode ? "dark" : ""}`}>
        <header className="dashboard-header">
          <div className="user-info">
            <img
              className="profile"
              src="src/assets/profile.png"
              alt="profile"
            />
            <h2>Welcome, {username}</h2>
          </div>
          <div className="header-actions">
            <DarkModeToggle
              dark={darkMode}
              toggle={() => setDarkMode(!darkMode)}
            />
            <button onClick={logout}>Logout</button>
          </div>
        </header>

        {/* 🔍 Search Input (full width) */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 🔄 Side-by-side layout */}
        <div className="dashboard-body">
          <div className="left-panel">
            <TaskForm
              addTask={addTask}
              editTask={updateTask}
              taskToEdit={editTask}
            />
            <TaskFilter
              currentFilter={filter}
              setFilter={setFilter}
              counts={counts}
            />
          </div>

          <div className="right-panel">
            <TaskList
              tasks={filteredTasks()}
              onToggle={toggleComplete}
              onEdit={setEditTask}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </div>
       <Footer />
    </div>
  );
};

export default Dashboard;
