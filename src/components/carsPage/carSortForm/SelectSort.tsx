'use client'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import selectSortStyle from './selectSort.module.scss';
import { ISortByChangeFunction } from './CarSortForm';


export default function SelectSort({ handleSortByChange }: ISortByChangeFunction) {
  const [value, setValue] = useState<TSortBy>('ascending');
  const handleChangeAction = (e: SelectChangeEvent) => {
    setValue(e.target.value as TSortBy);
    handleSortByChange(e.target.value as TSortBy);
  }
  return (
    <div className={`${selectSortStyle['container']} ${selectSortStyle['right']}`}>
      <h6>sort by price</h6>
      <Select
        value={value}
        onChange={handleChangeAction}
        displayEmpty
        name={'sortBy'}
        className={selectSortStyle['select-root']}
        SelectDisplayProps={{
          className: selectSortStyle['select-item'],
          style: {height: '3.6rem'}
        }}
      >
        <MenuItem
          value={'ascending'}
          className={selectSortStyle['item']}
        >
          <span>ascending</span>
        </MenuItem>
        <MenuItem
          value={'descending'}
          className={selectSortStyle['item']}
        >
          <span>descending</span>
        </MenuItem>
      </Select>
    </div>
  )
}
