'use client'
import { Container, Grid, Rating, useMediaQuery } from '@mui/material';
import testimonialStyle from './testimonial.module.scss';
import Slider from 'react-slick';
import { Star } from '@mui/icons-material';

export default function Testimonial({data}: {data: TTestimonials}) {
  const mediaQuery = useMediaQuery('(max-width: 767px)');
  return (
    <section className={`${testimonialStyle['container']} spad`}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <div className="section-title">
              <span>{data.title}</span>
              <h2>{data.subTitle}</h2>
              <p>{data.text}</p>
            </div>
          </Grid>
        </Grid>
        <Grid container width={'auto'} marginX={'-1.5rem'}>
          <Slider
            infinite
            lazyLoad='ondemand'
            arrows={false}
            dots={true}
            slidesToShow={mediaQuery ? 1 : 2}
            slidesToScroll={1}
            className={testimonialStyle['slider']}
            dotsClass={`${testimonialStyle['dots']} slick-dots`}
          >
            {
              data.items.map(({id, img, name, position, rate, text}) => (
                <Grid item key={id} paddingX={'1.5rem'}>
                  <div className={testimonialStyle['item']}>
                    <div className={testimonialStyle['author']}>
                      <div className={testimonialStyle['pic']}>
                        <img src={`/imgs/about/testimonials/${img}`} alt='author image' loading='lazy' decoding='async' />
                      </div>
                      <div className={testimonialStyle['info']}>
                        <div className={testimonialStyle['rating']}>
                          <Rating
                            value={rate}
                            precision={0.5}
                            emptyIcon={<Star style={{opacity: 0.5}} fontSize='inherit' />}
                            readOnly
                          />
                        </div>
                        <h5>{name} / <span>{position}</span></h5>
                      </div>
                    </div>
                    <p>{text}</p>
                  </div>
                </Grid>
              ))
            }
          </Slider>
        </Grid>
      </Container>
    </section>
  )
}
