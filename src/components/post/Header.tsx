import type { MouseEvent, TouchEvent } from 'react'
import NextLink from 'next/link'
import CreatedAt from '@/lib/createdAt'
import UserIcon from '@/atoms/UserIcon'

import styles from '@/styles/components/post/header.module.scss'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

interface HeaderProps {
  display_id: string;
  name: string;
  created_at: string
}

const Header = ({ display_id, name, created_at }: HeaderProps) => {
  const created = CreatedAt(created_at)

  return (
    <div className={ styles.field }>
      {/* アバター */}
      <NextLink href={ `/account/${ display_id }` } passHref>
        <MuiLink
          underline='none'
          onClick={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
          onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
          onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
        >
          <UserIcon name={ name } variant='link' />
        </MuiLink>
      </NextLink>

      {/* タイトル */}
      <NextLink href={ `/account/${ display_id }` } passHref>
        <MuiLink
          className={ styles.title }
          underline='hover'
          variant='body1'
          color='inherit'
          noWrap
          onClick={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
          onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
          onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
        >
          { name + '・@' + display_id }
        </MuiLink>
      </NextLink>

      {/* 投稿日時 */}
      <Typography className={ styles.created } variant='caption'>
        { '・' + created }
      </Typography>
    </div>
  )
}

export default Header