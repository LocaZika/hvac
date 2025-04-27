import Select from '@components/select/Select';
import carFilterStyle from './carfilterForm.module.scss';
import { FormEvent, useEffect, useState } from 'react';

interface ICarFilterForm {
  data: TCarFilterForm;
  handleFilter: (filterOptions: IFilterQuery) => void;
  handleClearFilterOptions: () => void;
}
export default function CarFilterForm({data, handleFilter, handleClearFilterOptions}: ICarFilterForm) {
  const [filterOptions, setFilterOptions] = useState<IFilterQuery>({});
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleFilter(filterOptions);
  };
  const handleResetFilter = (e: FormEvent) => {
    e.preventDefault();
    setFilterOptions({});
    handleClearFilterOptions();
  }
  const handleChange = (key: string, value: string) => {
    setFilterOptions({...filterOptions, [key]: value });
  }
  useEffect(() => {
    console.log('>> filter submit: ', filterOptions);
  }, [filterOptions])
  return (
    <div className={carFilterStyle['container']}>
      <h5>car filter</h5>
      <form onSubmit={handleSubmit}>
        {
          data.map(({id, label, name, options}) => (
            <Select
              key={id}
              label={label}
              name={name}
              values={options}
              handleChange={handleChange}
              filterOptions={filterOptions}
              hideLabel
              className={carFilterStyle['select']}
              classes={{
                select: carFilterStyle['item'],
              }}
            />
          ))
        }
        <div className={carFilterStyle['btn']} style={{marginTop: '1rem'}}>
          <button type="submit">Filter car</button>
        </div>
      </form>
      <div className={carFilterStyle['btn']}>
        <button type="button" onClick={handleResetFilter}>reset filter</button>
      </div>
    </div>
  )
}
