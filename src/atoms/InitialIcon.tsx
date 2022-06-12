import Color from '@/lib/color'

import styles from '@/styles/atoms/initialIcon.module.scss'
import Avatar from '@mui/material/Avatar'

interface AvatarIconProps {
  name: string;
  variant: 'medium' | 'large' | 'link';
}

const AvatarIcon = ({ name, variant }: AvatarIconProps) => {
  const color = Color(name)
  
  return (
    <Avatar
      className={ styles.avatar }
      classes={{
        root: (variant === 'link') ? styles.avatar_link : ((variant === 'medium') ? styles.avatar_medium : styles.avatar_large)
      }}
      sx={{ bgcolor: color }}
    >
      { name.slice(0, 1) }
    </Avatar>
  )
}

export default AvatarIcon