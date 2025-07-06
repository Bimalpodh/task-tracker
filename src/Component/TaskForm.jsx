import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, editTask, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDesc(taskToEdit.description);
      setPriority(taskToEdit.priority || "Medium");
      setDueDate(taskToEdit.dueDate || "");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const task = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description: desc,
      priority,
      dueDate,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString(),
      completed: taskToEdit ? taskToEdit.completed : false,
    };

    taskToEdit ? editTask(task) : addTask(task);
    setTitle("");
    setDesc("");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <select className="taskPriority" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">🔴 High</option>
        <option value="Medium">🟠 Medium</option>
        <option value="Low">🟢 Low</option>
      </select>
      <label> Enter Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">{taskToEdit ? "Update" : "Add"} Task</button>
    </form>
  );
};

export default TaskForm;
