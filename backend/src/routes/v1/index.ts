import express from 'express'
import todoListsRoutes from './todo-lists.routes'
import todosRoutes from './todos.routes'

const router = express.Router()

router.use('/todo-lists', todoListsRoutes)
router.use('/todo-lists/:listId/todos', todosRoutes)

export default router
