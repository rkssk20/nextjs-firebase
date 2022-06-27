import { useState, ReactNode } from 'react'
import type { NextPage } from 'next'
import Router from 'next/router'
import { useRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'
import Header from '@/components/header/Header'
import Hamburger from '@/components/header/hamburger/Hamburger'

import styles from '@/styles/components/provider/mui.module.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import Fade from '@mui/material/Fade'
import LinearProgress from '@mui/material/LinearProgress'

interface MuiProps {
  children: ReactNode
}

const Mui: NextPage<MuiProps> = ({ children }) => {
  const [hamburger, setHamburger] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressOpen, setProgressOpen] = useState(false)
  const [notificate, setNotificate] = useRecoilState(notificateState)

  // インジケーターを開始する
  const handleProgressOpen = () => {
    setProgress(30)
    setProgressOpen(true)
  }

  // インジケーターを終了する
  const handleProgressClose = () => {
    setProgress(100)

    setTimeout(() => {
      setProgressOpen(false)

      setTimeout(() => {
        setProgress(0)
      }, 195)
    }, 350)
  }

  // 画面遷移でインジケーター開始
  Router.events.on('routeChangeStart', handleProgressOpen)
  // 読み込み終了
  Router.events.on('routeChangeComplete', handleProgressClose)
  // エラー
  Router.events.on('routeChangeError', handleProgressClose)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2b825b',
      },
      secondary: {
        main: '#F8BBD0',
      },
      info: {
        main: '#536471',
      },
      warning: {
        main: '#F4212E',
      },
    },
    typography: {
      fontFamily: [
        'Helvetica Neue',
        'arial',
        'Hiragino Kaku Gothic ProN',
        'Meiryo',
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
        color: '0F1419',
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
        sm: 700,
        md: 768,
        lg: 998,
        xl: 1098,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      {/* 画面遷移の読み込みインジケーター */}
      <Fade in={progressOpen}>
        <LinearProgress
          className={styles.liner}
          classes={{ root: styles.liner_root }}
          variant='determinate'
          value={progress}
        />
      </Fade>

      {/* ヘッダー */}
      <Header setHamburger={setHamburger} />

      {/* メインコンテンツ */}
      <div className={styles.container}>{children}</div>

      {/* 通知 */}
      <Snackbar
        open={notificate.open}
        onClose={() => setNotificate({ open: false, message: '' })}
        message={notificate.message}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      />

      {/* ハンバーガーメニュー */}
      <Hamburger hamburger={hamburger} setHamburger={setHamburger} />
    </ThemeProvider>
  )
}

export default Mui
