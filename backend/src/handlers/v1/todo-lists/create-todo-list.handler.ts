import { RequestHandler } from 'express'
import { createTodoListDB } from '../../../mockDatabase/todo-lists'
import { Static, Type } from '@sinclair/typebox'

export const CreateTodoListRequestSchema = Type.Object({
  params: Type.Object({}),
  query: Type.Object({}),
  body: Type.Object({
    title: Type.String({ minLength: 1 }),
  }),
})

export const CreateTodoListResponseSchema = Type.Object({
  body: Type.Object({
    id: Type.String(),
  }),
})

export type CreateTodoListRequest = Static<typeof CreateTodoListRequestSchema>
export type CreateTodoListResponse = Static<typeof CreateTodoListResponseSchema>

const createTodoList: RequestHandler<
  CreateTodoListRequest['params'],
  CreateTodoListResponse['body'],
  CreateTodoListRequest['body']
> = (req, res) => {
  const { title } = req.body
  const todoList = createTodoListDB(title)
  res.json(todoList)
}

export { createTodoList }
