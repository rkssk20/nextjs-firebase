import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import styles from '@/styles/components/header/header.module.scss'
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

const Header = ({ setMenuOpen }: { setMenuOpen: Dispatch<SetStateAction<boolean>> }) => {
  const pc = useMediaQuery('(min-width: 1182px')
  const router = useRouter()

  // 検索画面に遷移
  const handleSearch = () => {
    if(router.pathname !== '/search') {
      router.push('/search')
    }
  }

  // ログイン時は投稿、ログアウト時はログインに遷移
  const handlePost = () => {
    router.push('/edit')
  }

  return (
    <AppBar
      color='inherit'
      position="sticky"
      elevation={ 0 }
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
        <NextLink href='/' passHref >
          <MuiLink className={ styles.title_link } underline='none'>
            <Image
              className={ styles.title }
              quality={ 80 }
              width={ 40 }
              height={ 40 }
              alt='Next.js × Suapabase'
              src='/favicon.png'
            />
          </MuiLink>
        </NextLink>

        {/* 検索ボタン */}
        <IconButton
          aria-label='検索'
          className={ styles.search_icon }
          classes={{ root: styles.search_icon_root }}
          onClick={ handleSearch }
        >
          <SearchIcon />
        </IconButton>

        {/* 投稿ボタン */}
        <IconButton
          aria-label='投稿'
          onClick={ handlePost }
        >
          <CreateIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header