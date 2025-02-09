import { Static } from '@sinclair/typebox'
import { TodoSchema } from '../models/todos.model'

export type Todo = Static<typeof TodoSchema>
