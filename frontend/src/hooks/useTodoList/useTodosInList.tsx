import useSWR from 'swr'
import { todoServiceBasePath } from '../../constants/common'
import { useMemo } from 'react'
import { Todo } from '../../types/todoList'

export interface TodosInListResponse {
  todos: Todo[]
}

const todosInListFetcher = (url: string, options?: RequestInit) =>
  fetch(url, options).then(async (res: Response) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    return (await res.json()) as TodosInListResponse
  })

export const getTodosInListKey = (todoListId: string | undefined) =>
  todoListId ? `${todoServiceBasePath}/todo-lists/${todoListId}/todos` : null

export const useTodosInList = (todoListId: string | undefined) => {
  const { data, error, isLoading, mutate } = useSWR(
    getTodosInListKey(todoListId),
    todosInListFetcher,
  )

  const todos = useMemo(() => (data ? data.todos : []), [data])

  return {
    todos: todos,
    todosError: error,
    isLoadingTodos: isLoading,
    mutateList: mutate,
  }
}
