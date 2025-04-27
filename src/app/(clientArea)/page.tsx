import Features from "@components/homePage/features/Features";
import Hero from "@components/homePage/hero/Hero";
import Services from "@components/homePage/services/Services";
import Car from "@components/homePage/car/Car";
import ChooseUs from "@components/homePage/chooseUs/ChooseUs";
import Cta from "@components/homePage/cta/Cta";
import { sendRequest } from "@utils/api.utils";

export default async function homePage() {
  const res = await sendRequest<IBackendResponse<THomepage>>({
    url: "/homepage",
    nextOptions: { cache: 'force-cache' }
  });
  const homepage = res.data;
  return (
    <main>
      <Hero data={homepage.hero} />
      <Services data={homepage.services} />
      <Features data={homepage.features} />
      <Car data={homepage.car} />
      <ChooseUs data={homepage.chooseus} />
      <Cta data={homepage.cta} />
    </main>
  );
}
