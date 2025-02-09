import { v4 as uuidv4 } from 'uuid'
import { TodoList } from '../models/todo-list.model'

let mockTodoLists: Map<string, Omit<TodoList, 'id'>> = new Map()

mockTodoLists.set('test-1', {
  title: 'First list',
  createdAtMillis: Date.now(),
})

mockTodoLists.set('test-2', {
  title: 'Second list',
  createdAtMillis: Date.now(),
})

export const getAllTodoListsDB = (): TodoList[] => {
  return Array.from(mockTodoLists.entries()).map(([id, list]) => ({ ...list, id }))
}

export const createTodoListDB = (title: string): TodoList => {
  const id = uuidv4()
  const todoListEntry = {
    title,
    createdAtMillis: Date.now(),
  }
  mockTodoLists.set(id, todoListEntry)
  return { ...todoListEntry, id }
}

export const deleteTodoListDB = (id: string): boolean => {
  return mockTodoLists.delete(id)
}
