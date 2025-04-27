'use client'
import { Container, Grid } from '@mui/material';
import counterStyle from './counter.module.scss';
import CountUp from 'react-countup';
import { useCallback } from 'react';

export default function Counter({data}: {data:TQuantities}) {
  const formatNum = useCallback((value: number) => value.toString(), []);
  return (
    <section className={`${counterStyle['container']} set-bg`}>
      <Container>
        <Grid container>
          {
            data.map(({id, name, value}) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={id}>
                <div className={counterStyle['item']}>
                  <h2>
                    <CountUp
                      delay={2}
                      start={0}
                      end={value ?? 1}
                      duration={3}
                      formattingFn={(value) => value.toString()}
                      enableScrollSpy
                      scrollSpyOnce
                    >
                      {({ countUpRef }) => <span ref={countUpRef}></span>}
                    </CountUp>
                  </h2>
                  <p>{name}</p>
                </div>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </section>
  )
}
