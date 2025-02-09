import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ReceiptIcon from '@mui/icons-material/Receipt'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import { ListItemText } from '@mui/material'

interface Props {
  onClick: () => void
  title: string
  completed: boolean
}

export const TodoList = ({ onClick, title, completed }: Props) => (
  <ListItemButton onClick={onClick} style={{ margin: 5 }}>
    <ListItemIcon>
      <ReceiptIcon />
    </ListItemIcon>
    <ListItemText primary={title} />
    {completed && <DoneOutlinedIcon color={'success'} fontSize='medium' />}
  </ListItemButton>
)
