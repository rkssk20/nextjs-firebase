import { Dispatch, SetStateAction } from 'react'
import UserIcon from '@/atoms/UserIcon'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

type AccountProps = {
  name: string
  display_id: string
  setRef: Dispatch<SetStateAction<HTMLDivElement | null>> | false
}

const Account = ({ name, display_id, setRef }: AccountProps) => {
  return (
    <ListItemButton ref={ setRef ? ref => setRef(ref) : undefined }>
      <ListItemIcon>
        <UserIcon name={ name.slice(0, 1) } variant='medium' />
      </ListItemIcon>

      <ListItemText
        primary={ name }
        secondary={ display_id }
      />
    </ListItemButton>
  )
}

export default Account