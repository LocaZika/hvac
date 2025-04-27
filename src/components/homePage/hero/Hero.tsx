import { Container, Grid } from '@mui/material';
import heroStyle from './hero.module.scss';
import Carousel from '@components/carousel/Carousel';
import HeroTabs  from '@components/homePage/hero/components/tabs/Tabs.hero';
import Link from 'next/link';
import { spaceToDash } from '@utils/string.utils';

export default function Hero({data}: {data: THero}) {
  return (
    <section className={heroStyle['container']}>
      <div className={heroStyle['background']}>
        <Carousel items={data.hotRent.imgs} dots={false} backdrop speed={3000} />
      </div>
      <Container>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <div className={heroStyle['content']}>
              <div className={heroStyle['content__title']}>
                <span>{data.title}</span>
                <h2>{data.hotRent.name}</h2>
              </div>
              <div className={heroStyle['content__price']}>
                <div className={heroStyle['content__price__model']}>
                  {`model ${data.hotRent.model}`}
                </div>
                <h2>
                  {`$${data.hotRent.price}`}
                  <span>/month</span>
                </h2>
              </div>
              <Link href={`/cars/${data.hotRent.id}/${spaceToDash(data.hotRent.name)}`} className={heroStyle['content__link']}>
                learn more
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} lg={5}>
            <HeroTabs data={data.filterForm} />
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
