import { Static } from '@sinclair/typebox'
import { TodoListSchema } from '../models/todo-list.model'

export type TodoList = Static<typeof TodoListSchema>
