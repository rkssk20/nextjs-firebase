import type { Dispatch, SetStateAction } from 'react';

import styles from '@/styles/components/edit/categories.module.scss'
import type { SelectChangeEvent } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import Select from '@mui/material/Select';
import MenuItem from '@Mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';

interface CategoriesProps {
  tags: number[];
  setTags: Dispatch<SetStateAction<number[]>>;
}

const Categories = ({ tags, setTags }: CategoriesProps) => {
  // カテゴリを選択
  const handleChange = (e: SelectChangeEvent<number[]>) => {
    setTags(e.target.value as number[])
    // setTags()
  }

  return (
    <Select
      className={ styles.select }
      classes={{ select: styles.select_root }}
      SelectDisplayProps={{ style: { padding: '6px 16px' } }}
      multiple
      displayEmpty
      value={ tags }
      renderValue={ (selected) =>
        (selected.length === 0) ?
        <span className={ styles.categories }>
          <TagIcon className={ styles.tag_icon } />
          カテゴリを選択
        </span>
        :
        selected.map(item => (
          <span key={ item }>
            { (item === 0) ? '# フロント' : '# サーバーレス' }
          </span>
        ))
      }
      input={
        <InputBase className={ styles.input } classes={{ focused: styles.input_focused }} />
      }
      MenuProps={{ PaperProps: { elevation: 3 } }}
      IconComponent={ () => <></> }
      onChange={ handleChange }
    >
      { ['# フロント', '# サーバーレス'].map((item, index) => (
        <MenuItem
          className={ styles.menu_item }
          classes={{ root: styles.menu_item_selected }}
          key={item }
          value={ index }
        >
          <Checkbox checked={ tags.indexOf(index) > -1 } />
          { item }
        </MenuItem>
      )) }
    </Select>
  )
}

export default Categories