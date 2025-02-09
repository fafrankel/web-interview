import useSWRMutation from 'swr/mutation'
import { todoServiceBasePath } from '../../constants/common'

const deleteTodo = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.status !== 200) throw Error('Could not delete todo')
  return
}

export const useDeleteTodo = (listId: string, todoId: string) => {
  const endpoint = `/todo-lists/${listId}/todos/${todoId}`
  const url = `${todoServiceBasePath}${endpoint}`
  const { trigger } = useSWRMutation(url, deleteTodo)

  return { deleteTodo: trigger }
}
