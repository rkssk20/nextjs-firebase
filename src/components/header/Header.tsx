import type { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { accountState } from '@/lib/recoil'

import styles from '@/styles/components/header/header.module.scss'
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

const Header = ({ setMenuOpen }: { setMenuOpen: Dispatch<SetStateAction<boolean>> }) => {
  const account = useRecoilValue(accountState)
  const pc = useMediaQuery('(min-width: 1164px')
  const router = useRouter()

  // 検索画面に遷移
  const handleSearch = () => {
    if(router.pathname !== '/search') {
      router.push('/search')
    }
  }

  // ログイン時は投稿、ログアウト時はログインに遷移
  const handlePost = () => {
    if(account.display_id) {
      router.push('/edit')
    } else {
      router.push('/login')
    }
  }

  return (
    <AppBar
      className={ styles.appbar }
      classes={{ root: styles.appbar_root }}
      color='inherit'
      position="fixed"
    >
      <Toolbar
        className={ styles.toolbar }
        classes={{ root: styles.toolbar_root }}
      >
        {/* ハンバーガーメニューアイコン */}
        { !pc &&
          <IconButton
            className={ styles.hamburger_button }
            aria-label='メニュー'
            size="large"
            edge="start"
            onClick={ () => setMenuOpen(true) }
          >
            <MenuIcon />
          </IconButton>
        }

        {/* タイトル */}
        <Typography
          className={ styles.title }
          variant="h5"
          component="div"
          color='primary'
        >
          Next.js × Supabase
        </Typography>

        {/* 検索ボタン */}
        <IconButton
          aria-label='検索'
          // ログイン判定中は投稿ボタン分のmarginを取る
          className={ account.loading ? styles.loading_margin : '' }
          onClick={ handleSearch }
        >
          <SearchIcon />
        </IconButton>

        {/* 投稿ボタン */}
        { !account.loading &&
          <IconButton
            aria-label='投稿'
            onClick={ handlePost }
          >
            <CreateIcon />
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header