"use client";
import { Container, Grid, useMediaQuery } from "@mui/material";
import footerStyle from "./footer.module.scss";
import { getCurrentDate } from "@utils/date.utils";
import { sendGmail } from "@utils/gmail.utils";
import { toTel } from "@utils/number.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faHeart,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebookF,
  faGoogle,
  faTwitter,
  faSkype,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { TFooter } from "@/types/server";

export default function Footer({ data }: { data: TFooter }) {
  const mediaQuery = useMediaQuery("(max-width: 767px)");
  return (
    <footer
      className={`${footerStyle["container"]} set-bg`}
      style={{ backgroundImage: `url(/imgs/${data.imgs.bg})` }}
    >
      <Container>
        <div className={footerStyle["contact"]}>
          <Grid container>
            <Grid item md={6} lg={6}>
              <div className={footerStyle["title"]}>
                <h2>{data.contactTitle}</h2>
              </div>
            </Grid>
            <Grid item md={6} lg={6}>
              <div className={footerStyle["option"]}>
                <a
                  className={footerStyle["option__item"]}
                  href={`tel:${toTel(data.contactInfo.phone)}`}
                >
                  <FontAwesomeIcon icon={faPhone} />
                  {data.contactInfo.phone}
                </a>
                <a
                  className={`${footerStyle["option__item"]} ${footerStyle["email"]}`}
                  href={sendGmail(data.contactInfo.email)}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  {data.contactInfo.email}
                </a>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container>
          <Grid item sm={12} md={4} lg={4}>
            <div className={footerStyle["about"]}>
              <Link href={"/"} className={footerStyle["logo"]}>
                <Image
                  src={`/imgs/${data.imgs.logo}`}
                  alt="logo"
                  fill
                  sizes="100%"
                />
              </Link>
              <p>{data.aboutContent}</p>
              <div className={footerStyle["social"]}>
                <a
                  href={data.contactInfo.socials.facebook}
                  className={footerStyle["fb"]}
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  href={data.contactInfo.socials.twitter}
                  className={footerStyle["tw"]}
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href={data.contactInfo.socials.google}
                  className={footerStyle["gg"]}
                >
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a
                  href={data.contactInfo.socials.skype}
                  className={footerStyle["sp"]}
                >
                  <FontAwesomeIcon icon={faSkype} />
                </a>
              </div>
            </div>
          </Grid>
          <Grid item lg={3}></Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={2}
            paddingX={mediaQuery ? "" : "1.5rem"}
          >
            <div className={footerStyle["widget"]}>
              <h5>top car types</h5>
              <ul>
                {data.topCarTypes.map(({ id, type }) => (
                  <li key={id}>
                    <Link href={`/cars?type=${type}`}>
                      <FontAwesomeIcon icon={faAngleRight} />
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={3}>
            <div className={footerStyle["widget"]}>
              <h5>top car brands</h5>
              <ul className={footerStyle["brand"]}>
                {data.topCarBrands.map(({ id, brand }) => (
                  <li key={id}>
                    <Link href={`/cars?brand=${brand}`}>
                      <FontAwesomeIcon icon={faAngleRight} />
                      {brand}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
        </Grid>
        <div className={footerStyle["copyright"]}>
          <p>
            Copyright &copy;{getCurrentDate("year")} All rights reserved | This
            template is made with &nbsp;
            <FontAwesomeIcon icon={faHeart} />
            &nbsp; by&nbsp;<span>Zika</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
