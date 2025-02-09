import { RequestHandler } from 'express'
import { getAllTodoListsDB } from '../../../mockDatabase/todo-lists'
import { Static, Type } from '@sinclair/typebox'
import { getAllTodosDB } from '../../../mockDatabase/todos'

export const GetAllTodoListsRequestSchema = Type.Object({
  params: Type.Object({}),
  query: Type.Object({}),
  body: Type.Object({}),
})

export const GetAllTodoListsResponseSchema = Type.Object({
  body: Type.Object({
    todoLists: Type.Array(
      Type.Object({
        title: Type.String(),
        createdAtMillis: Type.Number(),
        id: Type.String(),
        completed: Type.Boolean(),
      })
    ),
  }),
})

export type GetAllTodoListsRequest = Static<typeof GetAllTodoListsRequestSchema>
export type GetAllTodoListsResponse = Static<typeof GetAllTodoListsResponseSchema>

const isListCompleted = (listId: string) => {
  const todosInList = getAllTodosDB(listId)
  return todosInList.length > 0 && todosInList.every((todo) => todo.completed)
}

export const getAllTodoLists: RequestHandler<
  GetAllTodoListsRequest['params'],
  GetAllTodoListsResponse['body'],
  GetAllTodoListsRequest['body']
> = (req, res) => {
  const todoLists = getAllTodoListsDB()
  const todoListsWithCompletionStatus = todoLists.map((list) => ({
    ...list,
    completed: isListCompleted(list.id),
  }))
  res.json({ todoLists: todoListsWithCompletionStatus })
}
