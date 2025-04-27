'use client'
import { Container, Grid } from '@mui/material';
import carStyle from './car.module.scss';
import { useEffect, useRef } from 'react';
import CarItem from "@components/carItem/CarItem";
import mixitup from 'mixitup';

export default function Car({data}: {data: TCarHomepage}) {
  const allRef = useRef<HTMLButtonElement>(null);
  const saleRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleAll = (): void=> {
    if(saleRef.current){
      saleRef.current.className = '';
    }
    if (allRef.current) {
      allRef.current.className = `${carStyle['active']} mixitup-control-active`;
    }
    if(indicatorRef.current) {
      indicatorRef.current.style.width = allRef.current?.offsetWidth + 'px';
      indicatorRef.current.style.left = allRef.current?.offsetLeft + 'px';
    }
  }
  const handleSale = (): void => {
    if (allRef.current) {
      allRef.current.className = '';
    }
    if (saleRef.current) {
      saleRef.current.className = `${carStyle['active']} mixitup-control-active`;
    }
    if(indicatorRef.current) {
      indicatorRef.current.style.width = saleRef.current?.offsetWidth + 'px';
      indicatorRef.current.style.left = saleRef.current?.offsetLeft + 'px';
    }
  }
  useEffect(() => {
    if(indicatorRef.current) {
      indicatorRef.current.style.width = allRef.current?.offsetWidth + 'px';
      indicatorRef.current.style.left = allRef.current?.offsetLeft + 'px';
    };
    if(containerRef.current){
      mixitup(containerRef.current, {
        animation: {
          duration: 500,
        }
      });
    }
  }, []);
  return (
    <section className={`${carStyle['container']} spad`}>
      <Container>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <div className={`${carStyle['title']} section-title`}>
              <span>{data.title}</span>
              <h2>{data.subTitle}</h2>
            </div>
            <div className={carStyle['filter__control']}>
              <span ref={indicatorRef} className={carStyle['indicator']}></span>
              <button type='button' ref={allRef} onClick={handleAll} className={carStyle['active']} data-filter='all'>
                most researched
              </button>
              <button type='button' ref={saleRef} onClick={handleSale} data-filter='.sale'>
                latest on sale
              </button>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={'3rem'} ref={containerRef}>
          {
            data.items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} className={item.tradeType === 'sale' ? 'mix sale' : 'mix'}>
              <CarItem data={item} />
            </Grid>
            ))
          }
        </Grid>
      </Container>
    </section>
  )
}
