import { Optional, Static, Type } from '@sinclair/typebox'

export const TodoSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  completed: Optional(Type.Boolean()),
  createdAtMillis: Type.Number(),
  updatedAtMillis: Type.Optional(Type.Number()),
  dueDateMillis: Type.Optional(Type.Number()),
  todoListId: Type.String(),
})

export type Todo = Static<typeof TodoSchema>
