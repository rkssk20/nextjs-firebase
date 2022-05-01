import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router'
import Search from '@/components/header/Search';
import Post from '@/components/header/Post';
import Tips from '@/atoms/Tip'

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
  const [postOpen, setPostOpen] = useState(false)
  const pc = useMediaQuery('(min-width: 1148px')
  const router = useRouter()
  const hash = router.asPath.split('#')[1]

  console.log(router);
  console.log(hash);
  

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
          <Tips title='メニュー'>
            <IconButton
              className={ styles.side_button }
              size="large"
              edge="start"
              onClick={ () => setMenuOpen(true) }
            >
              <MenuIcon />
            </IconButton>
          </Tips>
        }

        <Typography
          className={ styles.title }
          variant="h6"
          component="div"
          color='primary'
        >
          Next.js × Supabase
        </Typography>

        <Tips title='検索'>
          <IconButton
            className={ styles.search }
            onClick={ () => 
              router.push(router.asPath + '#search')
            }  
          >
            <SearchIcon />
          </IconButton>
        </Tips>

        <Tips title='投稿'>
          <IconButton
            onClick={ () => router.push(router.asPath + '#post') }
          >
            <CreateIcon />
          </IconButton>
        </Tips>
      </Toolbar>

      { (hash === 'search') &&
        <Search
          searchOpen={ searchOpen }
          setSearchOpen={ setSearchOpen }
        />
      }

      { (hash === 'post') &&
        <Post
          postOpen={ postOpen }
          setPostOpen={ setPostOpen }
        />
      }
    </AppBar>
  )
}

export default Header