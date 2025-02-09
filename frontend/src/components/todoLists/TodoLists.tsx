import React, { Fragment, useState } from 'react'
import { Card, CardContent, List, Typography } from '@mui/material'
import { TodoList } from './TodoList'
import { TodoListForm } from './todoListForm/TodoListForm'
import { useTodoLists } from '../../hooks/useTodoLists'

interface Props {
  style: React.CSSProperties
}

export const TodoLists = ({ style }: Props) => {
  const { todoLists } = useTodoLists()
  const [activeListId, setActiveList] = useState<string | undefined>()

  const activeList = todoLists.find((list) => list.id === activeListId)

  if (!Object.keys(todoLists).length) return null

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2' variant='h5'>
            My Todo Lists
          </Typography>
          <List>
            {todoLists.map((todoList) => {
              return (
                <TodoList
                  key={todoList.id}
                  onClick={() => setActiveList(todoList.id)}
                  title={todoList.title}
                  completed={todoList.completed}
                />
              )
            })}
          </List>
        </CardContent>
      </Card>
      {activeList && <TodoListForm todoList={activeList} />}
    </Fragment>
  )
}
