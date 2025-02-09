import useSWRMutation from 'swr/mutation'
import { todoServiceBasePath } from '../../constants/common'

interface UpdateTodoResponse {
  todo: {
    title: string
    id: string
    todoListId: string
    completed?: boolean
  }
}

const updateTodo = async (
  url: string,
  { arg }: { arg: { title?: string; completed?: boolean; dueDateMillis?: number } },
) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  })
  return response.json() as Promise<UpdateTodoResponse>
}

export const useUpdateTodo = (listId: string, todoId: string) => {
  const endpoint = `/todo-lists/${listId}/todos/${todoId}`
  const url = `${todoServiceBasePath}${endpoint}`
  const { trigger, data } = useSWRMutation(url, updateTodo)

  return { updateTodo: trigger, updatedTodo: data?.todo }
}
