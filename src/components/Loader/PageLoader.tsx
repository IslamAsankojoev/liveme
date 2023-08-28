import { Box, CircularProgress, styled } from '@mui/material'
import React from 'react'

const StyledBox = styled(Box)(() => ({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

const PageLoader = () => {
  return (
    <StyledBox><CircularProgress /></StyledBox>
  )
}

export default PageLoader