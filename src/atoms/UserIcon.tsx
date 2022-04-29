import useColor from '@/hooks/useColor'

import styles from '@/styles/atom/userIcon.module.scss'
import Avatar from '@mui/material/Avatar'

const UserIcon = ({ name, size }: { name: string, size: 'medium' | 'large' }) => {
  const color = useColor(name)

  return (
    <Avatar
      className={ styles.avatar }
      classes={{
        root: (size === 'medium') ? styles.avatar_medium : styles.avatar_large
      }}
      sx={{ bgcolor: color }}
    >
      { name }
    </Avatar>
  )
}

export default UserIcon