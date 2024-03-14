// Components/DisplayTodo.tsx
import { useEffect, useState } from "react";
import { useFetch, useDeleteTodo, usePatchCheckTodo } from "../Hooks/todo.hooks";
import { Todo } from "./Home";

import Task from "./Task";

import TodoFilterBar from "./FilterBar/FilterBar";

const DisplayTodo = () => {
  const [isCompleted, setisCompleted] = useState<string>("all");
  const { data, error, isLoading, refetch } = useFetch();
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { deleteTodo } = useDeleteTodo();
  const {patchCheckTodo,isPatchSuccess} = usePatchCheckTodo()
  // const { postTodo } = usePostTodo();

  useEffect(() => {
    if (data) {
      setTasks(data.data); 
      console.log("This is new data",data.data)// Extract the 'data' property from the AxiosResponse object
    }
  }, [data]);

  useEffect(()=>{
    if(isPatchSuccess){
      refetch
    }
  },[isPatchSuccess, refetch])

  // ---------------------------- Delete Task ----------------------------
  const deleteTask =  (id: string) => {
    deleteTodo(id);
  };

  // ----------------------------- Toggle Check ----------------------------

  
  const toggleComplete =  (id: string, checked: boolean) => {
    patchCheckTodo({id,checked})
  };

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const onSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const onStatusChange = (checked: string) => {
    // console.log(checked);
    setisCompleted(checked);
  };

  // console.log("tasks", tasks);

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

  // console.log("filteredTasks", filteredTasks);

  const dataFilteredByIsComplte =
    isCompleted === "all"
      ? filteredTasks
      : filteredTasks.filter((task) => String(task.completed) === isCompleted);
  // console.log("dataFilteredByIsComplte", dataFilteredByIsComplte);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{String(error)}</p>;
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

      {/* <button className="rounded" onClick={() => setisCompleted(!isCompleted)}>
        {isCompleted ? "All  Tasks" : "Show Completed Tasks"}
      </button> */}

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
