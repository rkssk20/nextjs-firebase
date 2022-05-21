import { useRouter } from 'next/router'

import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ListItemText from '@mui/material/ListItemText'

type HeaderProps = {
  name: string 
  categories: 'follow' | 'follower'
  path: string
}

const Header = ({ name, categories, path }: HeaderProps) => {
  const router = useRouter()

  return (
    <ListItem>
      <ListItemIcon>
        <IconButton onClick={ () => router.push(`/account/${ router.query.display_id }`) }>
          <ArrowBackIcon />
        </IconButton>
      </ListItemIcon>

      <ListItemText
        primaryTypographyProps={{ variant: 'h5' }}
        primary={ `${ name }${ (categories === 'follow') ? 'がフォロー中' : 'のフォロワー' }` }
        secondary={ '@' + path }
      />
    </ListItem>
  )
}

export default Header