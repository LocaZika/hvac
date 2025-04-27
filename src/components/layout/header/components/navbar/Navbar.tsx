'use client'
import Link from 'next/link';
import navbarStyle from './navbar.module.scss';
import { Container, Grid } from '@mui/material';
import LoginBtn from '@componentsHeader/navbar/components/loginBtn/Login.btn';
import Logo from '@componentsHeader/navbar/components/logo/Logo';
import NavbarMb from '@componentsHeader/navbar/components/mobile/NavbarMb';
import SearchBar from '@componentsHeader/navbar/components/searchBar/SearchBar';
import { usePathname } from 'next/navigation';

interface INavbar{
  items: TNavbar;
  contactInfo: TContactInfo;
}

export default function Navbar({ items, contactInfo }: INavbar) {
  const pathname = usePathname();
  return (
    <nav>
      <Container>
        <Grid container className={navbarStyle['navbar']}>
          <Grid item md={2} lg={2}>
            <Logo />
          </Grid>
          <Grid item md={10} lg={10} className={navbarStyle['navbar__pc']}>
            <div className={navbarStyle["nav-container"]}>
              <div className={navbarStyle["menu"]}>
                <ul>
                  {
                    items.map(({id, name, path}) => (
                      <li key={id}>
                        <Link
                          href={path}
                          className={`${navbarStyle['menu__item']} ${pathname === path ? navbarStyle['active'] : ''}`}
                        >
                          {name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className={navbarStyle["widget"]}>
                <div className={navbarStyle['widget-item']}>
                  <SearchBar />
                </div>
                <LoginBtn />
              </div>
            </div>
          </Grid>
          <Grid item xs={5}
            className={navbarStyle['navbar__mb']}
          >
            <NavbarMb menu={items} contactInfo={contactInfo}/>
          </Grid>
        </Grid>
      </Container>
    </nav>
  )
}
