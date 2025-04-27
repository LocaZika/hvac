'use client'
import { faBars, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Drawer } from "@mui/material";
import { useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import LoginBtn from "../loginBtn/Login.btn";
import navbarMbStyle from './navbarMb.module.scss';
import Link from "next/link";
import Image from "next/image";
import { faFacebookF, faGoogle, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import logoImg from "@public/imgs/logo.png";
import { sendGmail } from '@utils/gmail.utils';
import { toTel } from '@utils/number.utils';

interface INavbarMb{
  menu: TNavbar,
  contactInfo: TContactInfo,
}

export default function NavbarMobile({ menu, contactInfo }: INavbarMb) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleOpenDrawer = (): void => {
    setOpenDrawer(true);
  }
  const handleCloseDrawer = (): void => {
    setOpenDrawer(false);
  }
  const handleOpenMenu = (): void => {
    setOpenMenu(!openMenu);
  }
  return (
    <>
      <button type="button" className={navbarMbStyle['btn']} onClick={handleOpenDrawer}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        anchor="left"
        PaperProps={{className: navbarMbStyle['drawer']}}
      >
        <div className={navbarMbStyle['widget']}>
          <SearchBar />
          <LoginBtn />
        </div>
        <div className={navbarMbStyle['logo']}>
          <Link href={'/'}>
            <Image src={logoImg} alt="logo" />
          </Link>
        </div>
        <div className={navbarMbStyle['menu']}>
          <button type="button" onClick={handleOpenMenu} className={navbarMbStyle['menu__btn']}>
            <span className={navbarMbStyle['menu__btn__text']}>menu</span>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Collapse in={openMenu} timeout={'auto'} unmountOnExit>
            <ul className={navbarMbStyle['menu__list']}>
              {menu.map(({ id, name, path }) => (
                <li key={id}>
                  <Link href={path}>{name}</Link>
                </li>
              ))}
            </ul>
          </Collapse>
        </div>
        <div className={navbarMbStyle['schedule']}>
          <FontAwesomeIcon icon={faClock} />
          {contactInfo.schedule}
        </div>
        <div className={navbarMbStyle['contact-email']}>
          <FontAwesomeIcon icon={faEnvelope} />
          <a href={sendGmail(contactInfo.email)}>{contactInfo.email}</a>
        </div>
        <div className={navbarMbStyle['contact-phone']}>
          <FontAwesomeIcon icon={faPhone} />
          <a href={`tel:${toTel(contactInfo.phone)}`}>{contactInfo.phone}</a>
        </div>
        <div className={navbarMbStyle['socials']}>
          <ul>
            <li>
              <Link href={contactInfo.socials.facebook}>
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
            </li>
            <li>
              <Link href={contactInfo.socials.twitter}>
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
            </li>
            <li>
              <Link href={contactInfo.socials.google}>
                <FontAwesomeIcon icon={faGoogle} />
              </Link>
            </li>
            <li>
              <Link href={contactInfo.socials.instagram}>
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  )
}
