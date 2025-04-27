import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import contactStyle from './contact.module.scss';
import { Container, Grid } from '@mui/material';
import { toTel } from '@utils/number.utils';
import { sendRequest } from '@utils/api.utils';
import RequestContact from '@components/contactPage/requestContact/requestContact';

export default async function page() {
  const res = await sendRequest<IBackendResponse<TContactpage>>({
    url: '/contactpage',
  });
  const { title, schedule, showrooms, text } = res.data;
  return (
    <>
      <Breadcrumb items={'contact us'} />
      <section className={`${contactStyle['contact']} spad`}>
        <Container>
          <Grid container>
            <Grid item md={6} lg={6}>
              <div className={contactStyle['text']}>
                <div className='section-title'>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
                <ul>
                  <li>
                    <span>weekdays:</span>
                    {schedule.weekdays}
                  </li>
                  <li>
                    <span>saturday</span>
                    {schedule.saturday}
                  </li>
                  <li>
                    <span>sunday</span>
                    {schedule.sunday}
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item md={6} lg={6}>
              <RequestContact />
            </Grid>
          </Grid>
        </Container>
      </section>
      <div className={contactStyle['address']}>
        <Container>
          <div className={contactStyle['text']}>
            <Grid container>
              {
                showrooms.map(({id, address, email, name, phone}) => (
                  <Grid item key={id} sm={6} md={6} lg={4}>
                    <div className={contactStyle['item']}>
                      <h4>{name}</h4>
                      <p>{address}</p>
                      <p>{email}</p>
                      <a href={`tel:${toTel(phone)}`}>{phone}</a>
                    </div>
                  </Grid>
                ))
              }
            </Grid>
          </div>
        </Container>
      </div>
    </>
  )
}
