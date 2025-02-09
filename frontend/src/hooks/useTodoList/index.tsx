import { useTodosInList } from './useTodosInList'
import { useAddTodo } from './useAddTodo'

export const useTodoList = (listId: string) => {
  const { todos, todosError, isLoadingTodos, mutateList } = useTodosInList(listId)
  const { addTodo, addedTodo, isAdding } = useAddTodo(listId)

  return {
    todos,
    todosError,
    isLoadingTodos,
    mutateList,
    addTodo,
    addedTodo,
    isAdding,
  }
}
