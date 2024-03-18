// Components/DisplayIndividualTodo.tsx

import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import {
  DisplayIndividualTodoAction,
  DisplayIndividualState,
} from "../actions/Actions";

const initialState: DisplayIndividualState = {
  title: "",
  description: "",
  completed: false,
  date: undefined,
};

const reducer = (
  state: DisplayIndividualState,
  action: DisplayIndividualTodoAction
): DisplayIndividualState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_COMPLETED":
      return { ...state, completed: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    default:
      return state;
  }
};

const DisplayIndividualTodo = () => {
  const param = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/${param.id}`);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        dispatch({ type: "SET_TITLE", payload: data.title });
        dispatch({ type: "SET_DESCRIPTION", payload: data.description });
        dispatch({ type: "SET_COMPLETED", payload: data.completed });
        dispatch({ type: "SET_DATE", payload: data.date });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [param.id]);

  const { title, description, date } = state;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
};

export default DisplayIndividualTodo;
