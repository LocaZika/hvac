// 'use client'
import { Container, Grid } from '@mui/material';
import headerTopStyle from './headerTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faGoogle, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { sendGmail } from '@utils/gmail.utils';
import { toTel } from '@utils/number.utils';

interface IHeaderTop {
  schedule: TSchedule,
  email: string,
  phone: string,
  socials: TSocials,
}
export default function HeaderTop({schedule, email, phone, socials}: IHeaderTop) {
  return (
    <div className={headerTopStyle['container']}>
      <Container>
        <Grid container >
          <Grid item lg={7}>
            <div className={headerTopStyle['left']}>
              <ul>
                <li>
                  <div className={headerTopStyle['contact-container']}>
                    <FontAwesomeIcon icon={faClock} className={headerTopStyle['icon']} />
                    <span>{schedule}</span>
                  </div>
                </li>
                <li>
                  <div className={headerTopStyle['contact-container']}>
                    <FontAwesomeIcon icon={faEnvelope} className={headerTopStyle['icon']} />
                    <a href={sendGmail(email)}>{email}</a>
                  </div>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item lg={5}>
            <div className={headerTopStyle['right']}>
              <div className={headerTopStyle['right__phone']}>
                <FontAwesomeIcon icon={faPhone} className={headerTopStyle['icon']} />
                <a href={`tel:/${toTel(phone)}`}>{phone}</a>
              </div>
              <div className={headerTopStyle['right__socials']}>
                <a href={socials.facebook}>
                  <FontAwesomeIcon icon={faFacebookF} className={headerTopStyle['icon']} />
                </a>
                <a href={socials.twitter}>
                  <FontAwesomeIcon icon={faTwitter} className={headerTopStyle['icon']} />
                </a>
                <a href={socials.google}>
                  <FontAwesomeIcon icon={faGoogle} className={headerTopStyle['icon']} />
                </a>
                <a href={socials.instagram}>
                  <FontAwesomeIcon icon={faInstagram} className={headerTopStyle['icon']} />
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
