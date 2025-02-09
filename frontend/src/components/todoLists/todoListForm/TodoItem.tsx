import React from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Todo } from '../../../types/todoList'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce'
import { useTodoLists } from '../../../hooks/useTodoLists'
import { useTodo } from '../../../hooks/useTodo'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { isDueDatePassed } from '../../../utils/date'
import { useTodoList } from '../../../hooks/useTodoList'

interface Props {
  index: number
  todo: Todo
  listId: string
}

const getDueDateString = (dueDateMillis: number) =>
  `This todos due date is ${dayjs(dueDateMillis).format('YYYY-MM-DD')}`

export const TodoItem = ({ todo, index, listId }: Props) => {
  const { updateTodo, deleteTodo } = useTodo(todo.todoListId, todo.id)
  const { mutateList } = useTodoList(listId)
  const { mutateTodoLists } = useTodoLists()
  const [title, setTitle] = useState(todo.title)
  const date = todo.dueDateMillis ? dayjs(todo.dueDateMillis) : null
  const debouncedTitle = useDebounce(title, 500)

  useEffect(() => {
    if (debouncedTitle !== todo.title) {
      const optimisticTodo = {
        title: debouncedTitle,
        id: todo.id,
        todoListId: todo.todoListId,
        dueDateMillis: todo.dueDateMillis,
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
      )

      updateTodo({ title: optimisticTodo.title, dueDateMillis: optimisticTodo.dueDateMillis })
    }
  }, [debouncedTitle, mutateList, todo, updateTodo])

  const handleCompleteTodo = (completed: boolean) => {
    const optimisticTodo = {
      title: todo.title,
      completed,
      id: todo.id,
      todoListId: todo.todoListId,
      dueDateMillis: todo.dueDateMillis,
    }
    mutateList(
      (data) => {
        const updatedTodos =
          data?.todos.map((todo) => (todo.id === optimisticTodo.id ? optimisticTodo : todo)) ?? []
        const allAreCompleted =
          updatedTodos.length > 0 && updatedTodos.every((todo) => todo.completed)
        mutateTodoLists(
          (data) => {
            return {
              ...data,
              todoLists:
                data?.todoLists.map((list) =>
                  listId === list.id ? { ...list, completed: allAreCompleted } : list,
                ) ?? [],
            }
          },
          { revalidate: false },
        )
        return {
          todos: updatedTodos,
        }
      },
      { revalidate: false },
    )
    updateTodo({ completed })
  }

  const handleDeleteTodo = () => {
    mutateList(
      (data) => {
        const updatedTodos = data?.todos.filter((t) => t.id !== todo.id) ?? []
        const allAreCompleted =
          updatedTodos.length > 0 && updatedTodos.every((todo) => todo.completed)
        mutateTodoLists(
          (data) => ({
            ...data,
            todoLists:
              data?.todoLists.map((list) =>
                listId === list.id ? { ...list, completed: allAreCompleted } : list,
              ) ?? [],
          }),
          { revalidate: false },
        )
        return {
          todos: updatedTodos,
        }
      },
      { revalidate: false },
    )
    deleteTodo()
  }

  const handleSetDueDate = (value: Dayjs | null) => {
    const optimisticTodo = {
      title,
      completed: todo.completed,
      dueDateMillis: value ? value.valueOf() : todo.dueDateMillis,
      id: todo.id,
      todoListId: todo.todoListId,
    }
    mutateList(
      (data) => {
        const updatedTodos =
          data?.todos.map((todo) => (todo.id === optimisticTodo.id ? optimisticTodo : todo)) ?? []
        if (updatedTodos.length > 0 && updatedTodos.every((todo) => todo.completed)) {
          mutateTodoLists(
            (data) => {
              return {
                ...data,
                todoLists:
                  data?.todoLists.map((list) =>
                    listId === list.id
                      ? { ...list, dueDateMillis: optimisticTodo.dueDateMillis }
                      : list,
                  ) ?? [],
              }
            },
            { revalidate: false },
          )
        }
        return {
          todos: updatedTodos,
        }
      },
      { revalidate: false },
    )
    updateTodo({ dueDateMillis: optimisticTodo.dueDateMillis })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
        marginBottom: todo.dueDateMillis && !todo.completed ? 3 : 23,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems: 'center' }}>
        <Typography variant='h6'>{index + 1}</Typography>
        <TextField
          sx={{ flexGrow: 1, marginInline: 2 }}
          label='What to do?'
          value={title}
          disabled={todo.completed}
          onChange={(event) => setTitle(event.target.value)}
        />
        <DatePicker
          disablePast
          disabled={todo.completed}
          value={date}
          onAccept={handleSetDueDate}
          format='YYYY-MM-DD'
        />
        <Button sx={{ margin: '8px' }} size='small' color='secondary' onClick={handleDeleteTodo}>
          <DeleteIcon fontSize='medium' />
        </Button>
        <Button
          type='button'
          sx={{ margin: '8px' }}
          size='small'
          color='secondary'
          onClick={() => handleCompleteTodo(!todo.completed)}
        >
          <DoneOutlinedIcon color={todo.completed ? 'success' : 'inherit'} fontSize='medium' />
        </Button>
      </div>
      {todo.dueDateMillis && !todo.completed && (
        <Typography
          variant='caption'
          component='span'
          style={{ marginLeft: 26, color: 'GrayText' }}
        >
          {isDueDatePassed(todo.dueDateMillis)
            ? 'Due date has passed'
            : getDueDateString(todo.dueDateMillis)}
        </Typography>
      )}
    </div>
  )
}
