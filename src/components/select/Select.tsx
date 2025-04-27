'use client'
import { FormControl, InputLabel, MenuItem, Select as RootSelect, SelectChangeEvent, SelectClassKey, SelectClasses } from '@mui/material';
import selectStyle from './select.module.scss';
import { spaceToDash } from '@utils/string.utils';
import { CSSProperties, useEffect, useState } from 'react';
import { isEmptyObject } from '@utils/validator.utils';
import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';

interface ISelect {
  label: string;
  hideLabel?: boolean;
  values: string[] | number[];
  name: string;
  classes?: Partial<SelectClasses>;
  className?: string;
  style?: CSSProperties;
  filterOptions?: IFilterQuery;
  handleChange?: (key: string, value: string) => void;
}
export default function Select({label, values, name, hideLabel, classes, style, className, handleChange, filterOptions}: ISelect) {
  const [value, setValue] = useState<string>('');
  const searchParams = useSearchParams();
  const handleSelectChange = (e: SelectChangeEvent): void => {
    setValue(e.target.value);
    if ( handleChange ) {
      handleChange(name, e.target.value);
    }
  }
  useEffect(() => {
    const params = queryString.parse(searchParams.toString());
    if (!params[name] || params[name] === '') {
      setValue('');
    } else {
      setValue(params[name] as string);
    }
  }, [searchParams]);
  return (
    <div className={selectStyle['container']}>
      <FormControl fullWidth>
        {
          !hideLabel ?
          <InputLabel id={`${spaceToDash(label)}-label`} className={selectStyle['label']}>
            {label}
          </InputLabel> :
          null
        }
        <RootSelect
          labelId={!hideLabel ? `${spaceToDash(label)}-label` : undefined}
          value={value}
          label={!hideLabel ? label : null}
          onChange={handleSelectChange}
          displayEmpty={hideLabel ?? false}
          name={name}
          sx={{fontSize: '1.4rem'}}
          classes={classes ?? undefined}
          style={style ?? undefined}
          className={className ?? undefined}
        >
          <MenuItem
            value={""}
            sx={{
              fontSize: '1.4rem',
              minHeight: '4rem',
              fontWeight: 'bold',
              lineHeight: '4rem',
              textTransform: 'capitalize',
            }}
          >
            {label}
          </MenuItem>
          {
            values.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                sx={{
                  fontSize: '1.4rem',
                  minHeight: '4rem',
                  lineHeight: '4rem',
                  textTransform: 'capitalize',
                }}
              >
                {item}
              </MenuItem>
            ))
          }
        </RootSelect>
      </FormControl>
    </div>
  )
}
