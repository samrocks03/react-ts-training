//Hooks/todo.hooks.ts

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useEffect, useState } from "react";
import { Todo } from "../Components/Home";
import { API_ENDPOINT } from "../constants";

export const useFetch = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => await axios.get<Todo[]>(`${API_ENDPOINT}`)
  })

  return { data, error, isLoading, refetch }
};


export const useDeleteTodo = () => {
  const { mutate, isSuccess, isPending} = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`${API_ENDPOINT}/${id}`)
    }
  })
  return { deleteTodo: mutate , isdeleteSuccess: isSuccess, isDeletePending: isPending }
}