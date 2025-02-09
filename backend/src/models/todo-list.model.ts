import { Static, Type } from '@sinclair/typebox'

export const TodoListSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  createdAtMillis: Type.Number(),
})

export type TodoList = Static<typeof TodoListSchema>
