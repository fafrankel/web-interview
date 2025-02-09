import { getAllTodosInList } from './get-all-todos.handler'
import { createTodo } from './create-todo.handler'
import { deleteTodo } from './delete-todo.handler'
import { updateTodo } from './update-todo.handler'

export default { getAllTodosInList, createTodoInList: createTodo, updateTodo, deleteTodo }
