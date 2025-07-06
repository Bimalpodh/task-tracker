import React from "react";

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div
      className={`task ${
        task.completed ? "completed" : ""
      } ${task.priority?.toLowerCase()}`}
    >
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
         <small className={`priority-label ${task.priority?.toLowerCase()}`}>
          Priority: {task.priority}
        </small>
        <br />
        <small>Due: {task.dueDate || "No date set"}</small>
        <br />
        <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
        <br />
        <small className="status-label">
          {task.completed ? "✅ Completed" : "🕒 Pending"}
        </small>
        <br />
       
      </div>

      <div className="task-actions">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          title="Toggle Complete"
        />
        <button onClick={() => onEdit(task)} title="Edit Task">
          ✏️
        </button>
        <button onClick={() => onDelete(task.id)} title="Delete Task">
          🗑
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
