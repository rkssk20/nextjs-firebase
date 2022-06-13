import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import InitialIcon from '@/atoms/InitialIcon'

import styles from '@/styles/components/account/follow/account.module.scss'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

type AccountProps = {
  name: string
  display_id: string
  setRef: Dispatch<SetStateAction<HTMLDivElement | null>> | false
}

const Account = ({ name, display_id, setRef }: AccountProps) => {
  const router = useRouter()
  
  return (
    <ListItemButton
      className={ styles.list_item_button }
      classes={{ root: styles.list_item_button_root }}
      ref={ setRef ? (ref: HTMLDivElement) => setRef(ref) : undefined }
      onClick={ () => router.push(`/account/${ display_id }`)}
    >
      <ListItemIcon>
        <InitialIcon username={ name } variant='medium' />
      </ListItemIcon>

      <ListItemText
        primary={ name }
        secondary={ display_id }
      />
    </ListItemButton>
  )
}

export default Account