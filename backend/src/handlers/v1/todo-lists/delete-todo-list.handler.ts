import { RequestHandler } from 'express'
import { deleteTodoListDB } from '../../../mockDatabase/todo-lists'
import { Static, Type } from '@sinclair/typebox'

export const DeleteTodoListRequestSchema = Type.Object({
  params: Type.Object({ listId: Type.String() }),
  query: Type.Object({}),
  body: Type.Object({}),
})

export const DeleteTodoListResponseSchema = Type.Object({
  body: Type.Object({}),
})

export type DeleteTodoListRequest = Static<typeof DeleteTodoListRequestSchema>
export type DeleteTodoListResponse = Static<typeof DeleteTodoListResponseSchema>

export const deleteTodoList: RequestHandler<
  DeleteTodoListRequest['params'],
  DeleteTodoListResponse['body'],
  DeleteTodoListRequest['body']
> = (req, res) => {
  const { listId } = req.params
  const success = deleteTodoListDB(listId)
  if (!success) {
    res.status(404)
  }
  res.send()
}
