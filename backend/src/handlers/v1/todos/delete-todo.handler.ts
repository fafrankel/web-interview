import { Static, Type } from '@sinclair/typebox'
import { deleteTodoDB } from '../../../mockDatabase/todos'
import { RequestHandler } from 'express'

export const DeleteTodoRequestSchema = Type.Object({
  params: Type.Object({ listId: Type.String(), todoId: Type.String() }),
  query: Type.Object({}),
  body: Type.Object({}),
})

export const DeleteTodoResponseSchema = Type.Object({
  body: Type.Object({}),
})

export type DeleteTodoRequest = Static<typeof DeleteTodoRequestSchema>
export type DeleteTodoResponse = Static<typeof DeleteTodoResponseSchema>

export const deleteTodo: RequestHandler<
  DeleteTodoRequest['params'],
  DeleteTodoResponse['body'],
  DeleteTodoRequest['body']
> = (req, res) => {
  const { listId, todoId } = req.params
  const success = deleteTodoDB(listId, todoId)
  if (!success) {
    res.status(404)
  }
  res.send()
}
