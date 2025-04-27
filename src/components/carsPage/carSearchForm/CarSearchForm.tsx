'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import carSearchStyle from './carSearchForm.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormEvent, useState } from 'react';
export default function CarSearchForm({handleSearch}: {handleSearch: (searchQuery: string) => void}) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  }
  return (
    <div className={carSearchStyle['container']}>
      <h5>car search</h5>
      <form onSubmit={handleSubmit}>
        <input type="text" name="q" placeholder='Search...' onChange={handleInputChange} />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  )
}
