import { useRouter } from 'next/router'
import Link from 'next/link';

import styles from '@/styles/components/account/bar.module.scss'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Bar = () => {
  const router = useRouter()
  const display_id = router.query.display_id
  
  const tabList = [
    { name: '投稿', url: `/account/${ display_id }` },
    { name: 'いいね', url: `/account/${ display_id }/likes` }
  ]

  return (
    <AppBar
      className={ styles.app_bar }
      classes={{ root: styles.app_bar_root }}
      position='sticky'
      color='inherit'
      elevation={ 0 }
    >
      <Tabs
        value={ (router.pathname === '/account/[display_id]/likes') ? 1 : 0 }
        aria-label="タブ"
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