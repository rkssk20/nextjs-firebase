import { useState, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router'
import Search from '@/components/header/Search';

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
  const [searchOpen, setSearchOpen] = useState(false)
  const pc = useMediaQuery('(min-width: 1164px')
  const router = useRouter()

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
        { !pc &&
          <IconButton
            className={ styles.side_button }
            aria-label='メニュー'
            size="large"
            edge="start"
            onClick={ () => setMenuOpen(true) }
          >
            <MenuIcon />
          </IconButton>
        }

        <Typography
          className={ styles.title }
          variant="h6"
          component="div"
          color='primary'
        >
          Next.js × Supabase
        </Typography>

        <IconButton
          className={ styles.search }
          aria-label='検索'
          onClick={ () => setSearchOpen(true) }  
        >
          <SearchIcon />
        </IconButton>

        <IconButton
          aria-label='投稿'
          onClick={ () => 
            router.push({
              pathname: '/edit',
              query: { back: router.asPath }
            })
          }
        >
          <CreateIcon />
        </IconButton>
      </Toolbar>

      { searchOpen &&
        <Search searchOpen={ searchOpen } setSearchOpen={ setSearchOpen } />
      }
    </AppBar>
  )
}

export default Header