// Components/Task.tsx
import React from "react";

interface TaskProps {
  title: string;
  description: string;
  deleteTask: (index: number) => void;
  completed: boolean;

  toggleComplete: (index: number) => void;
  index: number;
}

const Task = ({
  title,
  description,
  completed,
  deleteTask,
  toggleComplete,
  index,
}: TaskProps) => {
  return (
    <div className={`task ${completed ? "completed" : ""}`}>
      <div>
        <p className={completed ? "completed-text" : ""}>{title}</p>
        <span className={completed ? "completed-text" : ""}>{description}</span>
      </div>

      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleComplete(index)}
      />

      <button onClick={() => deleteTask(index)}> - </button>
    </div>
  );
};

export default Task;
