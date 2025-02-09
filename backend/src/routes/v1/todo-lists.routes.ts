import express from 'express'
import { todoListHandlers } from '../../handlers/v1'
import {
  GetAllTodoListsRequest,
  GetAllTodoListsRequestSchema,
  GetAllTodoListsResponse,
  GetAllTodoListsResponseSchema,
} from '../../handlers/v1/todo-lists/get-all-todo-lists'
import { validateSchema } from '../../middleware/validate-schema'
import {
  CreateTodoListRequest,
  CreateTodoListRequestSchema,
  CreateTodoListResponse,
  CreateTodoListResponseSchema,
} from '../../handlers/v1/todo-lists/create-todo-list.handler'
import {
  DeleteTodoListRequest,
  DeleteTodoListRequestSchema,
  DeleteTodoListResponse,
  DeleteTodoListResponseSchema,
} from '../../handlers/v1/todo-lists/delete-todo-list.handler'

const router = express.Router()

router.get(
  '/',
  validateSchema<
    GetAllTodoListsRequest['params'],
    GetAllTodoListsResponse['body'],
    GetAllTodoListsResponse['body']
  >(
    GetAllTodoListsRequestSchema,
    GetAllTodoListsResponseSchema
  )(todoListHandlers.getAllTodoLists)
)
router.post(
  '/',
  validateSchema<
    CreateTodoListRequest['params'],
    CreateTodoListResponse['body'],
    CreateTodoListRequest['body']
  >(
    CreateTodoListRequestSchema,
    CreateTodoListResponseSchema
  )(todoListHandlers.createTodoList)
)
router.delete(
  '/:todoListId',
  validateSchema<
    DeleteTodoListRequest['params'],
    DeleteTodoListResponse['body'],
    DeleteTodoListRequest['body']
  >(
    DeleteTodoListRequestSchema,
    DeleteTodoListResponseSchema
  )(todoListHandlers.deleteTodoList)
)

export default router
