import { RequestHandler } from 'express'
import { createTodoDB } from '../../../mockDatabase/todos'
import { Static, Type } from '@sinclair/typebox'

export const CreateTodoRequestSchema = Type.Object({
  params: Type.Object({ listId: Type.String({ minLength: 1 }) }),
  query: Type.Object({}),
  body: Type.Object({
    title: Type.String(),
  }),
})

export const CreateTodoResponseSchema = Type.Object({
  body: Type.Object({
    id: Type.String(),
    completed: Type.Optional(Type.Boolean()),
    todoListId: Type.String(),
    title: Type.String(),
    createdAtMillis: Type.Number(),
  }),
})

export type CreateTodoInListRequest = Static<typeof CreateTodoRequestSchema>
export type CreateTodoInListResponse = Static<typeof CreateTodoResponseSchema>

export const createTodo: RequestHandler<
  CreateTodoInListRequest['params'],
  CreateTodoInListResponse['body'],
  CreateTodoInListRequest['body']
> = (req, res) => {
  const { listId } = req.params
  const todo = req.body
  const todoRes = createTodoDB(listId, todo)

  res.json({
    ...todoRes,
  })
}
