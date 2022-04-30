import type { MouseEvent, TouchEvent } from 'react'
import NextLink from 'next/link'

import styles from '@/styles/components/post/content.module.scss'
import CardContent from '@mui/material/CardContent'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface ContentProps {
  title: string;
  details: string;
  tags: number[];
}

const Content = ({ title, details, tags }: ContentProps) => {
  return (
    <CardContent className={ styles.content } classes={{ root: styles.content_root }}>
      <Typography variant='h6'>{ title }</Typography>
      <Typography variant='body1'>{ details + '...' }</Typography>

      <Stack className={ styles.tags } direction='row' alignItems='center'>
        { tags.map(item => (
          <NextLink
            key={ item }
            href={ (item === 0) ? '/front' : '/serverless' }
            passHref
          >
            <MuiLink
              underline='hover'
              onMouseDown={ (e: MouseEvent<HTMLSpanElement>) => e.stopPropagation() }
              onTouchStart={ (e: TouchEvent<HTMLSpanElement>) => e.stopPropagation() }
            >
              { (item === 0) ? '#フロント' : '#サーバーレス' }
            </MuiLink>
          </NextLink>
      ))}
      </Stack>
    </CardContent>
  )
}

export default Content