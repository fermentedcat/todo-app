import React from 'react'

import MuiModal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: '70vh',
  boxShadow: 24,
  p: 0,
  outline: 'none',
  borderRadius: '3px',
  overflow: 'scroll',
}

export default function Modal(props) {
  const { open, onClose, children } = props

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </MuiModal>
  )
}
