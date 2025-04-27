'use client'
import { useState } from 'react';
import tabStyle from './tabs.module.scss';
import { Tab, Tabs as RootTabs, Grid } from '@mui/material';
import Select from '@components/select/Select';
import filterAction from '@actions/filter.action';

interface ITabPanel {
  children: React.ReactNode,
  index: number,
  value: number,
}
const TabPanel = ({children, index, value}: ITabPanel) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
      className={tabStyle['tab-panel']}
    >
      {value === index && children}
    </div>
  )
}

const a11yTabPanel = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`
})

interface ITabs {
  data: {
    models: number[],
    brands: string[],
    types: string[],
    transmissions: string[],
  }
}
export default function Tabs({data}: ITabs) {
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  }
  return (
    <>
      <div className={tabStyle['container']}>
        <div className={tabStyle['bar']}>
          <RootTabs
            value={value}
            onChange={handleChange}
            classes={{
              root: tabStyle['tabs-root'],
              indicator: tabStyle['indicator'],
              scroller: tabStyle['scroller'],
            }}
          >
            <Tab label='Car Rental' {...a11yTabPanel(0)} className={tabStyle['bar__tab']} />
            <Tab label='buy car' {...a11yTabPanel(1)} className={tabStyle['bar__tab']} />
          </RootTabs>
        </div>
        <TabPanel value={value} index={0}>
          <h2>find your dream car</h2>
          <form action={filterAction}>
            <Grid container className={tabStyle['select-list']}>
              <Grid item xs={12} sm={6} className={tabStyle['select-list__item']}>
                <Select name={'model'} label='select model' values={data.models} />
              </Grid>
              <Grid item xs={12} sm={6} className={tabStyle['select-list__item']} >
                <Select name={'brand'} label='select brand' values={data.brands} />
              </Grid>
              <Grid item xs={12} sm={6} className={tabStyle['select-list__item']} >
                <Select name={'type'} label='select type' values={data.types} />
              </Grid>
              <Grid item xs={12} sm={6} className={tabStyle['select-list__item']} >
                <Select name={'transmission'} label='select transmission' values={data.transmissions} />
              </Grid>
            </Grid>
            <button type="submit" className={tabStyle['submit-btn']}>search</button>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h2>buy your dream car</h2>
          <form action={filterAction}>
            <Grid container className={tabStyle['select-list']}>
              <Grid item xs={12} sm={6} className={tabStyle['select-list__item']}>
                <Select name={'model'} label='select model' values={data.models} />
              </Grid>
              <Grid item xs={12} sm={6} className={tabStyle['select-list__item']} >
                <Select name={'brand'} label='select brand' values={data.brands} />
              </Grid>
              <Grid item xs={12} sm={6} className={tabStyle['select-list__item']} >
                <Select name={'type'} label='select type' values={data.types} />
              </Grid>
              <Grid item xs={12} sm={6} className={tabStyle['select-list__item']} >
                <Select name={'transmission'} label='select transmission' values={data.transmissions} />
              </Grid>
            </Grid>
            <button type="submit" className={tabStyle['submit-btn']}>search</button>
          </form>
        </TabPanel>
      </div>
    </>
  )
}
