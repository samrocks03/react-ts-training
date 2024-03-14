//Hooks/todo.hooks.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useEffect, useState } from "react";
import { Todo } from "../Components/Home";
import { API_ENDPOINT } from "../constants";

interface PatchTodoRequest {
  id: string
  checked: boolean
}

// Get QueryClient from the context


export const useFetch = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => await axios.get<Todo[]>(`${API_ENDPOINT}`)
  })

  return { data, error, isLoading, refetch }
};


//  post - api
export const usePostTodo = () => {
  return useMutation({
    mutationKey: ['add-todo'],
    mutationFn: async (payload: Todo) => {
      const { data } = await axios.post(`${API_ENDPOINT}`, payload);
      return data;
    }
  })
}


//  delete action
export const useDeleteTodo = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`${API_ENDPOINT}/${id}`)
    }
  })
  return { deleteTodo: mutate, isdeleteSuccess: isSuccess, isDeletePending: isPending }
}


 // patch action for check 
export const usePatchCheckTodo = () => {
  // const queryClient = useQueryClient()
  const { mutate, isSuccess, isPending, } = useMutation({
    mutationFn: ({ id, checked }: PatchTodoRequest) => {
      return axios.patch(`${API_ENDPOINT}/${id}`, { completed: checked });
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (err) => {
      alert(err)
    }
  })
  return { patchCheckTodo: mutate, isPatchSuccess: isSuccess, isPatchPending: isPending }
}

