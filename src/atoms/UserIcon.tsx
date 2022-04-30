import useColor from '@/hooks/useColor'

import styles from '@/styles/atoms/userIcon.module.scss'
import Avatar from '@mui/material/Avatar'

interface UserIconProps {
  name: string;
  variant: 'medium' | 'large' | 'link';
}

const UserIcon = ({ name, variant }: UserIconProps) => {
  const color = useColor(name)
  
  return (
    <Avatar
    className={ styles.avatar }
    classes={{
      root: (variant === 'link') ? styles.avatar_link : ((variant === 'medium') ? styles.avatar_medium : styles.avatar_large)
    }}
    sx={{ bgcolor: color }}
    >
      { name }
    </Avatar>
  )
}

export default UserIcon