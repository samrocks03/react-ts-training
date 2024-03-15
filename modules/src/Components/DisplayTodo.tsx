// Components/DisplayTodo.tsx

import { useEffect, useReducer } from "react";
import {
  useFetch,
  useDeleteTodo,
  usePatchCheckTodo,
} from "../Hooks/todo.hooks";

import { Todo } from "./Home";
import Task from "./Task";
import TodoFilterBar from "./FilterBar/FilterBar";

import { DisplayTodoAction } from "../actions/Actions";

interface State {
  isCompleted: string;
  page: number;
  limit: number;
  totalPages: number;
  searchTerm: string;
  sortOrder: "asc" | "desc";
  tasks: Todo[];
}

const initialState: State = {
  isCompleted: "all",
  page: 1,
  limit: 5,
  totalPages: 2,
  searchTerm: "",
  sortOrder: "asc",
  tasks: [],
};

const reducer = (state: State, action: DisplayTodoAction): State => {
  switch (action.type) {
    case "SET_COMPLETED":
      return { ...state, isCompleted: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

const DisplayTodo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isCompleted, page, limit, totalPages, searchTerm, sortOrder, tasks } =
    state;

  const { todoListData, isTodoListLoading, isFetchError, refetchTodos } =
    useFetch({ _page: page, _limit: limit });

  const { deleteTodo, isdeleteSuccess } = useDeleteTodo();
  const { patchCheckTodo, isPatchSuccess } = usePatchCheckTodo();

  useEffect(() => {
    if (todoListData) {
      dispatch({ type: "SET_TASKS", payload: todoListData.data });
      dispatch({
        type: "SET_TOTAL_PAGES",
        payload: Math.ceil(todoListData.headers["x-total-count"] / limit),
      });
    }
  }, [limit, todoListData]);

  useEffect(() => {
    if (isPatchSuccess || isdeleteSuccess) {
      refetchTodos();
    }
  }, [isPatchSuccess, isdeleteSuccess, refetchTodos]);

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  const deleteTask = (id: string) => {
    deleteTodo(id);
  };

  const toggleComplete = (id: string, checked: boolean) => {
    patchCheckTodo({ id, checked });
  };

  const onSearchChange = (value: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: value });
  };

  const onSortChange = (order: "asc" | "desc") => {
    dispatch({ type: "SET_SORT_ORDER", payload: order });
  };

  const onStatusChange = (checked: string) => {
    dispatch({ type: "SET_COMPLETED", payload: checked });
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = a.date || "";
      const dateB = b.date || "";
      return sortOrder === "asc"
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });

  const dataFilteredByIsComplte =
    isCompleted === "all"
      ? filteredTasks
      : filteredTasks.filter((task) => String(task.completed) === isCompleted);

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

      {dataFilteredByIsComplte.map((task) => (
        <Task
          key={task.id}
          taskData={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}

      {Boolean(dataFilteredByIsComplte.length) && (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          {page} of {totalPages}
          <button
            className="btn btn-primary ms-2"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
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
                dispatch({
                  type: "SET_LIMIT",
                  payload: parseInt(e.target.value),
                });
                dispatch({ type: "SET_PAGE", payload: 1 });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayTodo;
