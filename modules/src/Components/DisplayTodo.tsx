// Components/DisplayTodo.tsx
import { useEffect, useState } from "react";
import { useFetch } from "../Hooks/UseFetch";
import { Todo } from "./Home";

import Task from "./Task";

import { API_ENDPOINT } from "../constants";
import TodoFilterBar from "./FilterBar/FilterBar";

const DisplayTodo = () => {
  const [isCompleted, setisCompleted] = useState<string>("all");
  const { loading, error, data, refetchData } = useFetch();
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const onSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const onStatusChange = (checked: string) => {
    setisCompleted(checked);
  };


  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = a.date || ""; // Use an empty string if date is undefined
      const dateB = b.date || ""; // Use an empty string if date is undefined

      return sortOrder === "asc"
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });


  const dataFilteredByIsComplte =
    isCompleted === "all"
      ? filteredTasks
      : filteredTasks.filter((task) => String(task.completed) === isCompleted);

  // ----------------------------- Filter completed tasks ------------------

  if (loading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <TodoFilterBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
        isCompleted={isCompleted}
        onStatusChange={onStatusChange}
      />

      {dataFilteredByIsComplte.map((task) => (
        <Task
          key={task.id}
          taskData={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default DisplayTodo;
