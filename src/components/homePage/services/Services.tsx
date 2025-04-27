'use client'
import { Container, Grid, useMediaQuery } from '@mui/material';
import serviceStyle from './services.module.scss';
import Image from 'next/image';

export default function Services({data}: {data: TServices}) {
  const mediaQuery = useMediaQuery('(max-width: 479px)');
  return (
    <section className={`${serviceStyle['container']} spad`}>
      <Container>
        <Grid container>
          <Grid item lg={12}>
            <div className={'section-title'}>
              <span>{data.title}</span>
              <h2>{data.subTitle}</h2>
              <p>{data.text}</p>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          {
            data.items.map(({id, title, text, img}) => (
              <Grid item key={id} xs={12} sm={6} md={6} lg={3} paddingX={mediaQuery ? 0 : '1.5rem'}>
                <div className={serviceStyle['service-item']}>
                  <Image src={`/imgs/services/${img}`} alt='service image' width={60} height={60}/>
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
