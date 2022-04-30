import { Dispatch, SetStateAction } from 'react';
import DialogPaper from '@/atoms/DialogPaper'
import ShareButton from '@/atoms/ShareButton'

interface ShareProps {
  open: boolean;
  handleClose: () => void;
}

const Share = ({ open, handleClose }: ShareProps) => {
  return (
    <DialogPaper
      open={ open }
      handleClose={ handleClose }
    >
      <ShareButton url='a' social='twitter' />
      <ShareButton url='a' social='facebook' />
      <ShareButton url='a' social='line' />
      <ShareButton url='a' social='note' />
      <ShareButton url='a' social='hatena' />
    </DialogPaper>
  )
}

export default Share