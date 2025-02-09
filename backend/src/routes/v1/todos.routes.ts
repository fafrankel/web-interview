import express from 'express'
import { todoHandlers } from '../../handlers/v1'
import { validateSchema } from '../../middleware/validate-schema'
import {
  GetAllTodoInListResponse,
  GetAllTodosInListRequest,
  GetAllTodosInListRequestSchema,
  GetAllTodosInListResponseSchema,
} from '../../handlers/v1/todos/get-all-todos.handler'
import {
  CreateTodoInListRequest,
  CreateTodoInListResponse,
  CreateTodoRequestSchema,
  CreateTodoResponseSchema,
} from '../../handlers/v1/todos/create-todo.handler'
import {
  DeleteTodoRequest,
  DeleteTodoRequestSchema,
  DeleteTodoResponse,
  DeleteTodoResponseSchema,
} from '../../handlers/v1/todos/delete-todo.handler'
import {
  UpdateTodoRequest,
  UpdateTodoRequestSchema,
  UpdateTodoResponse,
  UpdateTodoResponseSchema,
} from '../../handlers/v1/todos/update-todo.handler'

const router = express.Router({ mergeParams: true })

router.get(
  '/',
  validateSchema<
    GetAllTodosInListRequest['params'],
    GetAllTodoInListResponse['body'],
    GetAllTodosInListRequest['body']
  >(
    GetAllTodosInListRequestSchema,
    GetAllTodosInListResponseSchema
  )(todoHandlers.getAllTodosInList)
)
router.post(
  '/',
  validateSchema<
    CreateTodoInListRequest['params'],
    CreateTodoInListResponse['body'],
    CreateTodoInListRequest['body']
  >(
    CreateTodoRequestSchema,
    CreateTodoResponseSchema
  )(todoHandlers.createTodoInList)
)
router.patch(
  '/:todoId',
  validateSchema<
    UpdateTodoRequest['params'],
    UpdateTodoResponse['body'],
    UpdateTodoRequest['body']
  >(
    UpdateTodoRequestSchema,
    UpdateTodoResponseSchema
  )(todoHandlers.updateTodo)
)

router.delete(
  '/:todoId',
  validateSchema<
    DeleteTodoRequest['params'],
    DeleteTodoResponse['body'],
    DeleteTodoRequest['body']
  >(
    DeleteTodoRequestSchema,
    DeleteTodoResponseSchema
  )(todoHandlers.deleteTodo)
)

export default router
