import type { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import Circular from '@/atoms/Circular'
import UserIcon from '@/atoms/UserIcon'

import styles from '@/styles/components/header/hamburger.module.scss'
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider'
import TagIcon from '@mui/icons-material/Tag';
import Typography from '@mui/material/Typography';

type HamburgerProps = {
  menuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

const Hamburger = ({ menuOpen, setMenuOpen }: HamburgerProps) => {
  const account = useRecoilValue(accountState)
  const pc = useMediaQuery('(min-width: 1164px')
  const menuList = [{ text: 'フロント', url: 'front' }, { text: 'サーバーレス', url: 'serverless' }]

  const handleClose = () => {
    setMenuOpen(false)
  }

  return (
    <Drawer
      className={ styles.drawer }
      classes={{ paper: pc ? styles.drawer_paper_pc : styles.drawer_paper_mobile }}
      variant={ pc ? 'permanent' : 'temporary' }
      open={ menuOpen }
      onClose={ handleClose }
    >
      <List>
        { account.loading ? <Circular size='small' /> :
          account.display_id ?
          // ログイン時、アカウントへのリンク
          <Link href={ `/account/${ account.display_id }` } passHref>
            <ListItemButton
              className={ styles.list_item_button }
              component='a'
              onClick={ handleClose }
            >
              <ListItemIcon>
                <UserIcon name={ account.name.slice(0, 1) } variant='medium' />
              </ListItemIcon>

              <ListItemText
                className={ styles.account_text }
                classes={{ primary: styles.account_text_primary }}
                primaryTypographyProps={{ variant: 'h5' }}
                primary={ account.name }
              />
            </ListItemButton>
          </Link>
          :
          // ログアウト時、ログインダイアログのボタン
          <Link href='/login' passHref>
            <ListItemButton
              className={ styles.list_item_button }
              component='a'
              onClick={ handleClose }
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>

              <ListItemText primaryTypographyProps={{ variant: 'h5' }}>
                ログイン
              </ListItemText>
            </ListItemButton>
          </Link>
        }

        <Link href='/' passHref>
          <ListItemButton
            className={ styles.list_item_button }
            component='a'
            onClick={ handleClose }
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>

            <ListItemText primaryTypographyProps={{ variant: 'h5' }}>
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

            <ListItemText primaryTypographyProps={{ variant: 'h5' }}>
              ランキング
            </ListItemText>
          </ListItemButton>
        </Link>
      </List>

      <List
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

              <ListItemText primaryTypographyProps={{ variant: 'h5' }}>
                { item.text }
              </ListItemText>
            </ListItemButton>
          </Link>
        ))}
      </List>

      <Divider className={ styles.divider } classes={{ root: styles.divider_root }} />

      

      <List className={ styles.list }>
        <Link href='/about' passHref>
          <ListItemButton
            className={ styles.list_item_button }
            component='a'
            onClick={ handleClose }
          >
            <ListItemText primaryTypographyProps={{ variant: 'h5' }}>
              このサイトについて
            </ListItemText>
          </ListItemButton>
        </Link>
      </List>

      <Typography className={ styles.caption } variant='caption'>
        @2022 Next.js × Supabase
      </Typography>
    </Drawer>
  )
}

export default Hamburger