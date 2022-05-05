import DialogPaper from "@/atoms/DialogPaper"

import styles from '@/styles/components/post/delete.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

interface DeleteProps {
  open: boolean;
  handleClose: () => void;
  id: string;
}

const Delete = ({ open, handleClose, id }: DeleteProps) => {
  return (
    <DialogPaper
      open={ open }
      handleClose={ handleClose }
    >
      <DialogTitle>
        <IconButton onClick={ handleClose }>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant='h3'>この記事を削除しますか？</Typography>
        <Typography
          className={ styles.error }
          variant='body1'
          color='error'
        >
          削除された記事は戻すことができません。
        </Typography>

        <Stack direction='row' justifyContent='center'>
          <Button
            className={ styles.button }
            color="error"
            variant="contained"
            disableElevation
          >
            削除
          </Button>
          <Button
            className={ styles.cancel }
            color="inherit"
            variant="contained"
            disableElevation
            onClick={ handleClose }
          >
            キャンセル
          </Button>
        </Stack>

      </DialogContent>
    </DialogPaper>
  )
}

export default Delete