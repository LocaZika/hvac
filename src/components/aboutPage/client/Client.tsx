import { Container, Grid, useMediaQuery } from '@mui/material';
import clientStyle from './client.module.scss';

export default function Client({data}: {data: TClients}) {
  return (
    <section className={`${clientStyle['container']} spad`}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <div className="section-title">
              <span>{data.title}</span>
              <h2>{data.subTitle}</h2>
            </div>
          </Grid>
        </Grid>
        <Grid container width={'auto'} marginX={'-1.5rem'}>
          {
            data.items.map(({id, img, alt}) => (
              <Grid key={id} item xs={12} sm={6} md={4} lg={3} paddingX={'1.5rem'}>
                <div className={clientStyle['item']}>
                  <img src={`imgs/about/clients/${img}`} alt={alt} loading='lazy' decoding='async' />
                </div>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </section>
  )
}
