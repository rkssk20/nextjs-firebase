import { useRouter } from 'next/router'
import Link from 'next/link';

import styles from '@/styles/components/account/bar.module.scss'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Bar = () => {
  const router = useRouter()
  const tabList = [
    { name: '投稿', url: `/account/${ router.query.display_id }` },
    { name: 'いいね', url: `${ router.asPath }/likes` }
  ]

  console.log(router)

  return (
    <AppBar
      className={ styles.app_bar }
      classes={{ root: styles.app_bar_root }}
      position='sticky'
      color='inherit'
      elevation={ 0 }
    >
      <Tabs
        className={ styles.tabs }
        value={ (router.pathname === '/account/[display_id]') ? 0 : 1 }
        aria-label="basic tabs example"
        variant='fullWidth'
        textColor='inherit'
      >
        { tabList.map((item) => (
          <Link key={ item.name } href={item.url} passHref>
            <Tab className={ styles.tab } label={ item.name } />
          </Link>
        ))}
      </Tabs>
    </AppBar>
  )
}

export default Bar