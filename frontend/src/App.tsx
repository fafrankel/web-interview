import React from 'react'
import { MainWrapper } from './components/mainWrapper/MainWrapper'
import { TodoLists } from './components/todoLists/TodoLists'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainWrapper>
        <TodoLists style={{ margin: '1rem' }} />
      </MainWrapper>
    </LocalizationProvider>
  )
}

export default App
