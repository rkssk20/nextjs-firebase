import { useRouter } from 'next/router'
import Link from 'next/link';

import styles from '@/styles/components/search/bar.module.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Bar = () => {
  const router = useRouter()
  const q = router.query.q
  const tabList = [
    { name: '投稿', url: q ? `?q=${ q }` : ''  },
    { name: 'ユーザー', url: q ? `?q=${ q }&sorce=user` : '?sorce=user' }
  ]

  return (
    <Tabs
      className={ styles.tabs }
      value={ Boolean(router.query.sorce) ? 1 : 0 }
      aria-label="basic tabs example"
      variant='fullWidth'
      textColor='inherit'
    >
      { tabList.map((item) => (
        <Link key={ item.name } href= { '/search' + item.url } passHref>
          <Tab className={ styles.tab } label={ item.name } />
        </Link>
      ))}
    </Tabs>
  )
}

export default Bar