'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchBarStyle from './searchBar.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useReducer, useState } from 'react';
import { Backdrop, Dialog } from '@mui/material';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { carsPageReducer, carPageInitialState, ECarsPageActionKind } from '@components/carsPage/carsPage.reducer';

export default function SearchBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  const [state, dispatch] = useReducer(carsPageReducer, carPageInitialState);
  const handleOpen = (): void => {
    setOpen(true);
  }
  const handleClose = (): void => {
    setOpen(false);
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }
  const handleSubmit = () => {
    dispatch({
      type: ECarsPageActionKind.updateSearchQuery,
      payload: { searchQuery },
    });
    dispatch({
      type: ECarsPageActionKind.clearFilterOptions,
      payload: {},
    });
    router.replace('/cars?search=' + searchQuery);
  }
  return (
    <div className={searchBarStyle['container']}>
      <div className={searchBarStyle["searchBtn"]}>
        <button type="button" onClick={handleOpen}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        slots={{backdrop: Backdrop}}
        slotProps={{backdrop: {sx: {backgroundColor: "#fdfdfd"}}}}
        PaperProps={{
          component: 'div',
          className: searchBarStyle['search-dialog'],
          style: {
            boxShadow: 'none',
          }
        }}
      >
        <button type="button" onClick={handleClose} className={searchBarStyle['search-dialog__close-btn']}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <form
          className={searchBarStyle['search-dialog__form']}
          onSubmit={handleSubmit}
        >
          <input type="text" value={searchQuery} onChange={handleInputChange} name="search" placeholder='Search here...'/>
        </form>
      </Dialog>
    </div>
  )
}
