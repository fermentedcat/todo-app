import React from 'react'

import CardHeader from '@mui/material/CardHeader'
import IconButton from '../button/IconButton'
import ActionsMenu from '../menu/ActionsMenu'
import Card from './Card'
import { Typography } from '@mui/material'

const headerStyle = {
  height: 'fit-content',
  maxHeight: '10ch',
  padding: 1.1,
  paddingRight: 1.6,
  color: '#ffbfd1',
  borderBottom: '1px dotted #ffbfd1',
  div: {
    maxHeight: '100%',
  },
  '.MuiCardHeader-content': {
    overflow: 'hidden',
  },
  '.MuiCardHeader-action': {
    overflow: 'unset',
  },
}

export default function TodoCard(props) {
  const {
    title,
    lastEdit,
    openEditHandler,
    toggleIsEditing,
    isEditing,
    removeHandler,
    pinHandler,
    isPinned,
    children,
  } = props

  let subheader
  if (lastEdit) {
    const date = new Date(lastEdit).toLocaleDateString('en-GB', 'DD-MM-YY')
    subheader = <Typography>Last edited: {date}</Typography>
  }
  return (
    <Card>
      <CardHeader
        sx={headerStyle}
        title={
          <Typography
            variant="h6"
            component="h4"
            sx={{ overflow: 'unset', fontSize: '16px', fontWeight: 'bold' }}
          >
            {title}
          </Typography>
        }
        subheader={subheader}
        action={
          <ActionsMenu>
            <IconButton
              type={isPinned ? 'unpin' : 'pin'}
              active
              description={isPinned ? 'unpin' : 'pin'}
              onClick={pinHandler}
            />
            <IconButton
              type={!isEditing ? 'edit' : 'cancel'}
              active
              description={!isEditing ? 'edit' : 'cancel'}
              onClick={!isEditing ? openEditHandler : toggleIsEditing}
            />
            {removeHandler && (
              <IconButton
                type="delete"
                active
                description="delete"
                onClick={removeHandler}
              />
            )}
          </ActionsMenu>
        }
      />
      {children}
    </Card>
  )
}
