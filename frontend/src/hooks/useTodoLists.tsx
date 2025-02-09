import useSWR from 'swr'
import { todoServiceBasePath } from '../constants/common'

interface TodoListResponse {
  todoLists: { title: string; createdAtMillis: number; id: string; completed: boolean }[]
}

const todoListFetcher = (url: string, options?: RequestInit) => {
  try {
    return fetch(url, options).then((res: Response) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      return res.json() as Promise<TodoListResponse>
    })
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong fetching todo list')
  }
}

export const useTodoLists = () => {
  const endpoint = '/todo-lists'
  const url = `${todoServiceBasePath}${endpoint}`
  const { data, error, isLoading, mutate } = useSWR(url, todoListFetcher, {
    revalidateOnFocus: false,
  })

  return {
    todoLists: data ? data.todoLists : [],
    todoListsError: error,
    isLoadingTodoLists: isLoading,
    mutateTodoLists: mutate,
  }
}
