import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router';
import UserIcon from '@/atoms/UserIcon'

import styles from '@/styles/components/header/side.module.scss'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider'
import TagIcon from '@mui/icons-material/Tag';
import Typography from '@mui/material/Typography';

interface SideProps {
  sideOpen: boolean;
  setSideOpen: Dispatch<SetStateAction<boolean>>;
}

const Side = ({ sideOpen, setSideOpen }: SideProps) => {
  const test_name = 'アカウント'
  const router = useRouter()

  return (
    <Drawer
      open={ sideOpen }
      onClose={ () => setSideOpen(false) }
    >
      <List className={ styles.list }>
        <ListItemButton
          className={ styles.list_item_button }
          onClick={ () => router.push('/account') }
        >
          <ListItemIcon>
            <UserIcon name={ test_name.slice(0, 1) } size='medium' />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
            { test_name }
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          className={ styles.list_item_button }
          onClick={ () => router.push('/') }
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
            トップ
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          className={ styles.list_item_button }
          onClick={ () => router.push('/ranking') }
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>

          <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
            ランキング
          </ListItemText>
        </ListItemButton>

        <Divider className={ styles.divider } classes={{ root: styles.divider_root }} />

        { ['フロントエンド', 'サーバーレス'].map(item => (
          <ListItemButton
            key={ item }
            className={ styles.list_item_button }
            onClick={ () => {
              (item === 'フロントエンド') ?
              router.push('/front') :
              router.push('/serverless')
            }}
          >
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>

            <ListItemText primaryTypographyProps={{ variant: 'h6' }}>
              { item }
            </ListItemText>
          </ListItemButton>
        ))}
      </List>

      <Typography className={ styles.caption } variant='caption'>
        @2022 Next.js × Supabase
      </Typography>
    </Drawer>
  )
}

export default Side