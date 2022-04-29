import { useState } from 'react';
import Side from '@/components/header/Side';
import Search from '@/components/header/Search';
import Post from '@/components/header/Post';
import Tips from '@/atoms/Tip'

import styles from '@/styles/components/header/header.module.scss'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

const Header = () => {
  const [sideOpen, setSideOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [postOpen, setPostOpen] = useState(false)

  return (
    <AppBar
      className={ styles.appbar }
      classes={{ root: styles.appbar_root }}
      color='inherit'
      position="static"
    >
      <Toolbar>
        <Tips title='メニュー'>
          <IconButton
            className={ styles.side_button }
            size="large"
            edge="start"
            // color="inherit"
            onClick={ () => setSideOpen(true) }
          >
            <MenuIcon />
          </IconButton>
        </Tips>

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
            onClick={ () => setSearchOpen(true) }  
          >
            <SearchIcon />
          </IconButton>
        </Tips>

        <Tips title='投稿'>
          <IconButton
            onClick={ () => setPostOpen(true) }
          >
            <CreateIcon />
          </IconButton>
        </Tips>
      </Toolbar>

      <Side sideOpen={ sideOpen } setSideOpen={ setSideOpen } />
      { searchOpen &&
        <Search
          searchOpen={ searchOpen }
          setSearchOpen={ setSearchOpen }
        />
      }

      { postOpen &&
        <Post
          postOpen={ postOpen }
          setPostOpen={ setPostOpen }
        />
      }
    </AppBar>
  )
}

export default Header