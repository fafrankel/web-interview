export interface TodoList {
  title: string
  id: string
  completed: boolean
}

export interface Todo {
  id: string
  title: string
  todoListId: string
  completed?: boolean
  dueDateMillis?: number
}
