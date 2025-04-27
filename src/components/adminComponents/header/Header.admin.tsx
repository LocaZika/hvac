'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSidebar from "@hooks/useSidebar";
import useBreadcrumb from "@hooks/useBreadcrum";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";
import Breadcrumb from "@components/breadcrumb/Breadcrumb";

export default function HeaderAdmin() {
  const { isOpen, setIsOpen } = useSidebar();
  const { breadcrumbItems } = useBreadcrumb();
  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <header>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <button type="button" onClick={handleToggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Breadcrumb items={[
            {title: 'Home', path: '/admin'},
            ...breadcrumbItems,
          ]} />
        </Grid>
      </Grid>
    </header>
  )
}
