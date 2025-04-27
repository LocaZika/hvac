import About from '@components/aboutPage/about/About';
import Breadcrumb from '@components/breadcrumb/Breadcrumb';
import Client from '@components/aboutPage/client/Client';
import Counter from '@components/aboutPage/counter/Counter';
import RequestCallback from '@components/aboutPage/requestCallback/RequestCallback';
import Team from '@components/aboutPage/team/Team';
import Testimonial from '@components/aboutPage/testimonial/Testimonial';
import { sendRequest } from '@utils/api.utils';

export default async function aboutPage() {
  const res: IBackendResponse<TAboutpage> = await sendRequest({
    url: '/aboutpage',
    method: 'GET',
  });
  const {
    clients,
    features,
    img,
    items,
    quantities,
    teams,
    testimonials,
    text,
    title,
  } = res.data;
  const about: TAbout = {
    title: title,
    text: text,
    img: img,
    items: items,
    features: features,
  };
  return (
    <>
      <Breadcrumb items='about us' />
      <About data={about} />
      <RequestCallback />
      <Team data={teams} />
      <Testimonial data={testimonials} />
      <Counter data={quantities}/>
      <Client data={clients} />
    </>
  )
}
