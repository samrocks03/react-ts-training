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
  const { completed, description, title, id ,date} = taskData;
  return (
    <div className={`task ${completed ? "completed" : ""}`}>
      <div
        className="divBro"
        onClick={() => {
          navigate(`/display/${id}`);
        }}
      >
       <div className="d-flex justify-content-between">
       <p className={completed ? "completed-text" : ""}>{title}</p> 
       <p>Due Date: {date}</p>
       </div>
        <span>{description}</span>
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
