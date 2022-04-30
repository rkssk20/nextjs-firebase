import { useState, MouseEvent, TouchEvent } from 'react'
import useCreatedAt from '@/hooks/useCreatedAt'
import Tips from '@/atoms/Tip'
import DialogPaper from '@/atoms/DialogPaper'
import Share from '@/components/post/Share'
import Report from '@/components/post/Report'
import Delete from '@/components/post/Delete'

import styles from '@/styles/components/post/actions.module.scss'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'

interface ActionsProps {
  id: string;
  likes: number;
  like: boolean;
  mine: boolean;
  created_at: string;
}

const Actions = ({ id, likes, like, mine, created_at }: ActionsProps) => {
  const [shareOpen, setShareOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState<null | HTMLElement>(null)
  const open = Boolean(detailsOpen);
  const [dialogOpen, setDialogOpen] = useState<null | 1 | 2 | 3>(null)
  const created = useCreatedAt(created_at)

  const handleLikes = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // setShareOpen(true)
  }

  const handleShare = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialogOpen(1)
  }
  
  const handleDetails = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setDetailsOpen(e.currentTarget);
  };

  const handleDetailsClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDetailsOpen(null)
  }

  const handleDialogClose = () => {
    setDialogOpen(null)
  }

  return (
    <CardActions className={ styles.actions } classes={{ root: styles.actions_root }}>
      {/* 投稿時間 */}
      <Typography
        className={ styles.created }
        variant='caption'
      >
        { created }
      </Typography>
        
      {/* いいねボタンといいね数 */}
      <Stack
        className={ styles.stack }
        direction='row'
        alignItems='center'
      >
        <Tips title='いいね'>
          <IconButton
            className={ styles.favorite }
            classes={{ root: styles.favorite_root }}
            component='div'
            onClick={ handleLikes }
            onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
            onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
          >
            { like ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon /> }
        </IconButton>
        </Tips>

        <Typography variant='caption'>{ likes }</Typography>
      </Stack>

      {/* 共有ボタン */}
      <Tips title='共有'>
        <IconButton
          component='div'
          onClick={ handleShare }
          onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
          onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
          >
          <ShareIcon />
        </IconButton>
      </Tips>

      {/* 詳細ボタン */}
      <Tips title='詳細'>
        <IconButton
          component='div'
          id="demo-positioned-button"
          aria-controls={ open ? 'demo-positioned-menu' : undefined }
          aria-haspopup="true"
          aria-expanded={ open ? 'true' : undefined }
          onClick={ handleDetails }
          onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
          onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
        >
          <MoreVertIcon />
        </IconButton>
      </Tips>

      {/* 詳細メニュー */}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={detailsOpen}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        open={ open }
        onClose={ handleDetailsClose }
        onClick={ handleDetails }
        onMouseDown={ (e: MouseEvent<HTMLDivElement>) => e.stopPropagation() }
        onTouchStart={ (e: TouchEvent<HTMLDivElement>) => e.stopPropagation() }
      >
        { mine ?
          <MenuItem onClick={ () => setDialogOpen(3) }>削除</MenuItem>
          :
          <MenuItem onClick={ () => setDialogOpen(2) }>報告</MenuItem>
        }
      </Menu>

      { dialogOpen &&
        (dialogOpen === 1) ?
        <Share
          id={ id }
          open={ Boolean(dialogOpen) }
          handleClose={ handleDialogClose }
        />
        : ((dialogOpen === 2) ?
        <Report
          id={ id }
          open={ Boolean(dialogOpen) }
          handleClose={ handleDialogClose }
        />
        :
        <Delete
          open={ Boolean(dialogOpen) }
          handleClose={ handleDialogClose }
          id={ id }
        />)
      }
    </CardActions>
  )
}

export default Actions