import React from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TodoList } from '../../../types/todoList'
import { TodoItem } from './TodoItem'
import { useTodoList } from '../../../hooks/useTodoList'

interface Props {
  todoList: TodoList
}

export const TodoListForm = ({ todoList }: Props) => {
  const { todos, mutateList, addTodo } = useTodoList(todoList.id)

  const handleAddTodo = () => {
    const optimisticTodo = {
      title: '',
      id: 'optimistic',
      todoListId: todoList.id,
      completed: false,
    }
    mutateList(
      (data) => {
        return {
          todos:
            data?.todos.map((todo) => (todo.id === optimisticTodo.id ? optimisticTodo : todo)) ??
            [],
        }
      },
      { revalidate: false },
    ).then(() => addTodo({ title: '' }))
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2' variant='h6' style={{ marginBottom: 10 }}>
          {todoList.title}
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos?.map((todo, index) => (
            <TodoItem key={todo.id} index={index} todo={todo} listId={todoList.id} />
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={handleAddTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
