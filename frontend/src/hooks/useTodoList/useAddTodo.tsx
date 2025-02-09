import useSWRMutation from 'swr/mutation'
import { todoServiceBasePath } from '../../constants/common'

interface AddTodoResponse {
  title: string
  createdAtMillis: number
  id: string
  todoListId: string
}

const addTodo = async (url: string, { arg }: { arg: { title: string } }) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    })
    if (response.status !== 200) {
      throw new Error()
    }

    return response.json() as Promise<AddTodoResponse>
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}

export const useAddTodo = (listId: string) => {
  const endpoint = `/todo-lists/${listId}/todos`
  const url = `${todoServiceBasePath}${endpoint}`
  const { trigger, data, isMutating } = useSWRMutation(url, addTodo)
  return { addTodo: trigger, addedTodo: data, isAdding: isMutating }
}
