import { v4 as uuidv4 } from 'uuid'
import { Todo } from '../models/todos.model'

let mockTodos: Map<string, Map<string, Omit<Todo, 'id' | 'todoListId'>>> = new Map()

mockTodos.set('test-1', new Map())

mockTodos
  .get('test-1')
  ?.set('test-1', { title: 'First todo in first list', createdAtMillis: Date.now() })

mockTodos
  .get('test-1')
  ?.set('test-2', { title: 'Second todo in first list', createdAtMillis: Date.now() })

export const createTodoDB = (listId: string, todo: Pick<Todo, 'title' | 'completed'>): Todo => {
  if (!mockTodos.has(listId)) {
    mockTodos.set(listId, new Map())
  }
  const id = uuidv4()
  const todoEntry = { ...todo, createdAtMillis: Date.now() }
  mockTodos.get(listId)?.set(id, todoEntry)
  return { ...todoEntry, id, todoListId: listId }
}

export const getAllTodosDB = (listId: string): Todo[] => {
  const todos = mockTodos.get(listId)
  if (!todos) {
    return []
  }
  return Array.from(todos.entries()).map(([id, todo]) => ({ ...todo, id, todoListId: listId }))
}

export const getTodoDB = (listId: string, todoId: string) => {
  const todoList = mockTodos.get(listId)
  if (!todoList) {
    throw new Error('Could not find list')
  }
  const todo = todoList.get(todoId)
  if (!todo) {
    throw new Error('Could not find todo')
  }
  return { ...todo, todoListId: listId, id: todoId }
}

export const updateTodoDB = (
  listId: string,
  todoId: string,
  {
    title,
    completed,
    dueDateMillis,
  }: { title?: string; completed?: boolean; dueDateMillis?: number }
) => {
  const todoList = mockTodos.get(listId)
  if (!todoList) {
    throw new Error('Could not find list')
  }
  const todo = todoList.get(todoId)
  if (!todo) {
    throw new Error('Could not find todo')
  }
  const updatedTodo = {
    ...todo,
    title: title ?? todo.title,
    completed: completed !== undefined ? completed : todo.completed,
    dueDateMillis: dueDateMillis ?? todo.dueDateMillis,
    updatedAtMillis: Date.now(),
  }
  todoList.set(todoId, updatedTodo)
  return { ...updatedTodo, todoListId: listId, id: todoId }
}

export const deleteTodoDB = (listId: string, todoId: string): boolean => {
  const list = mockTodos.get(listId)
  if (!list) return false
  return list.delete(todoId)
}
