import { useDeleteTodo } from './useDeleteTodo'
import { useUpdateTodo } from './useUpdateTodo'

export const useTodo = (listId: string, todoId: string) => {
  const { updateTodo } = useUpdateTodo(listId, todoId)
  const { deleteTodo } = useDeleteTodo(listId, todoId)

  return {
    updateTodo,
    deleteTodo,
  }
}
