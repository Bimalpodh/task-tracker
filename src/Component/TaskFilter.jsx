import React from "react";

const TaskFilter = ({ currentFilter, setFilter, counts }) => {
  const filters = ["All", "Completed", "Pending"];
  return (
    <div className="task-filter">
      
      {filters.map((f) => (
        <button
          key={f}
          className={currentFilter === f ? "active" : ""}
          onClick={() => setFilter(f)}
        >
          {f} ({counts[f]})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
