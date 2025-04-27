import { Container, Grid } from '@mui/material';
import teamStyle from './team.module.scss';

export default function Team({data}: {data: TTeams}) {
  return (
    <section className={`${teamStyle['container']} spad`}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <div className={'section-title'}>
              <span>{data.title}</span>
              <h2>{data.subTitle}</h2>
            </div>
          </Grid>
        </Grid>
        <Grid container marginX={'-1.5rem'} width={'auto'}>
          {
            data.items.map(({id, img, name, position}) => (
              <Grid item key={id} xs={12} sm={6} lg={3}>
                <div className={teamStyle['item']}>
                  <img src={`imgs/about/teams/${img}`} alt="expert image" loading='lazy' />
                  <div className={teamStyle['info']}>
                    <h5>{name}</h5>
                    <span>{position}</span>
                  </div>
                </div>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </section>
  )
}
