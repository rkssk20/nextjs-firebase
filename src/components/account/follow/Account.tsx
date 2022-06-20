import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import type { ProfilesSummaryType } from '@/types/types'
import InitialIcon from '@/atoms/InitialIcon'

import styles from '@/styles/components/account/follow/account.module.scss'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

type AccountProps = {
  data: ProfilesSummaryType
  setRef: Dispatch<SetStateAction<HTMLDivElement | null>> | false
}

const Account = ({ data, setRef }: AccountProps) => {
  const router = useRouter()
  
  return (
    <ListItemButton
      className={ styles.list_item_button }
      classes={{ root: styles.list_item_button_root }}
      ref={ setRef ? (ref: HTMLDivElement) => setRef(ref) : undefined }
      onClick={ () => router.push(`/account/${ data.id }`)}
    >
      <ListItemIcon>
        <InitialIcon username={ data.username } variant='medium' />
      </ListItemIcon>

      <ListItemText
        secondaryTypographyProps={{
          noWrap: true
        }}
        primary={ data.username }
        secondary={ data.details }
      />
    </ListItemButton>
  )
}

export default Account