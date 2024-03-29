// Components/Task.tsx
import React from "react";
import { Todo } from "./Home";
import { useNavigate } from "react-router-dom";

interface TaskProps {
  taskData: Todo;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string, checked: boolean) => void;
}

const Task = ({ taskData, deleteTask, toggleComplete }: TaskProps) => {
  const navigate = useNavigate();
  const { completed, description, title, id } = taskData;
  return (
    <div className={`task ${completed ? "completed" : ""}`}>
      <div
        className="divBro"
        onClick={() => {
          navigate(`/display/${id}`);
        }}
      >
        <p className={completed ? "completed-text" : ""}>{title}</p>
        <span className={completed ? "completed-text" : ""}>{description}</span>
      </div>

      <input
        type="checkbox"
        checked={completed}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          toggleComplete(id, e.target.checked);
        }}
      />

      <button onClick={() => deleteTask(id)}> - </button>
    </div>
  );
};

export default Task;
