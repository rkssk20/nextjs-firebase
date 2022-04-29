import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil'
import { searchHistorySelector } from "@/lib/recoil";
import DialogPaper from "@/atoms/DialogPaper"
import Tips from '@/atoms/Tip'

import styles from '@/styles/components/header/search.module.scss'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

interface SearchProps {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const Search = ({ searchOpen, setSearchOpen }: SearchProps) => {
  const [search, setSearch] = useState('')
  const [searchHistory, setSearchHistory] = useRecoilState(searchHistorySelector)
  const router = useRouter()

  const handleClose = () => {
    setSearchOpen(false)
  }

  const handlePost = (e: FormEvent) => {
    e.preventDefault()
    if(search.length === 0) return

    setSearchHistory([search, ...searchHistory])
  }

  const handleRoute = (item: string) => {
    router.push(`/search/${ item }`)
  }

  return (
    <DialogPaper
      open={ searchOpen }
      handleClose={ handleClose }
    >
      <DialogTitle className={ styles.dialog_title }>
        <form className={ styles.input } onSubmit={ handlePost }>
          <Tips title='検索'>
            <IconButton onClick={ handlePost }>
              <SearchIcon />
            </IconButton>
          </Tips>

          <InputBase
            className={ styles.input_base }
            placeholder="検索"
            autoFocus={ true }
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />
        </form>

        <Button
          color='inherit'
          className={ styles.button }
          classes={{ root: styles.button_root }}
          onClick={ handleClose }
        >
          キャンセル
        </Button>
      </DialogTitle>

      <DialogContent>
        <Typography variant='h6'>検索履歴</Typography>

        { (searchHistory.length > 0) ?
          <List>
            { searchHistory.map(item => (
              <ListItemButton
                key={ item }
                className={ styles.list_item_button }
                onClick={ () => handleRoute(item) }
              >
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>

                <ListItemText>
                  { item }
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
          :
          <List>
            <Typography variant="body1">履歴がありません</Typography>
            <Typography variant="body1">例) Next.js, supabase ...</Typography>
          </List>
        }
      </DialogContent>
    </DialogPaper>
  )
}

export default Search