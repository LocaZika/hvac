import { HeaderTop, Navbar } from "./components";

export default function Header({data}: {data: THeader}) {
  return (
    <header>
      <HeaderTop
        email={data.contactInfo.email}
        phone={data.contactInfo.phone}
        schedule={data.contactInfo.schedule}
        socials={data.contactInfo.socials}
      />
      <Navbar items={data.navbar} contactInfo={data.contactInfo} />
    </header>
  )
}
