import { Box, CircularProgress, styled } from '@mui/material'
import React from 'react'

const StyledBox = styled(Box)(() => ({
    height: '400px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

const TableLoader = () => {
  return (
    <StyledBox><CircularProgress /></StyledBox>
  )
}

export default TableLoader