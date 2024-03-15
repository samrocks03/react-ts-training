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

interface GetTodoRequest {
  _page: number;
  _limit: number;
}
// Get QueryClient from the context

// Get - api
export const useFetch = (params: GetTodoRequest) => {
  // console.log(params)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['todos', params],
    queryFn: () => axios.get<Todo[]>(`${API_ENDPOINT}`, { params }).then((res) => res),
    // keepPreviousData:true
  })

  return { todoListData: data, isTodoListLoading: isLoading, isFetchError: error, refetchTodos: refetch }
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
  const { refetchTodos } = useFetch({ _page: 1, _limit: 5 })
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`${API_ENDPOINT}/${id}`)
    },
    onSuccess: () => {
      refetchTodos()
    },
  })
  return { deleteTodo: mutate, isdeleteSuccess: isSuccess, isDeletePending: isPending }
}


// patch action for check 
export const usePatchCheckTodo = () => {
  // const queryClient = useQueryClient()

  const { mutate, isSuccess, isPending } = useMutation({
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

