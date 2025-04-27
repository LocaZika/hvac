'use client'
import { Container, Grid, useMediaQuery } from '@mui/material';
import ctaStyle from './cta.module.scss';
import { redirect } from 'next/navigation';

export default function Cta({data}: {data: TCta}) {
  const mediaquery = useMediaQuery('(max-width: 767px)');
  const handleClick = (): void => {
    redirect('/cars');
  }
  return (
    <div className={ctaStyle['container']}>
      <Container>
        <Grid container>
          {
            data.items.map(({id, title, text, img}) => (
              <Grid item md={6} lg={6} key={id} paddingX={mediaquery ? '' : '1.5rem'}>
                <div
                  className={`${ctaStyle['item']} set-bg`}
                  style={{backgroundImage: `url(/imgs/cta/${img})`}}
                  onClick={handleClick}
                >
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </div>
  )
}
