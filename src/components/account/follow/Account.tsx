import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import AvatarIcon from '@/atoms/Icon/AvatarIcon'
import InitialIcon from '@/atoms/Icon/InitialIcon'

import styles from '@/styles/components/account/follow/account.module.scss'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

type AccountProps = {
  id: string
  username: string
  avatar: string | undefined
  details: string | undefined
  setRef: Dispatch<SetStateAction<HTMLDivElement | null>> | false
}

const Account = ({ id, username, avatar, details, setRef }: AccountProps) => {
  const router = useRouter()
  const url = `/account/${id}`

  return (
    <ListItemButton
      className={styles.list_item_button}
      classes={{ root: styles.list_item_button_root }}
      ref={setRef ? (ref: HTMLDivElement) => setRef(ref) : undefined}
      onClick={() => router.push(url, url)}
    >
      <ListItemIcon>
        {avatar ? (
          <AvatarIcon
            src={ avatar }
            variant='medium'
          />
        ) : (
          <InitialIcon username={username} variant='medium' />
        )}
      </ListItemIcon>

      <ListItemText
        secondaryTypographyProps={{
          noWrap: true,
        }}
        primary={username}
        secondary={details}
      />
    </ListItemButton>
  )
}

export default Account
