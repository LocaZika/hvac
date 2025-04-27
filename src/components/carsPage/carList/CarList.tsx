import CarItem from "@components/carItem/CarItem";
import { Grid } from "@mui/material";
import CarLoadingCard from "../carLoadingCard/CarLoadingCard.component";

export default function CarList({data, status}: {data: TCarItemMinData[], status: TCarListStatus}) {
  const notFoundData = (): JSX.Element => (
    <Grid item xs={12} textAlign={'center'}>
      <p style={{fontSize: '2.4rem'}}>Not found cars matching the keyword or filter</p>
    </Grid>
  );
  const foundData = (): JSX.Element => (
    <Grid container marginX={'-1.5rem'} width={'auto'}>
    {
      data.map(car => (
        <Grid key={car.id} item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
          <CarItem data={car} />
        </Grid>
      ))
    }
    </Grid>
  );
  const loadingData = (): JSX.Element => (
    <Grid container marginX={'-1.5rem'} width={'auto'}>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
      <Grid item xs={12} md={4} lg={4} paddingX={'1.5rem'} marginBottom={'3rem'}>
        <CarLoadingCard />
      </Grid>
    </Grid>
  );
  if (status === 'loaded') {
    return foundData();
  }
  if (status === 'notFound') {
    return notFoundData();
  }
  return loadingData();
}
