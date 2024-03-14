//Hooks/todo.hooks.ts

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useEffect, useState } from "react";
import { Todo } from "../Components/Home";
import { API_ENDPOINT } from "../constants";

export const useFetch = () => {
 const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => await axios.get<Todo[]>(`${API_ENDPOINT}`)
  })

  return {data, error, isLoading, refetch}
};