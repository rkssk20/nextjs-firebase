import { useState, ReactNode } from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notificateState, dialogState } from '@/lib/recoil'
import useAuth from '@/hooks/useAuth'
import Header from '@/components/header/Header'
import Hamburger from '@/components/header/Hamburger'
import Side from '@/components/side/side'

const Login = dynamic(() => import('@/components/dialog/Login'))
const Share = dynamic(() => import('@/components/dialog/Share'))
const Report = dynamic(() => import('@/components/dialog/Report'))
const Delete = dynamic(() => import('@/components/dialog/Delete'))

import styles from '@/styles/components/provider/mui.module.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import Container from '@mui/material/Container'
import useMediaQuery from '@mui/material/useMediaQuery'

interface MuiProps {
  children: ReactNode
}

const Mui: NextPage<MuiProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificate, setNotificate] = useRecoilState(notificateState)
  const dialog = useRecoilValue(dialogState)
  const tablet = useMediaQuery('(min-width: 882px')
  const router = useRouter()
  const content = dialog.content

  // ついでにログイン処理も行う
  useAuth()

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2b825b'
      },
      secondary: {
        main: '#F8BBD0'
      },
      info: {
        main: '#536471'
      }
    },
    typography: {
      fontFamily: [
        'Segoe UI',
        'Meiryo',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'sans-serif',
      ].join(','),
      // 重要なタイトル (太字)
      h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '0F1419',
      },
      // 重要なタイトル
      h2: {
        fontSize: 24,
        color: '0F1419',
      },
      // タイトル (太字)
      h3: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F1419',
      },
      // タイトル
      h4: {
        fontSize: 20,
        color: '0F1419',
      },
      // 少し大きいタイトル (太字)
      h5: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '0F1419',
      },
      // 少し大きいタイトル
      h6: {
        fontSize: 17,
        color: '0F1419'
      },
      // 少し大きい タグ、色付きリンク
      subtitle1: {
        fontSize: 17,
        color: '#1F94E6',
      },
      // タグ、色付きリンク
      subtitle2: {
        fontSize: 15,
        color: '#3FCF8E',
      },
      // 標準 #黒
      body1: {
        fontSize: 15,
        color: '#0F1419',
      },
      // 標準 #黒
      body2: {
        fontSize: 15,
        color: '#0F1419',
      },
      // ボタン用 #白 bold
      button: {
        fontSize: 15,
        color: '#ffffff',
        fontWeight: 600,
        textTransform: 'none',
      },
      // 補足 #グレー
      caption: {
        fontSize: 15,
        color: '#536471',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 882,
        lg: 1164,
        xl: 1200,
      },
    },
  })

  return (
    <ThemeProvider theme={ theme }> 
      {/* ヘッダー */}
      <Header setMenuOpen={ setMenuOpen } />

      {/* ハンバーガーメニュー */}
      <Hamburger menuOpen={ menuOpen } setMenuOpen={ setMenuOpen } />

      {/* メインコンテンツ */}
      <Container
        className={ styles.container }
        classes={{ root: styles.container_root }}
        disableGutters
        maxWidth='sm'
      >
        { children }
      </Container>

      {/* おすすめなど */}
      { ((router.pathname !== '/edit') || tablet ) && <Side /> }

      {/* 通知 */}
      <Snackbar
        open={ notificate.open }
        onClose={ () => setNotificate({ open: false, message: '' }) }
        message={ notificate.message }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      />

      {/* ダイアログ */}
      { (content !== '') &&
        (content === 'login') ? <Login /> :
        (content === 'share') ? <Share /> :
        ((content === 'article_report') || (content === 'comment_report')) ? <Report /> :
        ((content === 'article_delete') || (content === 'comment_delete')) && <Delete />
      }
    </ThemeProvider>
  )
}

export default Mui
