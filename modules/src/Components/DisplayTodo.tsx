// Components/DisplayTodo.tsx
import { useEffect, useState } from "react";
import {
  useFetch,
  useDeleteTodo,
  usePatchCheckTodo,
} from "../Hooks/todo.hooks";
import { Todo } from "./Home";

import Task from "./Task";

import TodoFilterBar from "./FilterBar/FilterBar";

const DisplayTodo = () => {
  const [isCompleted, setisCompleted] = useState<string>("all");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [totalpages, setTotalPages] = useState(2);

  const { todoListData, isTodoListLoading, isFetchError, refetchTodos } =
    useFetch({ _page: page, _limit: limit });
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { deleteTodo, isdeleteSuccess } = useDeleteTodo();
  const { patchCheckTodo, isPatchSuccess } = usePatchCheckTodo();
  // const { postTodo } = usePostTodo();

  useEffect(() => {
    if (todoListData) {
      setTasks(todoListData.data);
      // console.log("Header", todoListData.headers["x-total-count"]);
      setTotalPages(Math.ceil(todoListData.headers["x-total-count"] / limit));
      // console.log("This is new data", todoListData.data); // Extract the 'data' property from the AxiosResponse object
    }
  }, [limit, todoListData]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (isPatchSuccess || isdeleteSuccess) {
      refetchTodos();
      /**
       * If the network is slow, 
       * and we press the checked button multiple times ( or some similar scenario)
       * 
       * Make sure to add a Loader or disable the checked button, 
       * to ensure user doesn't press the button multiple times
       */
    }
  }, [isPatchSuccess, isdeleteSuccess, refetchTodos]);

  // ---------------------------- Delete Task ----------------------------
  const deleteTask = (id: string) => {
    deleteTodo(id);
  };

  // ----------------------------- Toggle Check ----------------------------

  const toggleComplete = (id: string, checked: boolean) => {
    patchCheckTodo({ id, checked });
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

  if (isTodoListLoading) {
    return <p>Loading..</p>;
  }

  if (isFetchError) {
    return <p>{String(isFetchError)}</p>;
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

      {
        Boolean(dataFilteredByIsComplte.length) && <div>
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          {page} of {totalpages}
          <button
            className="btn btn-primary ms-2"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalpages}
          >
            Next
          </button>
          <div>
            <input
              className="mt-3 w-20"
              type="number"
              placeholder="set limit"
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setPage(1);
              }}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default DisplayTodo;
