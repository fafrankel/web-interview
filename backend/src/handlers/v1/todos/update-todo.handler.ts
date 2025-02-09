import { RequestHandler } from 'express'
import { Static, Type } from '@sinclair/typebox'
import { updateTodoDB } from '../../../mockDatabase/todos'

export const UpdateTodoRequestSchema = Type.Object({
  params: Type.Object({
    listId: Type.String({ minLength: 1 }),
    todoId: Type.String({ minLength: 1 }),
  }),
  query: Type.Object({}),
  body: Type.Object({
    title: Type.Optional(Type.String()),
    completed: Type.Optional(Type.Boolean()),
    dueDateMillis: Type.Optional(Type.Number()),
  }),
})

export const UpdateTodoResponseSchema = Type.Object({
  body: Type.Object({
    todo: Type.Object({
      id: Type.String(),
      completed: Type.Optional(Type.Boolean()),
      todoListId: Type.String(),
      title: Type.String(),
      createdAtMillis: Type.Number(),
      updatedAtMillis: Type.Number(),
    }),
  }),
})

export type UpdateTodoRequest = Static<typeof UpdateTodoRequestSchema>
export type UpdateTodoResponse = Static<typeof UpdateTodoResponseSchema>
export const updateTodo: RequestHandler<
  UpdateTodoRequest['params'],
  UpdateTodoResponse['body'],
  UpdateTodoRequest['body']
> = (req, res) => {
  const { listId, todoId } = req.params
  const { title, completed, dueDateMillis } = req.body
  const todo = updateTodoDB(listId, todoId, { title, completed, dueDateMillis })

  res.json({
    todo: {
      ...todo,
    },
  })
}
