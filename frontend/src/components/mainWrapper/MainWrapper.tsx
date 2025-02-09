import React, { ReactNode } from 'react'
import { MainAppBar } from '../mainAppBar/MainAppBar'

const mainWrapperStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column' }
const centerContentWrapper: React.CSSProperties = { display: 'flex', justifyContent: 'center' }
const contentWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '80rem',
  flexGrow: 1,
}

interface Props {
  children: ReactNode
}

export const MainWrapper = ({ children }: Props) => {
  return (
    <div style={mainWrapperStyle}>
      <MainAppBar />
      <div style={centerContentWrapper}>
        <div style={contentWrapperStyle}>{children}</div>
      </div>
    </div>
  )
}
