import { Container, Grid } from '@mui/material';
import featuresStyle from './features.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Features({data}: {data: TFeaturesHomepage}) {
  return (
    <section className={`${featuresStyle['container']} spad`}>
      <Container>
        <Grid container>
          <Grid item lg={4}>
            <div className={featuresStyle['text']}>
              <div className={`${featuresStyle['text__title']} section-title`}>
                <span>{data.title}</span>
                <h2>{data.subTitle}</h2>
              </div>
              <div className={featuresStyle['text__desc']}>
                {
                  data.text.map((t, index) => (
                    <p key={index}>{t}</p>
                  ))
                }
              </div>
              <div className={featuresStyle['text__btn']}>
                <Link href={'/about'}>about us</Link>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} />
          <Grid item lg={4}>
            <Grid container>
              {
                data.items.map(({id, text, img}) => (
                  <Grid item key={id} xs={6} md={4} lg={6}>
                    <div className={featuresStyle['item']}>
                      <div className={featuresStyle['item__icon']}>
                        <div className={featuresStyle['item__icon__container']}>
                          <Image
                            src={`/imgs/features/${img}`}
                            alt='feature image'
                            fill
                            sizes='100%'
                          />
                        </div>
                      </div>
                      <h6>{text}</h6>
                    </div>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}
