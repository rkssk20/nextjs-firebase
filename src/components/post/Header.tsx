import type { MouseEvent, TouchEvent } from 'react'
import NextLink from 'next/link'
import { definitions } from '@/types/supabase'
import CreatedAt from '@/lib/createdAt'
import AvatarIcon from '@/atoms/AvatarIcon'
import InitialIcon from '@/atoms/InitialIcon'

import styles from '@/styles/components/post/header.module.scss'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

interface HeaderProps {
  id: definitions['profiles']['id']
  username: definitions['profiles']['username']
  avatar: definitions['profiles']['avatar']
  created_at: string
}

const Header = ({ id, username, avatar, created_at }: HeaderProps) => {
  const created = CreatedAt(created_at)

  return (
    <div className={ styles.field }>
      {/* アバター */}
      <NextLink href={ `/account/${ id }` } passHref>
        <MuiLink
          underline='none'
          onClick={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
          onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
          onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
        >
          { avatar ?
            <AvatarIcon src={ process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/avatars/' + avatar } variant='link' />
            :
            <InitialIcon username={ username } variant='link' />
          }
        </MuiLink>
      </NextLink>

      {/* タイトル */}
      <NextLink href={ `/account/${ id }` } passHref>
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
          { username + '・@' + id }
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