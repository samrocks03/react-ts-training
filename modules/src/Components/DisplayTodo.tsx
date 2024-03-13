// Components/DisplayTodo.tsx
import { useEffect, useState } from "react";
import { useFetch } from "../Hooks/UseFetch";
import { Todo } from "./Home";
import Task from "./Task";

import { API_ENDPOINT } from "../constants";

const DisplayTodo = () => {
  const [isCompleted, setisCompleted] = useState<boolean>(false);
  const { loading, error, data, refetchData } = useFetch();
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  // ---------------------------- Delete Task ----------------------------
  const deleteTask = async (id: string) => {
    // const filteredTasks = tasks.filter((task) => task.id !== id);
    // setTasks(filteredTasks);

    await fetch(`${API_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => refetchData());
  };

  // ----------------------------- Toggle Check ----------------------------
  const toggleComplete = async (id: string, checked: boolean) => {
    // const updatedTasks = tasks.map((task) =>
    //   task.id === id ? { ...task, completed: checked } : task
    // );
    // setTasks(updatedTasks);

    await fetch(`${API_ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: checked }),
    }).then(() => refetchData());
  };

  // ----------------------------- Filter completed tasks ------------------
  const filteredTasks = isCompleted
    ? tasks.filter((task) => task.completed)
    : tasks;

  return (
    <div>
      <button onClick={() => setisCompleted(!isCompleted)}>
        {isCompleted ? "All  Tasks" : "Show Completed Tasks"}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            taskData={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        ))
      )}
    </div>
  );
};

export default DisplayTodo;
