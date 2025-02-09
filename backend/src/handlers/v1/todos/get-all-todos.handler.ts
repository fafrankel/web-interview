import { RequestHandler } from 'express'
import { getAllTodosDB } from '../../../mockDatabase/todos'
import { Static, Type } from '@sinclair/typebox'

export const GetAllTodosInListRequestSchema = Type.Object({
  params: Type.Object({ listId: Type.String({ minLength: 1 }) }),
  query: Type.Object({}),
  body: Type.Object({}),
})

export const GetAllTodosInListResponseSchema = Type.Object({
  body: Type.Object({
    todos: Type.Array(
      Type.Object({
        id: Type.String(),
        completed: Type.Optional(Type.Boolean()),
        todoListId: Type.String(),
        title: Type.String(),
        createdAtMillis: Type.Number(),
      })
    ),
  }),
})

export type GetAllTodosInListRequest = Static<typeof GetAllTodosInListRequestSchema>
export type GetAllTodoInListResponse = Static<typeof GetAllTodosInListResponseSchema>

export const getAllTodosInList: RequestHandler<
  GetAllTodosInListRequest['params'],
  GetAllTodoInListResponse['body'],
  GetAllTodosInListRequest['body']
> = (req, res) => {
  const { listId } = req.params
  const todos = getAllTodosDB(listId)
  res.json({ todos })
}
