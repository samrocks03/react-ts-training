import { Todo } from "../Components/Home";

export type DisplayIndividualTodoAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_COMPLETED"; payload: boolean }
  | { type: "SET_DATE"; payload: string };

export type DisplayTodoAction =
  | { type: "SET_COMPLETED"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_TOTAL_PAGES"; payload: number }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SORT_ORDER"; payload: "asc" | "desc" }
  | { type: "SET_TASKS"; payload: Todo[] };

export interface DisplayIndividualState {
  title: string;
  description: string;
  completed: boolean;
  date: string | undefined;
}

export interface DisplayTodoState {
  isCompleted: string;
  page: number;
  limit: number;
  totalPages: number;
  searchTerm: string;
  sortOrder: "asc" | "desc";
  tasks: Todo[];
}