'use client'
import { Container, Grid, useMediaQuery } from '@mui/material';
import aboutStyle from './about.module.scss';
import Image from 'next/image';

export default function About({data}: {data: TAbout}) {
  const mediaQuery = useMediaQuery('(max-width: 575px)');
  return (
    <section className={`${aboutStyle['container']} spad`}>
      <Container>
        <Grid container>
          <Grid item lg={12}>
            <div className={'section-title'}>
              <h2>{data.title[0]}<br />{data.title[1]}</h2>
              <p>{data.text}</p>
            </div>
          </Grid>
        </Grid>
        <div className={aboutStyle['features']}>
          <Grid container>
            {
              data.features.map(({id, title, text, img}) => (
                <Grid item key={id} sm={6} md={6} lg={4}>
                  <div className={aboutStyle['item']}>
                    <div className={aboutStyle['icon']}>
                      <Image src={`/imgs/about/${img}`} alt='feature image' fill sizes='auto' />
                    </div>
                    <h5>{title}</h5>
                    <p>{text}</p>
                  </div>
                </Grid>
              ))
            }
          </Grid>
        </div>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className={aboutStyle['pic']}>
              <img src={`/imgs/about/${data.img}`} loading='lazy' alt="about image" />
            </div>
          </Grid>
          {
            data.items.map(({id, text, title}) => (
              <Grid item key={id} sm={6} md={6} lg={6} sx={
                mediaQuery ?
                {paddingX: 0} :
                {paddingRight: '1.5rem', ':last-child': {paddingRight: 0, paddingLeft: '1.5rem'}}
              }>
                <div className={aboutStyle['item']}>
                  <h5>{title}</h5>
                  <p>{text}</p>
                </div>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </section>
  )
}
