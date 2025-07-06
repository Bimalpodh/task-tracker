import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="notask">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
