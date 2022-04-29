import { ReactNode } from 'react'
import type { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { notificateState } from '@/lib/recoil'
import Header from '@/components/header/Header'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import Container from '@mui/material/Container'

interface Props {
  children: ReactNode
}

const Mui: NextPage<Props> = ({ children }) => {
  const [notificate, setNotificate] = useRecoilState(notificateState)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3FCF8E'
      },
      secondary: {
        main: '#F8BBD0'
      },
      info: {
        main: '#eff3f4'
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
      // 少し大きいタイトル
      h5: {
        fontSize: 17,
        color: '0F1419',
      },
      // 太い文字
      h6: {
        fontSize: 17,
        fontWeight: 'bold',
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
        color: '#1F94E6',
      },
      // 標準 #黒
      body1: {
        fontSize: 15,
        color: '#0F1419',
      },
      // 標準 #グレー
      body2: {
        fontSize: 15,
        color: '#536471',
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
        md: 900,
        lg: 1160,
        xl: 1200,
      },
    },
  })

  return (
    <ThemeProvider theme={ theme }> 
      <Header />

      <Snackbar
        open={ notificate.open }
        onClose={ () => setNotificate({ open: false, message: '' })}
        message={ notificate.message }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      />

      <Container disableGutters maxWidth='lg'>
        <Container disableGutters maxWidth='sm'>
          {children}
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default Mui
