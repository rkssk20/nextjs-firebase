import { useEffect, Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'
import Loading from '@/components/header/hamburger/Loading'
import Login from '@/components/header/hamburger/Login'
import Logout from '@/components/header/hamburger/Logout'

import styles from '@/styles/components/header/hamburger/hamburger.module.scss'
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TagIcon from '@mui/icons-material/Tag';

type HamburgerProps = {
  menuOpen: boolean
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

const Hamburger = ({ menuOpen, setMenuOpen }: HamburgerProps) => {
  const pc = useMediaQuery('(min-width: 1182px')
  const router = useRouter()
  const account = useRecoilValue(accountState)

  const main_list = [{
    url: '/',
    text: 'トレンド',
    icon: <TrendingUpIcon />
  }, {
    url: '/categories',
    text: 'カテゴリ',
    icon: <TagIcon />
  }]

  const sub_list = [{
    url: '/about',
    text: 'このサイトについて'
  }, {
    url: '/report',
    text: 'お問い合わせ'
  }]

  const handleClose = () => {
    setMenuOpen(false)
  }
  
  // 戻る、進むボタンで遷移した場合
  useEffect(() => {
    router.beforePopState(() => {
      handleClose()
      return true
    })
  }, [])

  return (
    <Drawer
      className={ styles.drawer }
      classes={{ paper: styles.drawer_paper }}
      variant={ pc ? 'permanent' : 'temporary' }
      open={ menuOpen }
      onClose={ handleClose }
    >
      {/* アカウント関連のリンク  */}
      { account.loading ?
        <Loading />
        :
        account.data ?
        <Login
          id={ account.data.id }
          username={ account.data.username }
          avatar={ account.data.avatar }
          handleClose={ handleClose }
        />
        :
        <Logout handleClose={ handleClose } />
      }

      <Divider className={ styles.divider } classes={{ root: styles.divider_root }} />

      {/* 主要ページへのリンク */}
      <List>
        { main_list.map(item => (
          <Link key={ item.url } href={ item.url } passHref>
            <ListItemButton
              className={ styles.list_item_button }
              classes={{ root: styles.list_item_button_root }}
              component='a'
              onClick={ handleClose }
            >
              <ListItemIcon>
                { item.icon }
              </ListItemIcon>

              <ListItemText primaryTypographyProps={{ variant: 'h5' }}>
                { item.text }
              </ListItemText>
            </ListItemButton>
          </Link>
        )) }
      </List>

      <Divider className={ styles.divider } classes={{ root: styles.divider_root }} />

      {/* その他のページへのリンク */}
      <List>
        { sub_list.map(item => (
          <Link key={ item.url } href={ item.url } passHref>
            <ListItemButton
              className={ styles.list_item_button }
              classes={{ root: styles.list_item_button_root }}
              component='a'
              onClick={ handleClose }
            >
              <ListItemText primaryTypographyProps={{ variant: 'h5' }}>
                { item.text }
              </ListItemText>
            </ListItemButton>
          </Link>
        )) }
      </List>
    </Drawer>
  )
}

export default Hamburger