import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import UserIcon from '@/atoms/UserIcon'

import styles from '@/styles/components/header/hamburger.module.scss'
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider'
import TagIcon from '@mui/icons-material/Tag';
import Typography from '@mui/material/Typography';

interface HamburgerProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const Hamburger = ({ menuOpen, setMenuOpen }: HamburgerProps) => {
  const pc = useMediaQuery('(min-width: 1164px')
  const test_name = 'アカウント'
  const menuList = [{ text: 'フロント', url: 'front' }, { text: 'サーバーレス', url: 'serverless' }]

  const handleClose = () => {
    setMenuOpen(false)
  }

  const test_session = {
    display_id: 'gowngorng',
    name: 'test_user'
  }

  return (
    <Drawer
      className={ styles.drawer }
      classes={{ paper: pc ? styles.drawer_paper : '' }}
      variant={ pc ? 'permanent' : 'temporary' }
      open={ menuOpen }
      onClose={ handleClose }
    >
      <List>
        <Link href={ `/account/${ test_session.display_id }` } passHref>
          <ListItemButton
            className={ styles.list_item_button }
            component='a'
            onClick={ handleClose }
          >
            <ListItemIcon>
              <UserIcon name={ test_name.slice(0, 1) } variant='medium' />
            </ListItemIcon>

            <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
              { test_name }
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link href='/' passHref>
          <ListItemButton
            className={ styles.list_item_button }
            component='a'
            onClick={ handleClose }
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>

            <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
              トップ
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link href='/ranking' passHref>
          <ListItemButton
            className={ styles.list_item_button }
            component='a'
            onClick={ handleClose }
          >
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>

            <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
              ランキング
            </ListItemText>
          </ListItemButton>
        </Link>
      </List>

        <Divider className={ styles.divider } classes={{ root: styles.divider_root }} />

      <List
        className={ styles.list }
        subheader={
          <ListSubheader
            className={ styles.sub_header }
            classes={{ root: styles.sub_header_root }}
          >
            カテゴリ
          </ListSubheader>
        }
      >
        { menuList.map(item => (
          <Link key={ item.url } href={ '/categories/' + item.url } passHref>
            <ListItemButton
              className={ styles.list_item_button }
              component='a'
              onClick={ handleClose }
            >
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>

              <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
                { item.text }
              </ListItemText>
            </ListItemButton>
          </Link>
        ))}
      </List>

      <Typography className={ styles.caption } variant='caption'>
        @2022 Next.js × Supabase
      </Typography>
    </Drawer>
  )
}

export default Hamburger